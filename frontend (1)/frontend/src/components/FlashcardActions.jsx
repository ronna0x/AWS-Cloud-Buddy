// export default function FlashcardActions({
//   view,
//   index,
//   total,
//   prev,
//   next,
//   addToStudyLater,
//   removeFromStudyLater,
// }) {
//   return (
//     <div className="actions">
//       <button onClick={prev} disabled={index === 0}>
//         ⬅ Previous
//       </button>

//       {view === "studyLater" ? (
//         <button className="remove" onClick={removeFromStudyLater}>
//           Remove
//         </button>
//       ) : (
//         <button className="study" onClick={addToStudyLater}>
//           Study Later
//         </button>
//       )}

//       <button onClick={next} disabled={index === total - 1}>
//         Next ➡
//       </button>
//     </div>
//   );
// }

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

      <button className="next" onClick={next} disabled={index === total - 1}>
        Next ➡
      </button>
    </div>
  );
}
