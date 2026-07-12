import "../styles/filterBar.css";

function FilterBar({ activeFilter, onFilterChange }) {
  // List of category filter buttons
  const filters = ["All", "Music", "Gaming", "News", "Coding", "Sports", "Education"];

  return (
    <div className="filter-bar">
      {filters.map((filter) => (
        <button
          key={filter}
          className={`filter-btn ${activeFilter === filter ? "active" : ""}`}
          onClick={() => onFilterChange(filter)}
        >
          {filter}
        </button>
      ))}
    </div>
  );
}

export default FilterBar;
