// src/components/event.tsx
import React, { useEffect, useMemo, useState } from "react";

type SmoothcompEvent = {
  id: number;
  title: string;
};

type Props = {
  eventId: string;
  setEventId: React.Dispatch<React.SetStateAction<string>>;
};


function extractArrayLiteral(source: string, varName: string): string | null {
  const startToken = `${varName} = `;
  const start = source.indexOf(startToken);
  if (start === -1) return null;

  let i = start + startToken.length;
  while (i < source.length && source[i] !== "[") i++;
  if (i >= source.length) return null;

  let depth = 0;
  let inString = false;
  let quote = "";
  let escaped = false;

  for (let j = i; j < source.length; j++) {
    const ch = source[j];

    if (inString) {
      if (escaped) escaped = false;
      else if (ch === "\\") escaped = true;
      else if (ch === quote) inString = false;
      continue;
    }

    if (ch === '"' || ch === "'") {
      inString = true;
      quote = ch;
      continue;
    }

    if (ch === "[") depth++;
    if (ch === "]") {
      depth--;
      if (depth === 0) return source.slice(i, j + 1);
    }
  }

  return null;
}

function parseEventsFromUpcomingPage(html: string): SmoothcompEvent[] {
  // 1) robust parse of: var events = [...]
  const arrayLiteral = extractArrayLiteral(html, "var events");
  if (arrayLiteral) {
    try {
      const parsed = JSON.parse(arrayLiteral) as Array<{ id: number; title: string }>;
      const cleaned = parsed.filter(
        (e) => Number.isFinite(e.id) && typeof e.title === "string" && e.title.trim(),
      );
      if (cleaned.length) return cleaned;
    } catch {}
  }

  // 2) fallback: match both / and \/ urls
  const normalized = html.replace(/\\\//g, "/");
  const ids = Array.from(normalized.matchAll(/\/en\/event\/(\d+)/g))
    .map((m) => Number(m[1]))
    .filter(Number.isFinite);

  const uniqueIds = [...new Set(ids)];
  return uniqueIds.map((id) => ({ id, title: `Event #${id}` }));
}



export default function UserEvent({ eventId, setEventId }: Props) {
  const [query, setQuery] = useState("");
  const [events, setEvents] = useState<SmoothcompEvent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        setError("");
        const res = await fetch("https://smoothcomp.com/en/events/upcoming");
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        const html = await res.text();
        console.log("Fetched upcoming events page, length:", html);
        const list = parseEventsFromUpcomingPage(html);
        if (!list.length) throw new Error("No events found");
        setEvents(list);
      } catch (e) {
        setError(e instanceof Error ? e.message : "Failed to load events");
      } finally {
        setLoading(false);
      }
    };
    void load();
  }, []);

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    if (!q) return events.slice(0, 25);
    return events
      .filter((e) => e.title.toLowerCase().includes(q))
      .slice(0, 25);
  }, [events, query]);

  return (
    <div>
      <label htmlFor="event-name-input">Event Name: </label>
      <input
        id="event-name-input"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="Type event name"
      />

      <label htmlFor="event-select" style={{ marginLeft: 10 }}>
        <br />
        Filtered Events:
      </label>
      <select
        id="event-select"
        value={eventId}
        onChange={(e) => setEventId(e.target.value)}
        disabled={loading || filtered.length === 0}
        style={{ marginLeft: 8 }}
      >
        <option value="">{loading ? "Loading..." : "Select event"}</option>
        {filtered.map((e) => (
          <option key={e.id} value={String(e.id)}>
            {e.title} (ID: {e.id})
          </option>
        ))}
      </select>

      {eventId && <p>Selected Event ID: {eventId}</p>}
      {error && <p style={{ color: "red" }}>{error}</p>}
    </div>
  );
}
