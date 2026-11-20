import {BarChart,Bar,XAxis,YAxis,Tooltip,ResponsiveContainer} from 'recharts';import {useApp} from '../context/AppContext';
export default function Dashboard(){const {db,user}=useApp();const {users,quizzes,attempts}=db;
 const mine=user.role==='student'?attempts.filter(a=>a.userId===user.id):attempts;
 const stats=user.role==='student'?[['Attempts',mine.length],['Highest',Math.max(0,...mine.map(a=>a.pct))+'%'],['Average',(mine.length?Math.round(mine.reduce((s,a)=>s+a.pct,0)/mine.length):0)+'%'],['Available',quizzes.filter(q=>q.published).length]]
  :[['Users',users.length],['Students',users.filter(u=>u.role==='student').length],['Quizzes',quizzes.length],['Completed',attempts.length]];
 const data=quizzes.map(q=>{const a=attempts.filter(x=>x.quizId===q.id);return {name:q.title,avg:a.length?Math.round(a.reduce((s,x)=>s+x.pct,0)/a.length):0}});
 return <><div className="grid">{stats.map(([k,v])=><div className="card stat" key={k}><small>{k}</small><h1>{v}</h1></div>)}</div>
  <div className="card"><h3>Quiz-wise average score (%)</h3><ResponsiveContainer height={240}><BarChart data={data}><XAxis dataKey="name"/><YAxis/><Tooltip/><Bar dataKey="avg" fill="#4f46e5"/></BarChart></ResponsiveContainer></div>
  <div className="card"><h3>Recent activity</h3><table><tbody>{[...attempts].reverse().slice(0,5).map(a=><tr key={a.id}><td>{users.find(u=>u.id===a.userId)?.name}</td><td>{quizzes.find(q=>q.id===a.quizId)?.title}</td><td>{a.pct}%</td><td>{a.pass?'Pass':'Fail'}</td></tr>)}</tbody></table></div></>}
