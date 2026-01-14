import { getSpeech } from "../api/polly";
export default function Filters({
  domainFilter,
  levelFilter,
  setDomainFilter,
  setLevelFilter,
  applyFilters,
  speakText,
}) {
  const handleSpeak = async () => {
    if (!speakText) {
      console.warn("No text to speak");
      return;
    }

    try {
  const audioSrc = await getSpeech(speakText);
const audio = new Audio(audioSrc);
audio.play().catch(err => console.error("Failed to play speech:", err));
} catch (err) {
  console.error("Failed to play speech:", err);
}
  };

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
        <option value="Billing & Pricing">Billing & Pricing</option>
        <option value="Well-Architected Framework">Well-Architected Framework</option>
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
 {/* ================= Speak Button at the Top ================= */}
      {speakText &&
     // <div style={{ marginBottom: "10px", textAlign: "center" }}>
        <button onClick={handleSpeak} className="speak-btn">
          🔊 
        </button>
      //</div>
      }
    </div>
  );
}
