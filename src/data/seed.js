const mc=(id,text,options,a,exp)=>({id,type:'mcq',text,options,answer:[a],marks:2,explanation:exp,difficulty:'Easy'});
const tf=(id,text,a,exp)=>({id,type:'tf',text,options:['True','False'],answer:[a?0:1],marks:1,explanation:exp,difficulty:'Easy'});
export const seed={
 users:[
  {id:1,name:'Admin',email:'admin@quiz.com',password:'admin123',role:'admin'},
  ...['Asha','Ben','Chen','Dia','Eli'].map((n,i)=>({id:10+i,name:n,email:n.toLowerCase()+'@quiz.com',password:'stud123',role:'student'}))],
 quizzes:[
  {id:1,title:'React Basics',subject:'Web',category:'Frontend',duration:10,passPct:50,published:true,owner:2,start:'2024-01-01',end:'2030-12-31',questions:[
   mc(1,'Which hook manages state?',['useState','useRoute','useCss','useDom'],0,'useState holds component state.'),
   mc(2,'JSX stands for?',['JavaScript XML','Java Syntax','JSON X','None'],0,'JavaScript XML.'),
   {id:3,type:'multi',text:'Select valid hooks',options:['useEffect','useMemo','useClass','useRef'],answer:[0,1,3],marks:3,explanation:'useClass does not exist.',difficulty:'Medium'},
   tf(4,'React is a library.',true,'It is a UI library.')]},
  {id:2,title:'JavaScript Core',subject:'Web',category:'Language',duration:8,passPct:40,published:true,owner:2,start:'2024-01-01',end:'2030-12-31',questions:[
   mc(1,'typeof null returns?',['object','null','undefined','number'],0,'A historical quirk.'),
   tf(2,'let is block scoped.',true,'Yes.'),
   mc(3,'Which is not a primitive?',['string','object','number','boolean'],1,'Objects are reference types.')]},
  {id:3,title:'Docker Intro',subject:'DevOps',category:'Containers',duration:5,passPct:50,published:true,owner:3,start:'2024-01-01',end:'2030-12-31',questions:[
   mc(1,'Docker file for images?',['Dockerfile','compose.js','image.txt','run.sh'],0,'Dockerfile defines builds.'),
   tf(2,'Containers share the host kernel.',true,'Correct.')]}],
 attempts:[
  {id:1,quizId:1,userId:10,got:6,total:8,pct:75,pass:true,date:'2024-05-01'},
  {id:2,quizId:2,userId:11,got:2,total:5,pct:40,pass:true,date:'2024-05-02'},
  {id:3,quizId:3,userId:12,got:1,total:3,pct:33,pass:false,date:'2024-05-03'}]
};
