import DFA from"./DFA.mjs";
import * as fs from "fs";

let dfa = new DFA("ананас");
console.log(dfa.findMatches("а на нас ему наплевать. Хочу ананас"));

//let dfa = new DFA("князь Андрей");
//let str = fs.readFileSync("war and peace(1 tome).txt").toString();
//console.log(dfa.findMatches(str).length);
