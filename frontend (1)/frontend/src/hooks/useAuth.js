import { useEffect, useState } from "react";
import { getCodeFromUrl, exchangeCodeForToken } from "../api/auth";

export function useAuth() {
  const [idToken, setIdToken] = useState(
    localStorage.getItem("idToken")
  );

  useEffect(() => {
    const initAuth = async () => {
      if (idToken) return;

      const code = getCodeFromUrl();
      if (!code) return;

      const tokenResponse = await exchangeCodeForToken(code);

      if (tokenResponse.id_token) {
        localStorage.setItem("idToken", tokenResponse.id_token);
        setIdToken(tokenResponse.id_token);
        window.history.replaceState({}, document.title, "/");
      }
    };

    initAuth();
  }, [idToken]);

  return { idToken };
}
