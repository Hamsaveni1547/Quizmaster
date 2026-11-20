import {Routes,Route,Navigate,NavLink,useNavigate} from 'react-router-dom';import {LayoutDashboard,BookOpen,Users,History,LogOut} from 'lucide-react';
import {useApp} from './context/AppContext';import Login from './pages/auth/Login';import Dashboard from './pages/Dashboard';
import Quizzes from './pages/Quizzes';import Exam from './pages/student/Exam';import Results from './pages/student/Results';import UsersPage from './pages/admin/UsersPage';
const Guard=({roles,children})=>{const {user}=useApp();return !user?<Navigate to="/login"/>:roles&&!roles.includes(user.role)?<Navigate to="/"/>:children};
function Shell({children}){const {user,logout}=useApp();const nav=useNavigate();
 return <div className="shell"><aside><h2>QuizMaster</h2>
  <NavLink to="/"><LayoutDashboard size={16}/> Dashboard</NavLink><NavLink to="/quizzes"><BookOpen size={16}/> {user.role==='student'?'Exams':'Quizzes'}</NavLink>
  {user.role==='admin'&&<NavLink to="/users"><Users size={16}/> Users</NavLink>}
  {user.role==='student'&&<NavLink to="/results"><History size={16}/> My Results</NavLink>}
  <button onClick={()=>{logout();nav('/login')}}><LogOut size={16}/> Logout</button></aside>
  <main><header>Welcome, {user.name} <span className="badge">{user.role}</span></header>{children}</main></div>}
const P=(c,roles)=><Guard roles={roles}><Shell>{c}</Shell></Guard>;
export default function App(){return <Routes><Route path="/login" element={<Login/>}/>
 <Route path="/" element={P(<Dashboard/>)}/><Route path="/quizzes" element={P(<Quizzes/>)}/>
 <Route path="/users" element={P(<UsersPage/>,['admin'])}/><Route path="/results" element={P(<Results/>,['student'])}/>
 <Route path="/exam/:id" element={<Guard roles={['student']}><Exam/></Guard>}/><Route path="*" element={<Navigate to="/"/>}/></Routes>}
