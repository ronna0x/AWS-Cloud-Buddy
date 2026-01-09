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
      <h2>Cloud Buddy</h2>

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
