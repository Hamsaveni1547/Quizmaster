export function score(quiz,answers){
  let got=0,total=0;
  quiz.questions.forEach(q=>{total+=q.marks;const a=[...(answers[q.id]||[])].sort().join(),c=[...q.answer].sort().join();if(a&&a===c)got+=q.marks;});
  const pct=total?Math.round(got/total*100):0;
  return {got,total,pct,pass:pct>=quiz.passPct};
}
