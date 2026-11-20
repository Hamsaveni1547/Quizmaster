import {useState} from 'react';import {useApp} from '../../context/AppContext';
export default function UsersPage(){const {db,delUser,notify}=useApp();const [q,setQ]=useState('');
 return <div className="card"><h3>Users</h3><input placeholder="Search…" value={q} onChange={e=>setQ(e.target.value)}/><table><thead><tr><th>Name</th><th>Email</th><th>Role</th><th/></tr></thead><tbody>
 {db.users.filter(u=>(u.name+u.email).toLowerCase().includes(q.toLowerCase())).map(u=><tr key={u.id}><td>{u.name}</td><td>{u.email}</td><td>{u.role}</td><td>{u.role!=='admin'&&<button className="btn danger" onClick={()=>window.confirm('Delete user?')&&(delUser(u.id),notify('User deleted'))}>Delete</button>}</td></tr>)}</tbody></table></div>}
