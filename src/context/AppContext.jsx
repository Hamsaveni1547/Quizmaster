import {createContext,useContext,useEffect,useState} from 'react';import {seed} from '../data/seed';
const C=createContext();export const useApp=()=>useContext(C);
const get=(k,d)=>{try{return JSON.parse(localStorage.getItem(k))??d}catch{return d}};
const normalizeUser=user=>user?.role==='instructor'?{...user,role:'student'}:user;
const normalizeDb=db=>({...db,users:db.users.map(normalizeUser)});
export function AppProvider({children}){
 const [db,setDb]=useState(()=>normalizeDb(get('qm',seed)));const [user,setUser]=useState(()=>normalizeUser(get('qm_user',null)));const [toast,setToast]=useState('');
 useEffect(()=>localStorage.setItem('qm',JSON.stringify(db)),[db]);
 useEffect(()=>localStorage.setItem('qm_user',JSON.stringify(user)),[user]);
 const notify=m=>{setToast(m);setTimeout(()=>setToast(''),2500)};
 const login=(email,pw)=>{const u=db.users.find(u=>u.email===email&&u.password===pw);if(u)setUser(u);return !!u};
 const register=u=>{if(db.users.some(x=>x.email===u.email))return false;const n={...u,id:Date.now(),role:'student'};setDb(d=>({...d,users:[...d.users,n]}));setUser(n);return true};
 const upsertQuiz=q=>setDb(d=>({...d,quizzes:d.quizzes.some(x=>x.id===q.id)?d.quizzes.map(x=>x.id===q.id?q:x):[...d.quizzes,q]}));
 const delQuiz=id=>setDb(d=>({...d,quizzes:d.quizzes.filter(q=>q.id!==id)}));
 const delUser=id=>setDb(d=>({...d,users:d.users.filter(u=>u.id!==id)}));
 const addAttempt=a=>setDb(d=>({...d,attempts:[...d.attempts,a]}));
 return <C.Provider value={{db,user,login,register,logout:()=>setUser(null),upsertQuiz,delQuiz,delUser,addAttempt,notify}}>{children}{toast&&<div className="toast">{toast}</div>}</C.Provider>;
}
