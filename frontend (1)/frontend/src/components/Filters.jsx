export default function Filters({
  domainFilter,
  levelFilter,
  setDomainFilter,
  setLevelFilter,
  applyFilters,
}) {
  return (
    <div className="filters">
      <select
        value={domainFilter}
        onChange={(e) => setDomainFilter(e.target.value)}
      >
        <option value="">All Domains</option>
        <option value="General">General</option>
        <option value="Compute">Compute</option>
        <option value="Storage">Storage</option>
        <option value="Security">Security</option>
      </select>

      <select
        value={levelFilter}
        onChange={(e) => setLevelFilter(e.target.value)}
      >
        <option value="">All Levels</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
      </select>

      <button className="apply" onClick={applyFilters}>
        Apply
      </button>
    </div>
  );
}
