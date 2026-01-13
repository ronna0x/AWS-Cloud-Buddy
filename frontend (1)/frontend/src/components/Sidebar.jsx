export default function Sidebar({
  view,
  setView,
  setIndex,
  applyFilters,
}) {
  const handleChangeView = (newView) => {
    if (view === newView) return;

    setView(newView);
    setIndex(0);
    applyFilters();
  };

  return (
    <div className="sidebar">
       <img
        src="/Cloud-Buddy-icon-2.png"
        alt="Flashcards App Logo"
        className="app-logo"
      />

      <div
        className={`nav-item ${view === "all" ? "active" : ""}`}
        onClick={() => handleChangeView("all")}
      >
        All Flashcards
      </div>

      <div
        className={`nav-item ${
          view === "studyLater" ? "active" : ""
        }`}
        onClick={() => handleChangeView("studyLater")}
      >
        Study Later
      </div>

      <div
        className={`nav-item ${
          view === "game" ? "active" : ""
        }`}
        onClick={() => handleChangeView("game")}
      >
        Game
      </div>
    </div>
  );
}
