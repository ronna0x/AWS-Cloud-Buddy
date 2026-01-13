export default function FlashcardActions({
  view,
  index,
  total,
  prev,
  next,
  addToStudyLater,
  removeFromStudyLater,
  isInStudyLater,
}) {
  return (
    <div className="actions">
      <button 
      className={`previous ${index === 0 ? "disabled" : ""}`}
       onClick={prev} disabled={index === 0}>
        ⬅ Previous
      </button>

      {view === "studyLater" ? (
        <button className="remove" onClick={removeFromStudyLater} >
          Remove
        </button>
      ) : (
       <button
  className={`study ${isInStudyLater ? "disabled" : ""}`}
  onClick={addToStudyLater}
  disabled={isInStudyLater}
>
  Study Later
</button>
      )}

      {/* <button className="next" onClick={next} disabled={index === total - 1}>
        Next ➡
      </button> */}
       <button 
      className={`next ${index === total -1 ? "disabled" : ""}`}
       onClick={next} disabled={index === total - 1}>
        Next ➡
      </button>
    </div>
  );
}
