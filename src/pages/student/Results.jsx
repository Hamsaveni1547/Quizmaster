import {useApp} from '../../context/AppContext';
export default function Results(){const {db,user}=useApp();const m=db.attempts.filter(a=>a.userId===user.id);
 return <div className="card"><h3>Examination history</h3><table><thead><tr><th>Quiz</th><th>Date</th><th>Marks</th><th>%</th><th>Status</th></tr></thead><tbody>
 {m.map(a=><tr key={a.id}><td>{db.quizzes.find(q=>q.id===a.quizId)?.title}</td><td>{a.date}</td><td>{a.got}/{a.total}</td><td>{a.pct}%</td><td>{a.pass?'Pass':'Fail'}</td></tr>)}</tbody></table>{!m.length&&<p>No attempts yet.</p>}</div>}
