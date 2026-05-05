import { useState, useEffect, useRef } from "react";

const SECTIONS = [
  {
    id: "logic",
    title: "Problem Solving & Logic",
    duration: 480,
    color: "#1a1a2e",
    accent: "#e94560",
    questions: [
      {
        id: "l1",
        type: "mc",
        text: "A customer places 3 orders. The first is $45, the second is twice the first, and the third is $15 less than the second. What is the total order value?",
        options: ["$195", "$210", "$180", "$220"],
        answer: 0,
      },
      {
        id: "l2",
        type: "mc",
        text: "If all returns require a receipt, and Sarah has a receipt, which of the following must be true?",
        options: [
          "Sarah will get a refund",
          "Sarah can make a return",
          "Sarah's item is defective",
          "Sarah bought the item recently",
        ],
        answer: 1,
      },
      {
        id: "l3",
        type: "mc",
        text: "A warehouse has 240 units. On Monday 60 are shipped, Tuesday 45 arrive, Wednesday 30 are shipped. How many units remain?",
        options: ["195", "205", "215", "185"],
        answer: 2,
      },
      {
        id: "l4",
        type: "mc",
        text: "Which number comes next in the sequence: 2, 6, 18, 54, ___?",
        options: ["108", "162", "72", "216"],
        answer: 1,
      },
      {
        id: "l5",
        type: "mc",
        text: "If it takes 4 staff members 6 hours to process 480 orders, how long would it take 3 staff members to process the same number of orders?",
        options: ["7 hours", "8 hours", "9 hours", "10 hours"],
        answer: 1,
      },
      {
        id: "l6",
        type: "mc",
        text: "A product has a 20% discount applied, then an additional 10% discount. What is the total percentage reduction from the original price?",
        options: ["28%", "30%", "25%", "32%"],
        answer: 0,
      },
      {
        id: "l7",
        type: "mc",
        text: "An e-commerce store's revenue grew from $80,000 to $100,000. What was the percentage increase?",
        options: ["20%", "25%", "15%", "30%"],
        answer: 1,
      },
      {
        id: "l8",
        type: "mc",
        text: "If Team A processes tickets twice as fast as Team B, and together they complete 90 tickets per hour, how many does Team A complete per hour?",
        options: ["45", "60", "50", "30"],
        answer: 1,
      },
      {
        id: "l9",
        type: "mc",
        text: "Look at the pattern: Circle, Square, Triangle, Circle, Square, ___. What comes next?",
        options: ["Circle", "Square", "Triangle", "Diamond"],
        answer: 2,
      },
      {
        id: "l10",
        type: "mc",
        text: "A shipping container holds 500kg. Box A weighs 120kg, Box B weighs 85kg, Box C weighs 210kg. Can you add Box D (95kg)?",
        options: [
          "Yes, with 10kg to spare",
          "No, it exceeds capacity by 10kg",
          "Yes, exactly at capacity",
          "No, it exceeds capacity by 5kg",
        ],
        answer: 0,
      },
    ],
  },
  {
    id: "customer",
    title: "Customer Service & Empathy",
    duration: 480,
    color: "#0f3460",
    accent: "#e94560",
    questions: [
      {
        id: "c1",
        type: "free",
        text: 'A customer emails: "I ordered 2 weeks ago and my package still hasn\'t arrived. I needed it for my daughter\'s birthday which was YESTERDAY. This is completely unacceptable. I want a refund NOW." Write your response to this customer.',
        placeholder: "Write your customer response here...",
        minWords: 40,
      },
      {
        id: "c2",
        type: "free",
        text: "A customer is on live chat saying they were charged twice for one order. You can see in the system that only one charge went through on your end. How do you handle this conversation?",
        placeholder: "Describe how you would handle this situation...",
        minWords: 40,
      },
      {
        id: "c3",
        type: "mc",
        text: "A customer calls angry about a delayed order. After listening, what is your FIRST priority?",
        options: [
          "Explain company shipping policies",
          "Acknowledge their frustration and apologise",
          "Immediately offer a refund",
          "Transfer them to the shipping department",
        ],
        answer: 1,
      },
    ],
  },
  {
    id: "comms",
    title: "Communication Skills",
    duration: 300,
    color: "#16213e",
    accent: "#0f9b8e",
    questions: [
      {
        id: "co1",
        type: "rewrite",
        text: 'Rewrite this email response professionally and clearly:\n\n"hey so we looked into it and yeah the order got lost somewhere. we can send another one if you want or give you money back. let us know what"',
        placeholder: "Write your improved version here...",
        minWords: 30,
      },
      {
        id: "co2",
        type: "mc",
        text: "Which subject line is most effective for a follow-up email to a customer whose complaint was resolved?",
        options: [
          "RE: Your complaint",
          "Update regarding your recent experience with us",
          "FYI - we fixed the problem",
          "Your order issue",
        ],
        answer: 1,
      },
      {
        id: "co3",
        type: "mc",
        text: "A team member sends you a confusing message about a task. What is the best response?",
        options: [
          "Ignore it and figure it out yourself",
          "Forward it to your manager",
          "Ask a specific clarifying question",
          "Reply with your best guess",
        ],
        answer: 2,
      },
      {
        id: "co4",
        type: "mc",
        text: 'Which phrase is most appropriate when you cannot meet a customer\'s request?',
        options: [
          '"That\'s not possible."',
          '"I understand that\'s frustrating — here\'s what I can do for you..."',
          '"You\'ll need to contact someone else."',
          '"Our policy doesn\'t allow that."',
        ],
        answer: 1,
      },
    ],
  },
  {
    id: "ecommerce",
    title: "E-Commerce Knowledge",
    duration: 360,
    color: "#1a1a2e",
    accent: "#f5a623",
    questions: [
      {
        id: "e1",
        type: "mc",
        text: "On Shopify, what is a 'variant' of a product?",
        options: [
          "A product in a different store",
          "A different version of a product (e.g. size or colour)",
          "A discounted version of a product",
          "A product bundle",
        ],
        answer: 1,
      },
      {
        id: "e2",
        type: "mc",
        text: "What does 'FBA' stand for in Amazon selling?",
        options: [
          "Free Business Account",
          "Fulfilled By Amazon",
          "Flat-rate Billing Agreement",
          "Freight By Air",
        ],
        answer: 1,
      },
      {
        id: "e3",
        type: "mc",
        text: "On eBay, what is a 'Best Offer' listing?",
        options: [
          "A listing only available to premium members",
          "A fixed-price listing where buyers can negotiate",
          "An auction listing",
          "A listing with free shipping",
        ],
        answer: 1,
      },
      {
        id: "e4",
        type: "mc",
        text: "What is the main purpose of a SKU in e-commerce?",
        options: [
          "To set the product price",
          "To uniquely identify a product for inventory tracking",
          "To calculate shipping costs",
          "To categorise products for SEO",
        ],
        answer: 1,
      },
      {
        id: "e5",
        type: "mc",
        text: "A customer orders a product that shows 'in stock' but you discover it's actually out of stock. What is the best course of action?",
        options: [
          "Ship a similar product without telling them",
          "Wait and hope stock arrives before they notice",
          "Contact the customer immediately, explain, and offer alternatives",
          "Refund automatically without communication",
        ],
        answer: 2,
      },
      {
        id: "e6",
        type: "mc",
        text: "What is 'conversion rate' in e-commerce?",
        options: [
          "The percentage of visitors who make a purchase",
          "The exchange rate for international orders",
          "The rate at which returns are processed",
          "The percentage of products that sell out",
        ],
        answer: 0,
      },
      {
        id: "e7",
        type: "mc",
        text: "On Neto (Maropost), what is the primary function of the 'Inventory' module?",
        options: [
          "Managing customer loyalty points",
          "Tracking stock levels, locations and movements",
          "Processing payment gateways",
          "Building product landing pages",
        ],
        answer: 1,
      },
      {
        id: "e8",
        type: "mc",
        text: "What does 'cart abandonment' mean in e-commerce?",
        options: [
          "A customer requesting a refund",
          "A customer adding items to their cart but not completing the purchase",
          "A product being removed from the store",
          "A failed payment transaction",
        ],
        answer: 1,
      },
    ],
  },
  {
    id: "detail",
    title: "Attention to Detail",
    duration: 180,
    color: "#0f3460",
    accent: "#9b59b6",
    questions: [
      {
        id: "d1",
        type: "mc",
        text: 'Spot the error in this order confirmation:\n\n"Order #4821 — 2x Blue T-Shirt (Size M) — $24.99 each — Subtotal: $49.98 — Shipping: $8.50 — Total: $57.48"',
        options: [
          "The order number is wrong",
          "The subtotal is incorrect",
          "The total is incorrect — should be $58.48",
          "No error",
        ],
        answer: 2,
      },
      {
        id: "d2",
        type: "mc",
        text: 'Which of these email addresses contains an error?\n\nA) sarah.jones@gmail.com\nB) mark_smith@outlook.com\nC) jessica.brown@yahoo.com\nD) tom.wilsonhotmail.com',
        options: ["A", "B", "C", "D"],
        answer: 3,
      },
      {
        id: "d3",
        type: "mc",
        text: 'A customer\'s address is: "14 Harbour St, Sydeny, NSW 2000". What is wrong?',
        options: [
          "The street name is wrong",
          "The suburb is misspelled",
          "The postcode is wrong",
          "Nothing is wrong",
        ],
        answer: 1,
      },
      {
        id: "d4",
        type: "mc",
        text: "Review these 4 product prices. Which one is inconsistently formatted?\nA) $12.99  B) $8.50  C) $24.9  D) $15.00",
        options: ["A", "B", "C", "D"],
        answer: 2,
      },
      {
        id: "d5",
        type: "mc",
        text: 'Find the duplicate in this order list:\nOrder 1: SKU-4421 x2\nOrder 2: SKU-8832 x1\nOrder 3: SKU-4421 x1\nOrder 4: SKU-9910 x3',
        options: ["SKU-8832", "SKU-4421", "SKU-9910", "No duplicate"],
        answer: 1,
      },
    ],
  },
];

const TOTAL_QUESTIONS = SECTIONS.reduce((a, s) => a + s.questions.length, 0);

function formatTime(s) {
  const m = Math.floor(s / 60);
  const sec = s % 60;
  return `${m}:${sec.toString().padStart(2, "0")}`;
}

function countWords(str) {
  return str.trim().split(/\s+/).filter(Boolean).length;
}

export default function AptitudeTest() {
  const [screen, setScreen] = useState("intro"); // intro | test | review | results
  const [sectionIdx, setSectionIdx] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [sectionTimes, setSectionTimes] = useState({});
  const [candidateName, setCandidateName] = useState("");
  const [candidateRole, setCandidateRole] = useState("");
  const timerRef = useRef(null);

  const section = SECTIONS[sectionIdx];
  const question = section?.questions[questionIdx];

  useEffect(() => {
    if (screen === "test" && timeLeft > 0) {
      timerRef.current = setInterval(() => {
        setTimeLeft((t) => {
          if (t <= 1) {
            clearInterval(timerRef.current);
            handleNextSection();
            return 0;
          }
          return t - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [screen, sectionIdx]);

  function startTest() {
    if (!candidateName.trim() || !candidateRole) return;
    setScreen("test");
    setTimeLeft(section.duration);
  }

  function handleAnswer(val) {
    setAnswers((prev) => ({ ...prev, [question.id]: val }));
  }

  function handleNext() {
    if (questionIdx < section.questions.length - 1) {
      setQuestionIdx(questionIdx + 1);
    } else {
      handleNextSection();
    }
  }

  function handleNextSection() {
    clearInterval(timerRef.current);
    setSectionTimes((prev) => ({ ...prev, [section.id]: section.duration - timeLeft }));
    if (sectionIdx < SECTIONS.length - 1) {
      setSectionIdx(sectionIdx + 1);
      setQuestionIdx(0);
      setTimeLeft(SECTIONS[sectionIdx + 1].duration);
    } else {
      setScreen("results");
    }
  }

  function calcResults() {
    let scores = {};
    SECTIONS.forEach((sec) => {
      let correct = 0, total = 0, freeText = [];
      sec.questions.forEach((q) => {
        if (q.type === "mc") {
          total++;
          if (answers[q.id] === q.answer) correct++;
        } else {
          freeText.push({ q: q.text.substring(0, 60) + "...", a: answers[q.id] || "(no answer)" });
        }
      });
      scores[sec.id] = { correct, total, freeText, pct: total > 0 ? Math.round((correct / total) * 100) : null };
    });
    return scores;
  }

  const scores = screen === "results" ? calcResults() : null;
  const overallMC = scores
    ? Object.values(scores).reduce((a, s) => ({ c: a.c + s.correct, t: a.t + s.total }), { c: 0, t: 0 })
    : null;

  // ---- INTRO ----
  if (screen === "intro") {
    return (
      <div style={styles.page}>
        <div style={styles.card}>
          <div style={styles.logo}>⬡</div>
          <h1 style={styles.title}>Candidate Assessment</h1>
          <p style={styles.subtitle}>~30 minutes · {TOTAL_QUESTIONS} questions · 5 sections</p>
          <div style={styles.sectionList}>
            {SECTIONS.map((s, i) => (
              <div key={s.id} style={styles.sectionPill}>
                <span style={{ ...styles.pillNum, background: s.accent }}>{i + 1}</span>
                <span style={styles.pillText}>{s.title}</span>
                <span style={styles.pillTime}>{formatTime(s.duration)}</span>
              </div>
            ))}
          </div>
          <div style={styles.fieldGroup}>
            <input
              style={styles.input}
              placeholder="Full Name"
              value={candidateName}
              onChange={(e) => setCandidateName(e.target.value)}
            />
            <select
              style={styles.input}
              value={candidateRole}
              onChange={(e) => setCandidateRole(e.target.value)}
            >
              <option value="">Select the role you're applying for</option>
              <option value="Customer Support Agent">Customer Support Agent</option>
              <option value="E-Commerce Manager">E-Commerce Manager</option>
              <option value="Sales/Account Manager">Sales/Account Manager</option>
              <option value="Operations/Fulfillment">Operations/Fulfillment</option>
            </select>
          </div>
          <div style={styles.notice}>
            <b>⏱ Time-limited sections</b> — answer quickly and honestly. Each section auto-advances when time expires.
          </div>
          <button
            style={{ ...styles.btn, opacity: candidateName && candidateRole ? 1 : 0.4 }}
            onClick={startTest}
            disabled={!candidateName || !candidateRole}
          >
            Begin Assessment →
          </button>
        </div>
      </div>
    );
  }

  // ---- TEST ----
  if (screen === "test") {
    const progress = (
      (SECTIONS.slice(0, sectionIdx).reduce((a, s) => a + s.questions.length, 0) + questionIdx) /
      TOTAL_QUESTIONS
    ) * 100;
    const urgent = timeLeft < 60;

    return (
      <div style={{ ...styles.page, background: section.color }}>
        {/* Top bar */}
        <div style={styles.topBar}>
          <div style={styles.sectionLabel}>{section.title}</div>
          <div style={{ ...styles.timer, color: urgent ? "#ff4757" : "#fff", animation: urgent ? "pulse 1s infinite" : "none" }}>
            ⏱ {formatTime(timeLeft)}
          </div>
        </div>
        {/* Progress */}
        <div style={styles.progressBar}>
          <div style={{ ...styles.progressFill, width: `${progress}%`, background: section.accent }} />
        </div>
        {/* Question */}
        <div style={styles.qCard}>
          <div style={styles.qMeta}>
            Q{questionIdx + 1} of {section.questions.length}
          </div>
          <div style={styles.qText}>{question.text}</div>

          {question.type === "mc" && (
            <div style={styles.options}>
              {question.options.map((opt, i) => (
                <button
                  key={i}
                  style={{
                    ...styles.optBtn,
                    borderColor: answers[question.id] === i ? section.accent : "#333",
                    background: answers[question.id] === i ? section.accent + "22" : "transparent",
                  }}
                  onClick={() => handleAnswer(i)}
                >
                  <span style={{ ...styles.optLetter, background: answers[question.id] === i ? section.accent : "#333" }}>
                    {String.fromCharCode(65 + i)}
                  </span>
                  {opt}
                </button>
              ))}
            </div>
          )}

          {(question.type === "free" || question.type === "rewrite") && (
            <div>
              <textarea
                style={styles.textarea}
                placeholder={question.placeholder}
                value={answers[question.id] || ""}
                onChange={(e) => handleAnswer(e.target.value)}
                rows={6}
              />
              <div style={styles.wordCount}>
                {countWords(answers[question.id] || "")} words
                {question.minWords && countWords(answers[question.id] || "") < question.minWords && (
                  <span style={{ color: "#ff4757" }}> (min {question.minWords})</span>
                )}
              </div>
            </div>
          )}

          <div style={styles.navRow}>
            <div style={styles.sectionDots}>
              {SECTIONS.map((s, i) => (
                <div
                  key={s.id}
                  style={{
                    ...styles.dot,
                    background: i < sectionIdx ? s.accent : i === sectionIdx ? "#fff" : "#444",
                  }}
                />
              ))}
            </div>
            <button style={{ ...styles.btn, background: section.accent }} onClick={handleNext}>
              {questionIdx < section.questions.length - 1
                ? "Next →"
                : sectionIdx < SECTIONS.length - 1
                ? "Next Section →"
                : "Submit Test →"}
            </button>
          </div>
        </div>
        <style>{`@keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.5} }`}</style>
      </div>
    );
  }

  // ---- RESULTS ----
  if (screen === "results") {
    return (
      <div style={styles.page}>
        <div style={{ ...styles.card, maxWidth: 700 }}>
          <div style={styles.logo}>✓</div>
          <h1 style={styles.title}>Assessment Complete</h1>
          <p style={styles.subtitle}>{candidateName} · {candidateRole}</p>

          <div style={styles.scoreBox}>
            <div style={styles.bigScore}>
              {overallMC.c}/{overallMC.t}
            </div>
            <div style={styles.bigScoreLabel}>Auto-scored questions correct</div>
          </div>

          {SECTIONS.map((sec) => {
            const s = scores[sec.id];
            return (
              <div key={sec.id} style={styles.resultSection}>
                <div style={styles.resultHeader}>
                  <span style={{ ...styles.resultDot, background: sec.accent }} />
                  <b>{sec.title}</b>
                  {s.total > 0 && (
                    <span style={{ marginLeft: "auto", color: sec.accent, fontWeight: 700 }}>
                      {s.correct}/{s.total} ({s.pct}%)
                    </span>
                  )}
                </div>
                {s.freeText.map((ft, i) => (
                  <div key={i} style={styles.freeResult}>
                    <div style={styles.freeQ}>Q: {ft.q}</div>
                    <div style={styles.freeA}>A: {ft.a}</div>
                  </div>
                ))}
              </div>
            );
          })}

          <div style={styles.notice}>
            <b>📋 For the hiring manager:</b> Review free-text answers above using the scoring rubric. Free-text sections require manual evaluation.
          </div>
          <button style={styles.btn} onClick={() => window.print()}>
            🖨 Print / Save Results
          </button>
        </div>
      </div>
    );
  }
}

const styles = {
  page: {
    minHeight: "100vh",
    background: "#0d0d1a",
    display: "flex",
    alignItems: "flex-start",
    justifyContent: "center",
    padding: "40px 16px",
    fontFamily: "'Georgia', serif",
    color: "#fff",
  },
  card: {
    background: "#161625",
    border: "1px solid #2a2a45",
    borderRadius: 16,
    padding: "48px 40px",
    maxWidth: 560,
    width: "100%",
  },
  logo: {
    fontSize: 40,
    textAlign: "center",
    marginBottom: 12,
    color: "#e94560",
  },
  title: {
    fontSize: 28,
    fontWeight: 700,
    textAlign: "center",
    margin: "0 0 8px",
    letterSpacing: "-0.5px",
  },
  subtitle: {
    color: "#888",
    textAlign: "center",
    marginBottom: 32,
    fontSize: 14,
  },
  sectionList: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
    marginBottom: 28,
  },
  sectionPill: {
    display: "flex",
    alignItems: "center",
    gap: 12,
    background: "#1e1e30",
    borderRadius: 8,
    padding: "10px 14px",
  },
  pillNum: {
    width: 24,
    height: 24,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 700,
    flexShrink: 0,
  },
  pillText: { flex: 1, fontSize: 14 },
  pillTime: { color: "#666", fontSize: 13 },
  fieldGroup: { display: "flex", flexDirection: "column", gap: 12, marginBottom: 20 },
  input: {
    background: "#1e1e30",
    border: "1px solid #2a2a45",
    borderRadius: 8,
    padding: "12px 16px",
    color: "#fff",
    fontSize: 15,
    fontFamily: "Georgia, serif",
    outline: "none",
    width: "100%",
    boxSizing: "border-box",
  },
  notice: {
    background: "#1e1e30",
    border: "1px solid #2a2a45",
    borderRadius: 8,
    padding: "12px 16px",
    fontSize: 13,
    color: "#aaa",
    marginBottom: 20,
    lineHeight: 1.6,
  },
  btn: {
    width: "100%",
    padding: "14px",
    background: "#e94560",
    color: "#fff",
    border: "none",
    borderRadius: 10,
    fontSize: 16,
    fontWeight: 700,
    cursor: "pointer",
    fontFamily: "Georgia, serif",
    letterSpacing: "0.3px",
  },
  topBar: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "16px 24px",
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    background: "rgba(0,0,0,0.6)",
    backdropFilter: "blur(8px)",
    zIndex: 100,
  },
  sectionLabel: { fontSize: 13, color: "#aaa", fontWeight: 600, letterSpacing: 1, textTransform: "uppercase" },
  timer: { fontSize: 20, fontWeight: 700, fontFamily: "monospace" },
  progressBar: { position: "fixed", top: 56, left: 0, right: 0, height: 3, background: "#222", zIndex: 100 },
  progressFill: { height: "100%", transition: "width 0.3s ease" },
  qCard: {
    marginTop: 80,
    background: "#161625",
    border: "1px solid #2a2a45",
    borderRadius: 16,
    padding: "36px 32px",
    maxWidth: 680,
    width: "100%",
  },
  qMeta: { fontSize: 12, color: "#555", marginBottom: 12, textTransform: "uppercase", letterSpacing: 1 },
  qText: { fontSize: 18, lineHeight: 1.7, marginBottom: 28, whiteSpace: "pre-line" },
  options: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 },
  optBtn: {
    display: "flex",
    alignItems: "center",
    gap: 14,
    padding: "14px 16px",
    background: "transparent",
    border: "1px solid #333",
    borderRadius: 10,
    color: "#fff",
    fontSize: 15,
    cursor: "pointer",
    textAlign: "left",
    fontFamily: "Georgia, serif",
    transition: "all 0.15s",
  },
  optLetter: {
    width: 28,
    height: 28,
    borderRadius: "50%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: 12,
    fontWeight: 700,
    flexShrink: 0,
    color: "#fff",
    transition: "background 0.15s",
  },
  textarea: {
    width: "100%",
    background: "#1e1e30",
    border: "1px solid #2a2a45",
    borderRadius: 10,
    padding: "14px",
    color: "#fff",
    fontSize: 15,
    fontFamily: "Georgia, serif",
    resize: "vertical",
    outline: "none",
    boxSizing: "border-box",
    lineHeight: 1.6,
    marginBottom: 8,
  },
  wordCount: { fontSize: 12, color: "#555", marginBottom: 20, textAlign: "right" },
  navRow: { display: "flex", justifyContent: "space-between", alignItems: "center" },
  sectionDots: { display: "flex", gap: 6 },
  dot: { width: 8, height: 8, borderRadius: "50%", transition: "background 0.3s" },
  scoreBox: {
    background: "#1e1e30",
    border: "1px solid #2a2a45",
    borderRadius: 12,
    padding: "24px",
    textAlign: "center",
    marginBottom: 28,
  },
  bigScore: { fontSize: 52, fontWeight: 700, color: "#e94560" },
  bigScoreLabel: { color: "#888", fontSize: 13 },
  resultSection: {
    background: "#1e1e30",
    border: "1px solid #2a2a45",
    borderRadius: 10,
    padding: "16px",
    marginBottom: 12,
  },
  resultHeader: { display: "flex", alignItems: "center", gap: 10, marginBottom: 10, fontSize: 14 },
  resultDot: { width: 10, height: 10, borderRadius: "50%", flexShrink: 0 },
  freeResult: { marginTop: 10, paddingTop: 10, borderTop: "1px solid #2a2a45" },
  freeQ: { fontSize: 12, color: "#777", marginBottom: 4 },
  freeA: { fontSize: 13, color: "#ccc", lineHeight: 1.6 },
};
