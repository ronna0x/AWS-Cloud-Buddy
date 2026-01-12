import { LOGIN_URL } from "../api/auth";

export default function LoginScreen() {
  return (
    <div className="login-screen">
      <button
        className="login-btn"
        onClick={() => (window.location.href = LOGIN_URL)}
      >
        Login with AWS
      </button>
    </div>
  );
}
