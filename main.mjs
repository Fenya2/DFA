import DFA from"./DFA.mjs";
import * as fs from "fs";

let dfa = new DFA("ананас");
console.log(dfa.findMatches("а на нас ему наплевать. Хочу ананас"));
