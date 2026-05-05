import { useState, useEffect, useRef } from "react";

const EMAILJS_SERVICE_ID  = "service_fipxcf7";
const EMAILJS_TEMPLATE_ID = "template_mwolk6p";
const EMAILJS_PUBLIC_KEY  = "9hXOZnnew2Met7Yk9";
const RESULTS_EMAIL       = "adamjbutler89@gmail.com";

const SECTIONS = [
  { id: "logic", title: "Problem Solving & Logic", duration: 480, color: "#1a1a2e", accent: "#e94560", questions: [
    { id: "l1", type: "mc", text: "A customer places 3 orders. The first is $45, the second is twice the first, and the third is $15 less than the second. What is the total order value?", options: ["$195", "$210", "$180", "$220"], answer: 0 },
    { id: "l2", type: "mc", text: "If all returns require a receipt, and Sarah has a receipt, which of the following must be true?", options: ["Sarah will get a refund", "Sarah can make a return", "Sarah's item is defective", "Sarah bought the item recently"], answer: 1 },
    { id: "l3", type: "mc", text: "A warehouse has 240 units. On Monday 60 are shipped, Tuesday 45 arrive, Wednesday 30 are shipped. How many units remain?", options: ["195", "205", "215", "185"], answer: 0 },
    { id: "l4", type: "mc", text: "Which number comes next in the sequence: 2, 6, 18, 54, ___?", options: ["108", "162", "72", "216"], answer: 1 },
    { id: "l5", type: "mc", text: "If it takes 4 staff members 6 hours to process 480 orders, how long would it take 3 staff members to process the same number of orders?", options: ["7 hours", "8 hours", "9 hours", "10 hours"], answer: 1 },
    { id: "l6", type: "mc", text: "A product has a 20% discount applied, then an additional 10% discount. What is the total percentage reduction from the original price?", options: ["28%", "30%", "25%", "32%"], answer: 0 },
    { id: "l7", type: "mc", text: "An e-commerce store's revenue grew from $80,000 to $100,000. What was the percentage increase?", options: ["20%", "25%", "15%", "30%"], answer: 1 },
    { id: "l8", type: "mc", text: "If Team A processes tickets twice as fast as Team B, and together they complete 90 tickets per hour, how many does Team A complete per hour?", options: ["45", "60", "50", "30"], answer: 1 },
    { id: "l9", type: "mc", text: "Look at the pattern: Circle, Square, Triangle, Circle, Square, ___. What comes next?", options: ["Circle", "Square", "Triangle", "Diamond"], answer: 2 },
    { id: "l10", type: "mc", text: "A shipping container holds 500kg. Box A weighs 120kg, Box B weighs 85kg, Box C weighs 210kg. Can you add Box D (95kg)?", options: ["Yes, with 10kg to spare", "No, it exceeds capacity by 10kg", "Yes, exactly at capacity", "No, it exceeds capacity by 5kg"], answer: 1 },
  ]},
  { id: "customer", title: "Customer Service & Empathy", duration: 480, color: "#0f3460", accent: "#e94560", questions: [
    { id: "c1", type: "free", text: "A customer emails: \"I ordered 2 weeks ago and my package still hasn't arrived. I needed it for my daughter's birthday which was YESTERDAY. This is completely unacceptable. I want a refund NOW.\" Write your response to this customer.", placeholder: "Write your customer response here...", minWords: 40 },
    { id: "c2", type: "free", text: "A customer is on live chat saying they were charged twice for one order. You can see in the system that only one charge went through on your end. How do you handle this conversation?", placeholder: "Describe how you would handle this situation...", minWords: 40 },
    { id: "c3", type: "mc", text: "A customer calls angry about a delayed order. After listening, what is your FIRST priority?", options: ["Explain company shipping policies", "Acknowledge their frustration and apologise", "Immediately offer a refund", "Transfer them to the shipping department"], answer: 1 },
  ]},
  { id: "comms", title: "Communication Skills", duration: 300, color: "#16213e", accent: "#0f9b8e", questions: [
    { id: "co1", type: "rewrite", text: "Rewrite this email response professionally and clearly:\n\n\"hey so we looked into it and yeah the order got lost somewhere. we can send another one if you want or give you money back. let us know what\"", placeholder: "Write your improved version here...", minWords: 30 },
    { id: "co2", type: "mc", text: "Which subject line is most effective for a follow-up email to a customer whose complaint was resolved?", options: ["RE: Your complaint", "Update regarding your recent experience with us", "FYI - we fixed the problem", "Your order issue"], answer: 1 },
    { id: "co3", type: "mc", text: "A team member sends you a confusing message about a task. What is the best response?", options: ["Ignore it and figure it out yourself", "Forward it to your manager", "Ask a specific clarifying question", "Reply with your best guess"], answer: 2 },
    { id: "co4", type: "mc", text: "Which phrase is most appropriate when you cannot meet a customer's request?", options: ["\"That's not possible.\"", "\"I understand that's frustrating — here's what I can do for you...\"", "\"You'll need to contact someone else.\"", "\"Our policy doesn't allow that.\""], answer: 1 },
  ]},
  { id: "ecommerce", title: "E-Commerce Knowledge", duration: 360, color: "#1a1a2e", accent: "#f5a623", questions: [
    { id: "e1", type: "mc", text: "On Shopify, what is a 'variant' of a product?", options: ["A product in a different store", "A different version of a product (e.g. size or colour)", "A discounted version of a product", "A product bundle"], answer: 1 },
    { id: "e2", type: "mc", text: "What does 'FBA' stand for in Amazon selling?", options: ["Free Business Account", "Fulfilled By Amazon", "Flat-rate Billing Agreement", "Freight By Air"], answer: 1 },
    { id: "e3", type: "mc", text: "On eBay, what is a 'Best Offer' listing?", options: ["A listing only available to premium members", "A fixed-price listing where buyers can negotiate", "An auction listing", "A listing with free shipping"], answer: 1 },
    { id: "e4", type: "mc", text: "What is the main purpose of a SKU in e-commerce?", options: ["To set the product price", "To uniquely identify a product for inventory tracking", "To calculate shipping costs", "To categorise products for SEO"], answer: 1 },
    { id: "e5", type: "mc", text: "A customer orders a product that shows 'in stock' but you discover it's actually out of stock. What is the best course of action?", options: ["Ship a similar product without telling them", "Wait and hope stock arrives before they notice", "Contact the customer immediately, explain, and offer alternatives", "Refund automatically without communication"], answer: 2 },
    { id: "e6", type: "mc", text: "What is 'conversion rate' in e-commerce?", options: ["The percentage of visitors who make a purchase", "The exchange rate for international orders", "The rate at which returns are processed", "The percentage of products that sell out"], answer: 0 },
    { id: "e7", type: "mc", text: "On Neto (Maropost), what is the primary function of the 'Inventory' module?", options: ["Managing customer loyalty points", "Tracking stock levels, locations and movements", "Processing payment gateways", "Building product landing pages"], answer: 1 },
    { id: "e8", type: "mc", text: "What does 'cart abandonment' mean in e-commerce?", options: ["A customer requesting a refund", "A customer adding items to their cart but not completing the purchase", "A product being removed from the store", "A failed payment transaction"], answer: 1 },
  ]},
  { id: "detail", title: "Attention to Detail", duration: 180, color: "#0f3460", accent: "#9b59b6", questions: [
    { id: "d1", type: "mc", text: "Spot the error in this order confirmation:\n\n\"Order #4821 — 2x Blue T-Shirt (Size M) — $24.99 each — Subtotal: $49.98 — Shipping: $8.50 — Total: $57.48\"", options: ["The order number is wrong", "The subtotal is incorrect", "The total is incorrect — should be $58.48", "No error"], answer: 2 },
    { id: "d2", type: "mc", text: "Which of these email addresses contains an error?\n\nA) sarah.jones@gmail.com\nB) mark_smith@outlook.com\nC) jessica.brown@yahoo.com\nD) tom.wilsonhotmail.com", options: ["A", "B", "C", "D"], answer: 3 },
    { id: "d3", type: "mc", text: "A customer's address is: \"14 Harbour St, Sydeny, NSW 2000\". What is wrong?", options: ["The street name is wrong", "The suburb is misspelled", "The postcode is wrong", "Nothing is wrong"], answer: 1 },
    { id: "d4", type: "mc", text: "Review these 4 product prices. Which one is inconsistently formatted?\nA) $12.99  B) $8.50  C) $24.9  D) $15.00", options: ["A", "B", "C", "D"], answer: 2 },
    { id: "d5", type: "mc", text: "Find the duplicate in this order list:\nOrder 1: SKU-4421 x2\nOrder 2: SKU-8832 x1\nOrder 3: SKU-4421 x1\nOrder 4: SKU-9910 x3", options: ["SKU-8832", "SKU-4421", "SKU-9910", "No duplicate"], answer: 1 },
  ]},
];

const TOTAL_QUESTIONS = SECTIONS.reduce((a, s) => a + s.questions.length, 0);
function formatTime(s) { const m = Math.floor(s/60); return `${m}:${(s%60).toString().padStart(2,"0")}`; }
function formatDuration(s) { const m = Math.floor(s/60); const sec = s%60; if(m===0) return `${sec}s`; return `${m}m ${sec}s`; }
function countWords(str) { return str.trim().split(/\s+/).filter(Boolean).length; }

function buildEmailBody(candidateName, candidateRole, completedAt, totalTimeSecs, scores, sectionTimes, answers) {
  const totalMC = Object.values(scores).reduce((a,s)=>({c:a.c+s.correct,t:a.t+s.total}),{c:0,t:0});
  const pct = Math.round((totalMC.c/totalMC.t)*100);
  const rec = pct>=85?"STRONG PASS - Prioritise for interview":pct>=70?"PASS - Consider for interview":pct>=55?"BORDERLINE - Review carefully":"FAIL - Do not proceed";
  let body = `CANDIDATE ASSESSMENT RESULTS\n${"=".repeat(40)}\nCandidate:  ${candidateName}\nRole:       ${candidateRole}\nCompleted:  ${completedAt}\nTotal Time: ${formatDuration(totalTimeSecs)}\n\nOVERALL SCORE: ${totalMC.c}/${totalMC.t} (${pct}%)\nRECOMMENDATION: ${rec}\n\n${"=".repeat(40)}\nDETAILED ANSWERS BY SECTION\n${"=".repeat(40)}`;
  SECTIONS.forEach(sec => {
    const s = scores[sec.id];
    body += `\n\n--- ${sec.title.toUpperCase()} ---\n`;
    if(s.total>0) body += `Score: ${s.correct}/${s.total} (${s.pct}%) | Time: ${formatDuration(sectionTimes[sec.id]||0)}\n`;
    sec.questions.forEach((q,qi) => {
      body += `\nQ${qi+1}. ${q.text}\n`;
      if(q.type==="mc") {
        const ca = answers[q.id]!==undefined?q.options[answers[q.id]]:"(not answered)";
        const correct = answers[q.id]===q.answer;
        body += `  Their answer: ${correct?"[CORRECT]":"[WRONG]"} ${ca}\n`;
        if(!correct) body += `  Correct answer: ${q.options[q.answer]}\n`;
      } else {
        body += `  Free-text response:\n  "${answers[q.id]||"(no answer)"}"\n  [Requires manual scoring - see rubric]\n`;
      }
    });
  });
  return body;
}

export default function AptitudeTest() {
  const [screen, setScreen] = useState("intro");
  const [sectionIdx, setSectionIdx] = useState(0);
  const [questionIdx, setQuestionIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(null);
  const [sectionTimes, setSectionTimes] = useState({});
  const [candidateName, setCandidateName] = useState("");
  const [candidateRole, setCandidateRole] = useState("");
  const [testStartTime, setTestStartTime] = useState(null);
  const [totalTimeSecs, setTotalTimeSecs] = useState(0);
  const [emailStatus, setEmailStatus] = useState(null);
  const timerRef = useRef(null);
  const section = SECTIONS[sectionIdx];
  const question = section?.questions[questionIdx];

  useEffect(() => {
    if (screen==="test" && timeLeft>0) {
      timerRef.current = setInterval(() => {
        setTimeLeft(t => { if(t<=1){clearInterval(timerRef.current);handleNextSection();return 0;} return t-1; });
      }, 1000);
    }
    return () => clearInterval(timerRef.current);
  }, [screen, sectionIdx]);

  function startTest() {
    if(!candidateName.trim()||!candidateRole) return;
    setTestStartTime(Date.now()); setScreen("test"); setTimeLeft(section.duration);
  }
  function handleAnswer(val) { setAnswers(prev=>({...prev,[question.id]:val})); }
  function handleNext() { questionIdx<section.questions.length-1?setQuestionIdx(questionIdx+1):handleNextSection(); }

  function handleNextSection() {
    clearInterval(timerRef.current);
    const timeTaken = section.duration - (timeLeft||0);
    setSectionTimes(prev=>({...prev,[section.id]:timeTaken}));
    if(sectionIdx<SECTIONS.length-1){setSectionIdx(sectionIdx+1);setQuestionIdx(0);setTimeLeft(SECTIONS[sectionIdx+1].duration);}
    else{const total=Math.round((Date.now()-testStartTime)/1000);setTotalTimeSecs(total);setScreen("results");}
  }

  function calcResults() {
    let scores={};
    SECTIONS.forEach(sec=>{
      let correct=0,total=0,freeText=[];
      sec.questions.forEach(q=>{
        if(q.type==="mc"){total++;if(answers[q.id]===q.answer)correct++;}
        else{freeText.push({q:q.text.substring(0,60)+"...",a:answers[q.id]||"(no answer)"});}
      });
      scores[sec.id]={correct,total,freeText,pct:total>0?Math.round((correct/total)*100):null,timeTaken:sectionTimes[sec.id]||0};
    });
    return scores;
  }

  const scores = screen==="results"?calcResults():null;
  const overallMC = scores?Object.values(scores).reduce((a,s)=>({c:a.c+s.correct,t:a.t+s.total}),{c:0,t:0}):null;

  useEffect(()=>{
    if(screen==="results"&&scores&&emailStatus===null){
      setEmailStatus("sending");
      const completedAt = new Date().toLocaleString("en-AU",{timeZone:"Asia/Dubai"});
      const body = buildEmailBody(candidateName,candidateRole,completedAt,totalTimeSecs,scores,sectionTimes,answers);
      // EmailJS send
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/npm/@emailjs/browser@4/dist/email.min.js";
      script.onload = () => {
        window.emailjs.init(EMAILJS_PUBLIC_KEY);
        window.emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, {
          to_email: RESULTS_EMAIL,
          candidate_name: candidateName,
          candidate_role: candidateRole,
          completed_at: completedAt,
          total_time: formatDuration(totalTimeSecs),
          overall_score: `${overallMC.c}/${overallMC.t} (${Math.round((overallMC.c/overallMC.t)*100)}%)`,
          full_results: body,
        }).then(()=>setEmailStatus("sent")).catch(()=>setEmailStatus("failed"));
      };
      script.onerror = ()=>setEmailStatus("failed");
      document.head.appendChild(script);
    }
  },[screen]);

  if(screen==="intro") return (
    <div style={S.page}><div style={S.card}>
      <div style={S.logo}>⬡</div>
      <h1 style={S.title}>Candidate Assessment</h1>
      <p style={S.sub}>~30 minutes · {TOTAL_QUESTIONS} questions · 5 sections</p>
      <div style={S.secList}>{SECTIONS.map((s,i)=>(
        <div key={s.id} style={S.pill}>
          <span style={{...S.pillN,background:s.accent}}>{i+1}</span>
          <span style={{flex:1,fontSize:14}}>{s.title}</span>
          <span style={{color:"#666",fontSize:13}}>{formatTime(s.duration)}</span>
        </div>
      ))}</div>
      <div style={{display:"flex",flexDirection:"column",gap:12,marginBottom:20}}>
        <input style={S.input} placeholder="Full Name" value={candidateName} onChange={e=>setCandidateName(e.target.value)}/>
        <select style={S.input} value={candidateRole} onChange={e=>setCandidateRole(e.target.value)}>
          <option value="">Select the role you're applying for</option>
          <option>Customer Support Agent</option><option>E-Commerce Manager</option>
          <option>Sales/Account Manager</option><option>Operations/Fulfillment</option>
        </select>
      </div>
      <div style={S.notice}><b>⏱ Time-limited sections</b> — answer quickly and honestly. Each section auto-advances when time expires.</div>
      <button style={{...S.btn,opacity:candidateName&&candidateRole?1:0.4}} onClick={startTest} disabled={!candidateName||!candidateRole}>Begin Assessment →</button>
    </div></div>
  );

  if(screen==="test") {
    const progress = (SECTIONS.slice(0,sectionIdx).reduce((a,s)=>a+s.questions.length,0)+questionIdx)/TOTAL_QUESTIONS*100;
    const urgent = timeLeft<60;
    return (
      <div style={{...S.page,background:section.color}}>
        <div style={S.topBar}>
          <div style={{fontSize:13,color:"#aaa",fontWeight:600,letterSpacing:1,textTransform:"uppercase"}}>{section.title}</div>
          <div style={{fontSize:20,fontWeight:700,fontFamily:"monospace",color:urgent?"#ff4757":"#fff",animation:urgent?"pulse 1s infinite":"none"}}>⏱ {formatTime(timeLeft)}</div>
        </div>
        <div style={S.progressBar}><div style={{...S.progressFill,width:`${progress}%`,background:section.accent}}/></div>
        <div style={S.qCard}>
          <div style={{fontSize:12,color:"#555",marginBottom:12,textTransform:"uppercase",letterSpacing:1}}>Q{questionIdx+1} of {section.questions.length}</div>
          <div style={{fontSize:18,lineHeight:1.7,marginBottom:28,whiteSpace:"pre-line"}}>{question.text}</div>
          {question.type==="mc"&&<div style={{display:"flex",flexDirection:"column",gap:10,marginBottom:28}}>
            {question.options.map((opt,i)=>(
              <button key={i} style={{...S.optBtn,borderColor:answers[question.id]===i?section.accent:"#333",background:answers[question.id]===i?section.accent+"22":"transparent"}} onClick={()=>handleAnswer(i)}>
                <span style={{...S.optL,background:answers[question.id]===i?section.accent:"#333"}}>{String.fromCharCode(65+i)}</span>{opt}
              </button>
            ))}
          </div>}
          {(question.type==="free"||question.type==="rewrite")&&<div>
            <textarea style={S.textarea} placeholder={question.placeholder} value={answers[question.id]||""} onChange={e=>handleAnswer(e.target.value)} rows={6}/>
            <div style={{fontSize:12,color:"#555",marginBottom:20,textAlign:"right"}}>
              {countWords(answers[question.id]||"")} words
              {question.minWords&&countWords(answers[question.id]||"")<question.minWords&&<span style={{color:"#ff4757"}}> (min {question.minWords})</span>}
            </div>
          </div>}
          <div style={{display:"flex",justifyContent:"space-between",alignItems:"center"}}>
            <div style={{display:"flex",gap:6}}>{SECTIONS.map((s,i)=><div key={s.id} style={{width:8,height:8,borderRadius:"50%",background:i<sectionIdx?s.accent:i===sectionIdx?"#fff":"#444"}}/>)}</div>
            <button style={{...S.btn,width:"auto",padding:"12px 24px",background:section.accent}} onClick={handleNext}>
              {questionIdx<section.questions.length-1?"Next →":sectionIdx<SECTIONS.length-1?"Next Section →":"Submit Test →"}
            </button>
          </div>
        </div>
        <style>{`@keyframes pulse{0%,100%{opacity:1}50%{opacity:0.5}}`}</style>
      </div>
    );
  }

  if(screen==="results") {
    const pct = Math.round((overallMC.c/overallMC.t)*100);
    const rec = pct>=85?{text:"✅ Strong Pass — Prioritise for interview",color:"#2ecc71"}:pct>=70?{text:"✅ Pass — Consider for interview",color:"#2ecc71"}:pct>=55?{text:"⚠️ Borderline — Review carefully",color:"#f39c12"}:{text:"❌ Fail — Do not proceed",color:"#e74c3c"};
    return (
      <div style={S.page}><div style={{...S.card,maxWidth:720}}>
        <div style={S.logo}>✓</div>
        <h1 style={S.title}>Assessment Complete</h1>
        <p style={S.sub}>{candidateName} · {candidateRole}</p>

        <div style={{border:"1px solid",borderRadius:8,padding:"10px 14px",fontSize:13,marginBottom:20,textAlign:"center",background:emailStatus==="sent"?"#1a3a2a":emailStatus==="failed"?"#3a1a1a":"#1e1e30",borderColor:emailStatus==="sent"?"#2ecc71":emailStatus==="failed"?"#e74c3c":"#444"}}>
          {emailStatus==="sending"&&"📧 Sending results to hiring manager..."}
          {emailStatus==="sent"&&"✅ Results emailed to adamjbutler89@gmail.com"}
          {emailStatus==="failed"&&"⚠️ Email failed — please screenshot this page and send manually"}
        </div>

        <div style={{display:"flex",gap:12,marginBottom:16}}>
          {[{v:`${overallMC.c}/${overallMC.t}`,l:"MC Correct"},{v:`${pct}%`,l:"Overall Score"},{v:formatDuration(totalTimeSecs),l:"Total Time"}].map((b,i)=>(
            <div key={i} style={{flex:1,background:"#1e1e30",border:"1px solid #2a2a45",borderRadius:12,padding:"16px",textAlign:"center"}}>
              <div style={{fontSize:i===2?26:36,fontWeight:700,color:"#e94560"}}>{b.v}</div>
              <div style={{color:"#888",fontSize:11,marginTop:4}}>{b.l}</div>
            </div>
          ))}
        </div>

        <div style={{border:`1px solid ${rec.color}`,borderRadius:8,padding:"10px 16px",fontSize:14,textAlign:"center",marginBottom:20,color:rec.color}}>{rec.text}</div>

        {SECTIONS.map(sec=>{
          const s=scores[sec.id];
          return (
            <div key={sec.id} style={{background:"#1e1e30",border:"1px solid #2a2a45",borderRadius:10,padding:"16px",marginBottom:12}}>
              <div style={{display:"flex",alignItems:"center",gap:10,marginBottom:12,fontSize:14}}>
                <span style={{width:10,height:10,borderRadius:"50%",background:sec.accent,flexShrink:0}}/>
                <b>{sec.title}</b>
                <span style={{marginLeft:"auto",fontSize:12,color:"#888"}}>⏱ {formatDuration(s.timeTaken)}</span>
                {s.total>0&&<span style={{marginLeft:16,color:sec.accent,fontWeight:700}}>{s.correct}/{s.total} ({s.pct}%)</span>}
              </div>
              {sec.questions.map((q,qi)=>{
                if(q.type==="mc"){
                  const ca=answers[q.id]!==undefined?q.options[answers[q.id]]:"(not answered)";
                  const isOk=answers[q.id]===q.answer;
                  return (
                    <div key={q.id} style={{borderTop:"1px solid #2a2a45",paddingTop:10,marginTop:10}}>
                      <div style={{fontSize:12,color:"#999",marginBottom:8,lineHeight:1.5,whiteSpace:"pre-line"}}>Q{qi+1}. {q.text}</div>
                      <div style={{display:"flex",flexWrap:"wrap",gap:8}}>
                        <span style={{fontSize:12,padding:"4px 10px",borderRadius:6,background:isOk?"#1a3a2a":"#3a1a1a",color:isOk?"#2ecc71":"#e74c3c",border:`1px solid ${isOk?"#2ecc71":"#e74c3c"}`}}>{isOk?"✓":"✗"} Their answer: {ca}</span>
                        {!isOk&&<span style={{fontSize:12,padding:"4px 10px",borderRadius:6,background:"#1a3a1a",color:"#2ecc71",border:"1px solid #2ecc71"}}>✓ Correct: {q.options[q.answer]}</span>}
                      </div>
                    </div>
                  );
                }
                return (
                  <div key={q.id} style={{borderTop:"1px solid #2a2a45",paddingTop:10,marginTop:10}}>
                    <div style={{fontSize:12,color:"#777",marginBottom:4}}>Q{qi+1}. {q.text.substring(0,80)}...</div>
                    <div style={{fontSize:13,color:"#ccc",lineHeight:1.6,marginBottom:6}}>{answers[q.id]||"(no answer)"}</div>
                    <span style={{fontSize:11,color:"#f39c12",background:"#2a2010",border:"1px solid #f39c12",borderRadius:4,padding:"2px 8px"}}>⚠ Requires manual scoring</span>
                  </div>
                );
              })}
            </div>
          );
        })}

        <div style={S.notice}><b>📋 For the hiring manager:</b> Full results with all answers have been emailed to adamjbutler89@gmail.com. Free-text answers require manual review using the scoring rubric.</div>
        <button style={S.btn} onClick={()=>window.print()}>🖨 Print / Save Results</button>
      </div></div>
    );
  }
}

const S = {
  page:{minHeight:"100vh",background:"#0d0d1a",display:"flex",alignItems:"flex-start",justifyContent:"center",padding:"40px 16px",fontFamily:"Georgia,serif",color:"#fff"},
  card:{background:"#161625",border:"1px solid #2a2a45",borderRadius:16,padding:"48px 40px",maxWidth:560,width:"100%"},
  logo:{fontSize:40,textAlign:"center",marginBottom:12,color:"#e94560"},
  title:{fontSize:28,fontWeight:700,textAlign:"center",margin:"0 0 8px",letterSpacing:"-0.5px"},
  sub:{color:"#888",textAlign:"center",marginBottom:32,fontSize:14},
  secList:{display:"flex",flexDirection:"column",gap:10,marginBottom:28},
  pill:{display:"flex",alignItems:"center",gap:12,background:"#1e1e30",borderRadius:8,padding:"10px 14px"},
  pillN:{width:24,height:24,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,flexShrink:0},
  input:{background:"#1e1e30",border:"1px solid #2a2a45",borderRadius:8,padding:"12px 16px",color:"#fff",fontSize:15,fontFamily:"Georgia,serif",outline:"none",width:"100%",boxSizing:"border-box"},
  notice:{background:"#1e1e30",border:"1px solid #2a2a45",borderRadius:8,padding:"12px 16px",fontSize:13,color:"#aaa",marginBottom:20,lineHeight:1.6},
  btn:{width:"100%",padding:"14px",background:"#e94560",color:"#fff",border:"none",borderRadius:10,fontSize:16,fontWeight:700,cursor:"pointer",fontFamily:"Georgia,serif"},
  topBar:{display:"flex",justifyContent:"space-between",alignItems:"center",padding:"16px 24px",position:"fixed",top:0,left:0,right:0,background:"rgba(0,0,0,0.6)",backdropFilter:"blur(8px)",zIndex:100},
  progressBar:{position:"fixed",top:56,left:0,right:0,height:3,background:"#222",zIndex:100},
  progressFill:{height:"100%",transition:"width 0.3s ease"},
  qCard:{marginTop:80,background:"#161625",border:"1px solid #2a2a45",borderRadius:16,padding:"36px 32px",maxWidth:680,width:"100%"},
  optBtn:{display:"flex",alignItems:"center",gap:14,padding:"14px 16px",background:"transparent",border:"1px solid #333",borderRadius:10,color:"#fff",fontSize:15,cursor:"pointer",textAlign:"left",fontFamily:"Georgia,serif",transition:"all 0.15s"},
  optL:{width:28,height:28,borderRadius:"50%",display:"flex",alignItems:"center",justifyContent:"center",fontSize:12,fontWeight:700,flexShrink:0,color:"#fff"},
  textarea:{width:"100%",background:"#1e1e30",border:"1px solid #2a2a45",borderRadius:10,padding:"14px",color:"#fff",fontSize:15,fontFamily:"Georgia,serif",resize:"vertical",outline:"none",boxSizing:"border-box",lineHeight:1.6,marginBottom:8},
};
