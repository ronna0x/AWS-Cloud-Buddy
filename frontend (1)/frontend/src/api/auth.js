export const API =
  "https://nj1zc8sm95.execute-api.us-east-2.amazonaws.com/dev";

export const LOGIN_URL =
  "https://flashcardsapp.auth.us-east-2.amazoncognito.com/oauth2/authorize" +
  "?client_id=6v9ml7acqu4oksdbvo188t20nl" +
  "&response_type=code" +
  "&scope=openid+email+phone" +
  "&redirect_uri=https://d2jt6kdflh9if4.cloudfront.net";

export const getCodeFromUrl = () => {
  const params = new URLSearchParams(window.location.search);
  return params.get("code");
};

export const exchangeCodeForToken = async (code) => {
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    client_id: "6v9ml7acqu4oksdbvo188t20nl",
    code,
    redirect_uri: "https://d2jt6kdflh9if4.cloudfront.net",
  });

  const res = await fetch(
    "https://flashcardsapp.auth.us-east-2.amazoncognito.com/oauth2/token",
    {
      method: "POST",
      headers: { "Content-Type": "application/x-www-form-urlencoded" },
      body,
    }
  );

  return res.json();
};

export const authHeaders = () => ({
  Authorization: `Bearer ${localStorage.getItem("idToken")}`,
  "Content-Type": "application/json",
});

export const getUserEmail = (token) => {
  if (!token) return "";
  try {
    return JSON.parse(atob(token.split(".")[1])).email;
  } catch {
    return "";
  }
};
