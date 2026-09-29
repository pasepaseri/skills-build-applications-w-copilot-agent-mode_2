import ResourcePage from './ResourcePage.jsx'

const columns = [
  { key: 'name', label: 'TEAM', render: (team) => <span className="table-primary">{team.name || 'Unnamed team'}</span> },
  { key: 'description', label: 'ABOUT', render: (team) => team.description || 'No description' },
  { key: 'members', label: 'MEMBERS', render: (team) => Array.isArray(team.members) ? team.members.length : 0 },
  { key: 'points', label: 'POINTS', render: (team) => <span className="table-primary">{team.points ?? 0}</span> },
]

export default function Teams() {
  return <ResourcePage resource="teams" endpoint="/api/teams/" title="Teams" description="Team rosters and points across the current season." columns={columns} />
}