import {useState} from 'react';
import {Link} from 'react-router-dom';
import {useApp} from '../context/AppContext';

const blank={title:'',subject:'',category:'',duration:10,passPct:50,published:false,questions:[]};
const blankQ={text:'',type:'mcq',options:'',answer:'',marks:1,explanation:'',difficulty:'Easy'};

export default function Quizzes(){
 const {db,user,upsertQuiz,delQuiz,notify}=useApp();
 const [f,setF]=useState(null);
 const [qf,setQf]=useState(blankQ);
 const [editingQuestionId,setEditingQuestionId]=useState(null);
 const [s,setS]=useState('');
 const list=db.quizzes.filter(q=>(user.role==='admin'||user.role==='student'||q.owner===user.id)&&(user.role!=='student'||q.published)&&q.title.toLowerCase().includes(s.toLowerCase()));
 const save=()=>{if(!f.title||!f.subject)return notify('Title and subject required');upsertQuiz({...f,id:f.id||Date.now(),owner:f.owner||user.id,duration:+f.duration,passPct:+f.passPct});setF(null);notify('Quiz saved')};
 const resetQuestion=()=>{setQf(blankQ);setEditingQuestionId(null)};
 const editQuestion=q=>{
  setQf({...q,options:q.type==='tf'?'':q.options.join(', '),answer:q.answer.map(a=>q.options[a]).join(', ')});
  setEditingQuestionId(q.id);
 };
 const saveQuestion=()=>{
  const options=qf.type==='tf'?['True','False']:qf.options.split(',').map(x=>x.trim()).filter(Boolean);
  const answerTexts=qf.answer.split(',').map(x=>x.trim()).filter(Boolean);
  const answer=answerTexts.map(text=>options.findIndex(option=>option.toLowerCase()===text.toLowerCase()));
  if(!qf.text||options.length<2||!answerTexts.length||answer.some(index=>index<0)||new Set(answer).size!==answer.length){
   return notify('Enter question text, at least 2 options, and correct option text matching the options');
  }
  const question={...qf,id:editingQuestionId||Date.now(),options,answer,marks:+qf.marks};
  setF({...f,questions:editingQuestionId?f.questions.map(q=>q.id===editingQuestionId?question:q):[...f.questions,question]});
  resetQuestion();
 };

 if(f)return <div className="card"><h3>{f.id?'Edit':'New'} quiz</h3>
  {[['title','Title'],['subject','Subject'],['category','Category'],['duration','Duration (min)'],['passPct','Passing %']].map(([k,l])=><label key={k}>{l}<input value={f[k]} onChange={e=>setF({...f,[k]:e.target.value})}/></label>)}
  <label><input type="checkbox" checked={f.published} onChange={e=>setF({...f,published:e.target.checked})}/> Published</label>
  <h4>Questions ({f.questions.length})</h4>
  {f.questions.map((q,i)=><div className="card" key={q.id}>
   <b>{i+1}. {q.text}</b>
   <p><small>Correct option{q.answer.length>1?'s':''}: {q.answer.map(a=>q.options[a]).join(', ')} · Marks: {q.marks}</small></p>
   <button className="btn" onClick={()=>editQuestion(q)}>Edit question</button>{' '}
   <button className="btn danger" onClick={()=>{setF({...f,questions:f.questions.filter(x=>x.id!==q.id)});if(editingQuestionId===q.id)resetQuestion()}}>Remove</button>
  </div>)}
  <div className="card">
   <label>Question text<input placeholder="Enter question text" value={qf.text} onChange={e=>setQf({...qf,text:e.target.value})}/></label>
   <label>Question type<select value={qf.type} onChange={e=>setQf({...qf,type:e.target.value})}><option value="mcq">Multiple choice</option><option value="multi">Multiple select</option><option value="tf">True/False</option></select></label>
   {qf.type!=='tf'&&<label>Options (comma separated)<input placeholder="e.g. Option A, Option B, Option C" value={qf.options} onChange={e=>setQf({...qf,options:e.target.value})}/></label>}
   <label>Correct option text{qf.type==='multi'?' (comma separated)':''}<input placeholder={qf.type==='tf'?'Enter True or False':'Enter the correct option text'} value={qf.answer} onChange={e=>setQf({...qf,answer:e.target.value})}/></label>
   <label>Marks<input type="number" placeholder="Marks" value={qf.marks} onChange={e=>setQf({...qf,marks:e.target.value})}/></label>
   <label>Explanation<input placeholder="Explanation" value={qf.explanation} onChange={e=>setQf({...qf,explanation:e.target.value})}/></label>
   <button className="btn" onClick={saveQuestion}>{editingQuestionId?'Save question':'Add question'}</button>
   {editingQuestionId&&<> <button className="btn" onClick={resetQuestion}>Cancel edit</button></>}
  </div>
  <button className="btn" onClick={save}>Save quiz</button> <button className="btn danger" onClick={()=>setF(null)}>Cancel</button></div>;
 return <div className="card"><h3>{user.role==='student'?'Available examinations':'Quizzes'}</h3><input placeholder="Search…" value={s} onChange={e=>setS(e.target.value)}/>
  {user.role!=='student'&&<button className="btn" onClick={()=>{setF({...blank,questions:[]});resetQuestion()}}>+ New quiz</button>}
  <table><thead><tr><th>Title</th><th>Subject</th><th>Mins</th><th>Qs</th><th>Status</th><th/></tr></thead><tbody>{list.map(q=><tr key={q.id}><td>{q.title}</td><td>{q.subject}</td><td>{q.duration}</td><td>{q.questions.length}</td><td>{q.published?'Published':'Draft'}</td><td>
   {user.role==='student'?<Link className="btn" to={'/exam/'+q.id}>Start</Link>:<><button className="btn" onClick={()=>setF(q)}>Edit</button> <button className="btn" onClick={()=>{upsertQuiz({...q,published:!q.published});notify('Updated')}}>{q.published?'Unpublish':'Publish'}</button> <button className="btn danger" onClick={()=>window.confirm('Delete quiz?')&&(delQuiz(q.id),notify('Deleted'))}>Delete</button></>}</td></tr>)}</tbody></table></div>}
