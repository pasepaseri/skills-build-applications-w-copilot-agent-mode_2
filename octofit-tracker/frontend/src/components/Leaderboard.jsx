import ResourcePage from './ResourcePage.jsx'

function entryName(entry) {
  const candidate = entry.user || entry.team
  if (!candidate) return 'Unassigned'
  if (typeof candidate === 'object') return candidate.displayName || candidate.username || candidate.name || 'OctoFit member'
  return String(candidate).slice(0, 12)
}

const columns = [
  { key: 'rank', label: 'RANK', render: (entry) => <span className="table-primary">{entry.rank ? `#${entry.rank}` : '-'}</span> },
  { key: 'name', label: 'ATHLETE / TEAM', render: entryName },
  { key: 'points', label: 'POINTS', render: (entry) => <span className="table-primary">{entry.points ?? 0}</span> },
  { key: 'period', label: 'PERIOD', render: (entry) => entry.period || 'All-time' },
]

export default function Leaderboard() {
  return <ResourcePage resource="leaderboard" endpoint="/api/leaderboard/" title="Leaderboard" description="Friendly competition, ranked by points earned." columns={columns} />
}