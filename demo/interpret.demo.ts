import { evaluate } from "../src/utils/helpers";

const code = `
#1=100*[5/25]
#2=10/2+3
#3=10/[2+3]
#4=1+2+3+4+5
#5=[20-5]*2
#6=20-[5*2]
#7=2*3+5*2
#8=2*[3+5]*2
#9=[1+[2*[3]]]+[[6*2]+2]
#10=5+2*3+5*[2+2]*2+4`;

const { macros } = evaluate(code);

console.log(macros);

// Map(10) {
//   1 => 20,
//   2 => 8,
//   3 => 2,
//   4 => 15,
//   5 => 30,
//   6 => 10,
//   7 => 16,
//   8 => 32,
//   9 => 21,
//   10 => 55
// }
