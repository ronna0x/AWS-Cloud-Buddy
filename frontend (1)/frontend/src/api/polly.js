import { API, authHeaders } from "./auth";

export const getSpeech = async (text) => {
  const res = await fetch(`${API}/polly`, {
    method: "POST",
    headers: authHeaders(),
    body: JSON.stringify({ text }),
  });

  if (!res.ok) throw new Error("Polly request failed");

  // Read as text because Lambda returns base64 string
  const audioBase64 = await res.text();
  return `data:audio/mpeg;base64,${audioBase64.trim()}`;
};
