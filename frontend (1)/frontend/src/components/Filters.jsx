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
        <option value="Compute">Compute</option>
        <option value="Storage">Storage</option>
        <option value="Security">Security</option>
        <option value="Databases">Databases</option>
        <option value="Networking">Networking</option>
        <option value="Management">Management</option>
        <option value="Billing & pricing">Billing & pricing</option>
        <option value="Well-architected framework">Well-architected framework</option>
      </select>

      <select
        value={levelFilter}
        onChange={(e) => setLevelFilter(e.target.value)}
      >
        <option value="">All levels</option>
        <option value="Easy">Easy</option>
        <option value="Medium">Medium</option>
        <option value="Hard">Hard</option>
      </select>

      <button className="apply" onClick={applyFilters}>
        Apply
      </button>
    </div>
  );
}
