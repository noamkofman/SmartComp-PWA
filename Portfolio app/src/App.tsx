import { useEffect, useState } from "react";
import "./App.css";
import UserName from "./components/username";
import UserEvent from "./components/event";
import SmoothcompMatches from "./components/SmoothcompMatches";
import DigitalClock from "./components/DigitalClock";

type RichestPerson = {
  rank: string;
  name: string;
  age: string;
  source: string;
};

type WikiParseResponse = {
  parse?: {
    text?: string;
  };
};

const WIKIPEDIA_API_URL =
  "https://en.wikipedia.org/w/api.php?action=parse&page=The_World%27s_Billionaires&prop=text&formatversion=2&format=json&origin=*";

function cleanText(value: string): string {
  return value.replace(/\s+/g, " ").trim();
}

function extractTopTen(html: string): RichestPerson[] {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const tables = Array.from(doc.querySelectorAll("table.wikitable.sortable"));

  for (const table of tables) {
    const headerCells = Array.from(table.querySelectorAll("tr th")).map((th) =>
      cleanText(th.textContent ?? "").toLowerCase(),
    );

    const hasRank = headerCells.some((header) => header === "no." || header === "no");
    const hasName = headerCells.includes("name");
    const hasSource = headerCells.some((header) => header.includes("source"));

    if (!hasRank || !hasName || !hasSource) continue;

    const rows = Array.from(table.querySelectorAll("tbody tr"));
    const people: RichestPerson[] = [];

    for (const row of rows) {
      const cells = Array.from(row.querySelectorAll("td"));
      if (cells.length < 4) continue;

      const preparedCells = cells.map((cell) => {
        const copy = cell.cloneNode(true) as HTMLElement;
        copy.querySelectorAll("sup, .reference, .sortkey").forEach((el) => el.remove());
        return cleanText(copy.textContent ?? "");
      });

      const [rank, name, age, source] = preparedCells;
      if (!rank || !name) continue;

      people.push({ rank, name, age: age || "-", source: source || "-" });
      if (people.length === 10) return people;
    }
  }

  return [];
}

function App() {
  const [people, setPeople] = useState<RichestPerson[]>([]);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState(true);

  const [text, setText] = useState("");
  const [submittedName, setSubmittedName] = useState("");
  const [eventId, setEventId] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");

        const response = await fetch(WIKIPEDIA_API_URL);
        if (!response.ok) throw new Error(`Request failed with status ${response.status}`);

        const data = (await response.json()) as WikiParseResponse;
        const html = data.parse?.text;
        if (!html) throw new Error("Wikipedia response did not include page content.");

        const topTen = extractTopTen(html);
        if (topTen.length === 0) {
          throw new Error("Could not parse the richest people table from Wikipedia.");
        }

        setPeople(topTen);
      } catch (err) {
        const message = err instanceof Error ? err.message : "Unknown error";
        setError(message);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  const handleEnterName = () => {
    setSubmittedName(text.trim());
  };

  return (
  <main className="page">
    <div className="container">
      <h1>Smoothcomp Match Finder</h1>
      <section className="card">
        <UserName text={text} setText={setText} onEnterName={handleEnterName} />
        <br />
        <UserEvent eventId={eventId} setEventId={setEventId} />
        <br />

        {submittedName && eventId && (
          <SmoothcompMatches eventId={eventId} athleteFilter={submittedName} />
        )}

        <DigitalClock />
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
        <p className="subtitle" style={{ margin: 0 }}>Live from SmoothComp</p>
        <span style={{
          width: '8px',
          height: '8px',
          borderRadius: '50%',
          backgroundColor: '#22c55e',
          display: 'inline-block',
          animation: 'pulse 1.5s ease-in-out infinite'
        }} />
      </div>
        {loading && <p>Loading...</p>}
        {!loading && error && <p className="error">Failed to load data: {error}</p>}
      </section>
    </div>
  </main>
);

}

export default App;