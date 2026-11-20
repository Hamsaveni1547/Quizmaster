import {useEffect,useRef,useState} from 'react';import {useNavigate,useParams} from 'react-router-dom';import {useApp} from '../../context/AppContext';import {score} from '../../utils/scoring';
export default function Exam(){const {id}=useParams();const {db,user,addAttempt,notify}=useApp();const nav=useNavigate();const quiz=db.quizzes.find(q=>q.id===+id);const key=`qm_exam_${user.id}_${id}`;
 const saved=JSON.parse(localStorage.getItem(key)||'null');
 const [ans,setAns]=useState(saved?.ans||{});const [rev,setRev]=useState(saved?.rev||[]);const [i,setI]=useState(0);const [left,setLeft]=useState(saved?.left??(quiz?quiz.duration*60:0));const [done,setDone]=useState(null);const sub=useRef(false);
 const submit=()=>{if(sub.current)return;sub.current=true;const r=score(quiz,ans);addAttempt({id:Date.now(),quizId:quiz.id,userId:user.id,...r,date:new Date().toISOString().slice(0,10)});localStorage.removeItem(key);setDone(r);notify('Exam submitted')};
 const ref=useRef();ref.current=submit;
 useEffect(()=>{if(done||!quiz)return;const t=setInterval(()=>setLeft(l=>{if(l<=1){clearInterval(t);ref.current();return 0}return l-1}),1000);return()=>clearInterval(t)},[done]);
 useEffect(()=>{if(quiz&&!done)localStorage.setItem(key,JSON.stringify({ans,rev,left}))},[ans,rev,left]);
 if(!quiz)return <div className="card">Quiz not found</div>;
 if(done)return <div className="auth"><div className="card"><h2>{done.pass?'Passed 🎉':'Failed'}</h2><p>{done.got}/{done.total} marks ({done.pct}%)</p>
  {quiz.questions.map((q,n)=>{const ok=[...(ans[q.id]||[])].sort().join()===[...q.answer].sort().join();return <p key={q.id}>{ok?'✅':'❌'} {n+1}. {q.text}<br/><small>Correct: {q.answer.map(a=>q.options[a]).join(', ')} — {q.explanation}</small></p>})}
  <button className="btn" onClick={()=>nav('/results')}>View history</button></div></div>;
 const q=quiz.questions[i];if(!q)return <div className="card">No questions</div>;
 const pick=o=>setAns(a=>{const c=a[q.id]||[];return {...a,[q.id]:q.type==='multi'?(c.includes(o)?c.filter(x=>x!==o):[...c,o]):[o]}});
 return <div className="exam"><div className="card"><div className="bar"><b>{quiz.title}</b><span className="timer">⏱ {String(Math.floor(left/60)).padStart(2,'0')}:{String(left%60).padStart(2,'0')}</span></div>
  <h3>Q{i+1}. {q.text} <small>({q.marks} marks{q.type==='multi'?', select all':''})</small></h3>
  {q.options.map((o,n)=><label key={n} className={'opt'+((ans[q.id]||[]).includes(n)?' sel':'')}><input type={q.type==='multi'?'checkbox':'radio'} checked={(ans[q.id]||[]).includes(n)} onChange={()=>pick(n)}/> {o}</label>)}
  <button className="btn" disabled={!i} onClick={()=>setI(i-1)}>Previous</button> <button className="btn" disabled={i===quiz.questions.length-1} onClick={()=>setI(i+1)}>Next</button>
  <button className="btn" onClick={()=>setRev(r=>r.includes(q.id)?r.filter(x=>x!==q.id):[...r,q.id])}>{rev.includes(q.id)?'Unmark review':'Mark for review'}</button>
  <button className="btn danger" onClick={()=>window.confirm(`Submit? ${Object.keys(ans).length}/${quiz.questions.length} answered.`)&&submit()}>Submit</button></div>
  <div className="card nav">{quiz.questions.map((x,n)=><button key={x.id} onClick={()=>setI(n)} className={(ans[x.id]?.length?'ans ':'')+(rev.includes(x.id)?'rev ':'')+(n===i?'cur':'')}>{n+1}</button>)}<small>Green: answered · Orange: review</small></div></div>}
