import {score} from './scoring.js';import assert from 'assert';
const q={passPct:50,questions:[{id:1,marks:2,answer:[0]},{id:2,marks:2,answer:[0,1]}]};
assert.equal(score(q,{1:[0],2:[0,1]}).pct,100);
assert.equal(score(q,{1:[0],2:[0]}).pct,50);
assert.equal(score(q,{}).pass,false);
console.log('scoring tests passed');
