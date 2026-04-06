import { useEffect, useMemo, useState } from "react";
import sleeping from './sleeping.png'
import warmup from './newwarm.png'
import yourUp from './letsgo.png'
type MatchDetails = {
  mat: string;
  category: string;
  number: string;
  eta: string;
  athlete1: string;
  club1: string;
  athlete2: string;
  club2: string;
};

type Props = {
  eventId: string;
  athleteFilter: string;
};

function text(el: Element | null | undefined): string {
  return (el?.textContent ?? "").replace(/\s+/g, " ").trim();
}

function findCategoryRow(matchRow: Element): string {
  let prev: Element | null = matchRow.previousElementSibling;
  while (prev) {
    if (prev.classList.contains("category-row")) return text(prev);
    prev = prev.previousElementSibling;
  }
  return "";
}

function parseMatches(html: string): MatchDetails[] {
  const doc = new DOMParser().parseFromString(html, "text/html");
  const matContainers = Array.from(doc.querySelectorAll(".mat-container"));
  const out: MatchDetails[] = [];

  for (const matContainer of matContainers) {
    const matName = text(matContainer.querySelector(".panel-title")) || "Unknown mat";
    const matchRows = Array.from(matContainer.querySelectorAll(".match-row"));
    console.log(`Found ${matchRows.length} matches for mat ${matName}`);
    for (const row of matchRows) {
      const participants = Array.from(row.querySelectorAll(".participant"));
      const athlete1 = text(participants[0]);
      const club1 = text(participants[0]?.querySelector(".club"));
      const athlete2 = text(participants[1]);
      const club2 = text(participants[1]?.querySelector(".club"));

      out.push({
        mat: matName,
        category: findCategoryRow(row),
        number: text(row.querySelector(".number")),
        eta: text(row.querySelector(".eta")),
        athlete1: athlete1.replace(club1, "").trim(),
        club1,
        athlete2: athlete2.replace(club2, "").trim(),
        club2,
      });
    }
  }

  return out;
}

function getMinutesUntilNumber(etaText: string): number | null {
  const now = new Date();
  const parsed = new Date(`${now.toDateString()} ${etaText}`);
  if (Number.isNaN(parsed.getTime())) return null;
  if (parsed.getTime() < now.getTime()) parsed.setDate(parsed.getDate() + 1);
  return Math.floor((parsed.getTime() - now.getTime()) / 60000);
}

function getMinutesUntil(etaText: string): string {
  const totalMin = getMinutesUntilNumber(etaText);
  if (totalMin === null) return "N/A";
  const hours = Math.floor(totalMin / 60);
  const mins = totalMin % 60;
  return `${hours}h ${mins}m`;
}

export default function SmoothcompMatches({ eventId, athleteFilter }: Props) {
  const [matches, setMatches] = useState<MatchDetails[]>([]);
  const [loadingInitial, setLoadingInitial] = useState(true);
  const [refreshing, setRefreshing] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!eventId) return;

    let cancelled = false;

    const fetchMatches = async (isInitial = false) => {
      try {
        if (isInitial) setLoadingInitial(true);
        else setRefreshing(true);

        const res = await fetch(`https://ufc.smoothcomp.com/en/event/${eventId}/schedule/matches`, {
          credentials: "include",
        });
        if (!res.ok) throw new Error(`HTTP ${res.status}`);

        const html = await res.text();
        const next = parseMatches(html);

        if (!cancelled) {
          setMatches(next);      // table updates in place
          setError("");
        }
        } catch (e) {
          if (!cancelled) setError(e instanceof Error ? e.message : "Unknown error");
        } finally {
          if (!cancelled) {
          setLoadingInitial(false);
          setRefreshing(false);
        }
    }
  };

  void fetchMatches(true); // first load
  const id = window.setInterval(() => void fetchMatches(false), 15000);

  return () => {
    cancelled = true;
    window.clearInterval(id);
  };
}, [eventId]);

 

  const filtered = useMemo(() => {
    const q = athleteFilter.toLowerCase();
    if (!q) return matches;
    return matches.filter((m) =>
      `${m.athlete1} ${m.athlete2}`.toLowerCase().includes(q),
    );
  }, [matches, athleteFilter]);

  const sortedMatches = useMemo(() => {
  const candidates = filtered
    .map((m) => ({ ...m, mins: getMinutesUntilNumber(m.eta) }))
    .filter((m) => m.mins !== null) as Array<MatchDetails & { mins: number }>;

  candidates.sort((a, b) => a.mins - b.mins);
  return candidates;
}, [filtered]);


  if (!eventId) return <p>Enter event ID and click Find Matches.</p>;
  if (loadingInitial) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  const mins = sortedMatches[0] ? getMinutesUntilNumber(sortedMatches[0].eta) : null;
  const soon = 59;
  const ready = 15;
  const isWarmup = mins !== null && mins < soon && mins > ready;

  return (
    <div>
      <p>Total Matches: {filtered.length}</p>
      <table style={{ borderCollapse: "collapse", width: "100%" }}>
        <thead>
          <tr>
            <th>Event</th>
            <th>Mat</th>
            <th>ETA</th>
            <th>Athlete 1</th>
            <th>Athlete 2</th>
            <th>ETA{'>'}1 hour</th>
          </tr>
        </thead>
        <tbody>

          {sortedMatches.map((m, i) => {

            const mins = getMinutesUntilNumber(m.eta);
            const isSoon = mins !== null && mins < soon && mins > ready;

            return (
              
              <tr key={`${m.mat}-${m.number}-${i}`}>
                <td>{m.mat}</td>
                <td>{m.number}</td>
                <td>{m.eta}</td>
                <td>{m.athlete1} ({m.club1})</td>
                <td>{m.athlete2} ({m.club2})</td>
                <td>{isSoon ? "Yes" : "No"}</td>
                
                
              </tr>
              
            );
          })}

        </tbody>
      </table>
      <br />
      {isWarmup && (
        <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8 }}>
          <img src={warmup} alt="warm up" style={{ width: 94, height: "auto" }} />
          <h1>Warm Up!</h1>
        </div>
      )}
      
      <div>
        {mins !== null && mins > soon && (
          <>
            <img src={sleeping} alt="sleeping" style={{ width: 94, height: "auto" }} />
            <h1>You have time ~ {'< 1 hour '}</h1>
          </>
        )}
      </div>
      <div>
        {mins !== null && mins < ready && (
          <>
            <img src={yourUp} alt="your up" style={{ width: 94, height: "auto" }} />
            <br />
            <h1>Your Up ~ {'> 15 minutes'}</h1>
          </>
        )}
      </div>
      <div style={{ marginTop: 16 }}>
        <strong>Time Until Next Match: </strong>
        <br />
        {sortedMatches[0] ? `${getMinutesUntil(sortedMatches[0].eta)} ` : "N/A"}
      </div>
    </div>
  );
}
