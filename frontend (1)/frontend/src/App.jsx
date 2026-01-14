import { useEffect, useMemo, useState } from "react";
import "./App.css";

import {
  API,
  LOGIN_URL,
  authHeaders,
  getUserEmail,
} from "./api/auth";

import Sidebar from "./components/Sidebar";
import Header from "./components/Header";
import Filters from "./components/Filters";
import Flashcard from "./components/Flashcard";
import FlashcardActions from "./components/FlashcardActions";
import Game from "./components/game";
/* ================= APP ================= */
export default function App() {
  /* ================= AUTH ================= */
  const [idToken, setIdToken] = useState(
    localStorage.getItem("idToken")
  );

  useEffect(() => {
    const initAuth = async () => {
      if (idToken) return;

      const params = new URLSearchParams(window.location.search);
      const code = params.get("code");
      if (!code) return;

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
          headers: {
            "Content-Type":
              "application/x-www-form-urlencoded",
          },
          body,
        }
      );

      const data = await res.json();

      if (data.id_token) {
        localStorage.setItem("idToken", data.id_token);
        setIdToken(data.id_token);
        window.history.replaceState({}, "", "/");
      }
    };

    initAuth();
  }, [idToken]);

  /* ================= STATE ================= */
  const [cards, setCards] = useState([]);
  const [studyLaterCards, setStudyLaterCards] = useState([]);

  const [view, setView] = useState("all");
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const [domainFilter, setDomainFilter] = useState("");
  const [levelFilter, setLevelFilter] = useState(""); 
  const [cn, setCn] = useState(0);
  /* ================= LOAD ALL CARDS ================= */
  useEffect(() => {
    if (!idToken) return;

    fetch(`${API}/cards`, { headers: authHeaders() })
      .then((res) => res.json())
      .then((data) =>
        setCards(
          JSON.parse(data.body).map((c) => ({
            cardId: c.SK,
            ...c,
          }))
        )
      );
      fetchCards();
  }, [idToken]);

  /* ================= LOAD STUDY LATER ================= */
   const fetchCards = async () => {
    if (!idToken) return;
    const email = encodeURIComponent(getUserEmail(idToken));
    const res = await fetch(`${API}/user?email=${email}`, {
      headers: authHeaders(),
    });
    const data = await res.json();
    
    setStudyLaterCards(data.map((c) => ({ cardId: c.SK, ...c })));
  };




  /* ================= DERIVED ================= */
  const filteredCards = useMemo(() => {
    const source =
      view === "studyLater" ? studyLaterCards : cards;

    return source.filter(
      (c) =>
        (!domainFilter || c.domain === domainFilter) &&
        (!levelFilter || c.difficulty === levelFilter)
    );
  }, [
    cards,
    studyLaterCards,
    view,
    domainFilter,
    levelFilter,
  ]);

  const card = filteredCards[index];

  /* ================= ACTIONS ================= */
  const applyFilters = () => {
    setIndex(0);
    setFlipped(false);
  };

  const addToStudyLater = () => {
    if (!card) return;

    const email = getUserEmail(idToken);

    fetch(`${API}/study-later`, {
      method: "POST",
      headers: authHeaders(),
      body: JSON.stringify({ email, card }),
    })
      .then((res) => res.json())
      .then(setStudyLaterCards([...studyLaterCards, card]));
  };

  const removeFromStudyLater = () => {
    if (!card) return;

    const email = getUserEmail(idToken);

    fetch(`${API}/study-later`, {
      method: "DELETE",
      headers: authHeaders(),
      body: JSON.stringify({
        email,
        cardId: card.SK,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        setStudyLaterCards(
          studyLaterCards.filter((c) => c.SK !== card.SK)
        );
        setIndex(0);
      });
  };

  const next = () => {
    if (index < filteredCards.length - 1) {
      setIndex((i) => i + 1);
      setFlipped(false);
    }
  };

  const prev = () => {
    if (index > 0) {
      setIndex((i) => i - 1);
      setFlipped(false);
    }
  };

  /* ================= LOGIN ================= */
  if (!idToken) {
    return (
      <div className="login-screen">
  <img
    src="/Cloud-Buddy-icon-2.png"
    alt="CloudBuddy Logo"
    className="top-left-logo"
  />

  <div className="main-container">
    <div className="content-wrapper">
      <div className="app-description">
        <h3>Welcome to Cloud Buddy</h3>
        <p>
          This application helps learners prepare for the AWS Certified Cloud
          Practitioner exam using focused flashcards and cloud fundamentals.
        </p>
      </div>

      <div className="resources">
        <h3>AWS CCP Resources</h3>
        <ul>
          <li>
            <a href="https://docs.aws.amazon.com/aws-certification/latest/examguides/cloud-practitioner-02.html" target="_blank" rel="noopener noreferrer">
              📘 Official Exam Guide
            </a>
          </li>
          <li>
            <a href="https://aws.amazon.com/certification/certification-prep/testing/" target="_blank" rel="noopener noreferrer">
              🗓 Schedule Exam
            </a>
          </li>
        </ul>
      </div>
    </div>

    <button className="login-btn" onClick={() => (window.location.href = LOGIN_URL)}>
      Login
    </button>
  </div>
</div>
    );
  }
  /* ============ Game Logic ============== */

function shuffleArray(array) {
  const copy = [...array];
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [copy[i], copy[j]] = [copy[j], copy[i]];
  }
  return copy;
}

function getRandomQuestions(questions, count = 10) {
  const shuffledQuestions = [...questions]
    .sort(() => 0.5 - Math.random())
    .slice(0, count);

  return shuffledQuestions.map((q) => ({
    ...q,
    options: shuffleArray(q.options),
  }));
}

  const random10 = getRandomQuestions(cards);

  /* ================= UI ================= */
  return (
  <div className="container">
    <Sidebar
      view={view}
      setView={setView}
      setIndex={setIndex}
      applyFilters={applyFilters}
    />

    <div className="main">
      {/* Header is ALWAYS visible */}
      <Header idToken={idToken} />

      {/* Content changes based on view */}
      {view === "game" ? (
        <Game 
        random10={random10}
        setCn={setCn}
        cn={cn}

        />
      ) : (
        <>
          <Filters
            domainFilter={domainFilter}
            levelFilter={levelFilter}
            setDomainFilter={setDomainFilter}
            setLevelFilter={setLevelFilter}
            applyFilters={applyFilters}
             speakText={card?.answer}
          />

          {card ? (
            <div className="flashcard-area">
              <Flashcard
                card={card}
                index={index}
                total={filteredCards.length}
                flipped={flipped}
                setFlipped={setFlipped}
              />

              <FlashcardActions
                view={view}
                index={index}
                total={filteredCards.length}
                prev={prev}
                next={next}
                addToStudyLater={addToStudyLater}
                removeFromStudyLater={removeFromStudyLater}
                isInStudyLater={
                  card && studyLaterCards.some(
                    c => c.cardId === card.cardId
                  )
                }
              />
            </div>
          ) : (
            <p style={{ marginTop: "60px" }}>
              No cards to show.
            </p>
          )}
        </>
      )}
    </div>
  </div>
)}
