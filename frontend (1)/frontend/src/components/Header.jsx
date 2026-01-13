import { getUserEmail } from "../api/auth";

export default function Header({ idToken }) {
  return (
    <header className="app-header">
      
      <div className="user-profile">
        <span className="user-email">
          {getUserEmail(idToken)}
        </span>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.clear();
            window.location.reload();
          }}
        >
          Logout
        </button>
      </div>
    </header>
  );
}
