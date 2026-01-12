export default function Flashcard({
  card,
  index,
  total,
  flipped,
  setFlipped,
}) {
  return (
    <div className="flip-container">
      <div
        className={`flip-card ${flipped ? "flipped" : ""}`}
        onClick={() => setFlipped((f) => !f)}
      >
        <div className="card-count">
          {index + 1} / {total}
        </div>
        <div className="card-face">{card.question}</div>
        <div className="card-face card-back">{card.answer}</div>
      </div>
    </div>
  );
}
