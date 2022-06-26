const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoreText = document.getElementById("score");
const progressBarFull = document.getElementById("progressBarFull");
let currentQuestion = {};
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuesions = [];

var counterContainer = document.querySelector(".website-counter");
var resetButton = document.querySelector("#reset");
var visitCount = localStorage.getItem("page_view");

// Check if page_view entry is present
if (visitCount) {
  visitCount = Number(visitCount) + 1;
  localStorage.setItem("page_view", visitCount);
} else {
  visitCount = 1;
  localStorage.setItem("page_view", 1);
}
counterContainer.innerHTML = visitCount;

console.log("vistor count" + visitCount);



function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

function getRandomNewInt(max,arr){
  let result = Math.floor(Math.random() * max);
  let i = 0;
  while(i < arr.length){
    if(result == arr[i]){
      result = Math.floor(Math.random() * max);
      i = 0;
      continue;
    }
    i = i + 1;
  }
  return result;
}

function decimalToBase(decimal,base){
  if(base == 16){
    return decimal.toString(16);
  }
  let sum = 0;
  let i = 0
  while(decimal / base > 0){
    let add = decimal % base;
    sum += add * Math.pow(10,i);
    decimal = parseInt(decimal / base);
    console.log(decimal);
    i++;
  }
  return sum;
}

function baseToString(base){
  if(base == 2){
    return "binary";
  }

  if(base == 8){
    return "octal";
  }

  if(base == 16){
    return "hexadecimal";
  }
}

function generateBaseOperationQuestion(base, operation){
 //operation = 0 or 1 (add or substract)
  let adder1Decimal = getRandomInt(100);
  let adder2Decimal = getRandomInt(adder1Decimal);

  let operationSymbol;
  let answerDecimal;
  if(operation == 0){
    answerDecimal = adder1Decimal + adder2Decimal;
    operationSymbol = "+";
  }

  if(operation == 1){
   answerDecimal = adder1Decimal - adder2Decimal;
    operationSymbol = "-";
  }

  let adder1Base = decimalToBase(adder1Decimal, base);

  let adder2Base = decimalToBase(adder2Decimal, base);

  let answer = decimalToBase(answerDecimal, base);

  let answerValue = getRandomInt(4) + 1;

  let choice1, choice2, choice3, choice4;
  if(answerValue ==  1){
    choice1 = answer.toString();
  }
  else{
    choice1 = decimalToBase(getRandomInt(200),base).toString();
  }
  if(answerValue ==  2){
    choice2 = answer.toString();
  }
  else{
    choice2 = decimalToBase(getRandomInt(200),base).toString();
  }
  if(answerValue == 3){
    choice3 = answer.toString();
  }
  else{
    choice3 = decimalToBase(getRandomInt(200),base).toString();
  }
  if(answerValue ==  4){
    choice4 = answer.toString();
  }
  else{
    choice4 = decimalToBase(getRandomInt(200),base).toString();
  }

  let question = "Let A, B and C be " + baseToString(base) + " representations. If A = " + adder1Base + " and B = "
  + adder2Base + ". Then what is the value of C if A " + operationSymbol + " B = C?";

  question = question.toString();

  return[question,choice1,choice2, choice3,choice4, answerValue];
}

function generateBaseToDecimalQuestion(base){
  let answerValue = getRandomInt(4) + 1;
  let answer = getRandomInt(100);
  let choice1, choice2, choice3, choice4 = 0;
  if(answerValue == 1){
    choice1 = answer.toString(); 
  }
  else{
    choice1 = getRandomInt(answer).toString();
  }
  if(answerValue == 2){
    choice2 = answer.toString(); 
  }
  else{
    choice2 = 100 - getRandomInt(100-answer);
    choice2 = choice2.toString();
  }
  if(answerValue == 3){
    choice3 = answer.toString(); 
  }
  else{
    choice3 = getRandomInt(answer);
    choice3 = choice3.toString()
  }
  if(answerValue == 4){
    choice4 = answer.toString(); 
  }
  else{
    choice4  = 100 - getRandomInt(100 -answer);
    choice4 = choice4.toString();
  }
 let question = "What is the decimal value of the "+ baseToString(base) + " number " + decimalToBase(answer,base) + "?";
  question = question.toString();
  answerValue = answerValue.toString();
  
  return[question,choice1,choice2, choice3,choice4, answerValue];
}

function generateDecimalToBaseQuestion(base){
  let answerValue = getRandomInt(4) + 1;

  let decimalAnswer = getRandomInt(100);
  let answer = decimalToBase(decimalAnswer,base);

  let choice1, choice2, choice3, choice4 = 0;
  if(answerValue == 1){
    choice1 = answer.toString(); 
  }
  else{
    choice1Decimal = getRandomInt(decimalAnswer).toString();
    choice1 = decimalToBase(choice1Decimal,base).toString();
  }
  if(answerValue == 2){
    choice2 = answer.toString(); 
  }
  else{
    choice2Decimal = 100 - getRandomInt(100-decimalAnswer);
    choice2 = decimalToBase(choice2Decimal,base);
    choice2 = choice2.toString();
  }
  if(answerValue == 3){
    choice3 = answer.toString(); 
  }
  else{
    choice3Decimal = getRandomInt(decimalAnswer);
    choice3 = decimalToBase(choice3Decimal,base).toString();
  }
  if(answerValue == 4){
    choice4 = answer.toString(); 
  }
  else{
    choice4Decimal  = 100 - getRandomInt(100 - decimalAnswer);
    console.log("choice4Decimal" + choice4Decimal);
    choice4 = decimalToBase(choice4Decimal,base);
    choice4 = choice4.toString();
  }

 let question = "What is the " + baseToString(base) + " value of the decimal number " + decimalAnswer + "?";
  question = question.toString();
  answerValue = answerValue.toString();
  
  return[question,choice1,choice2, choice3,choice4, answerValue];
}

function padAndChop(str, padChar, length) {
  return (Array(length).fill(padChar).join('') + str).slice(length * -1);
}

function twosComplement(value, bitCount) {
  let binaryStr;
  
  if (value >= 0) {
    let twosComp = value.toString(2);
    binaryStr    = padAndChop(twosComp, '0', (bitCount || twosComp.length));
  } else {
    binaryStr = (Math.pow(2, bitCount) + value).toString(2);
    
    if (Number(binaryStr) < 0) {
      return undefined
    }
  }
  
  return `${binaryStr}`;
}

function generateTwosComplementQuestion(){
  let questionValue = getRandomInt(100)+ 1;
  questionValue = -Math.abs(questionValue);
  let answer = twosComplement(questionValue,8);
  let answerValue = getRandomInt(4) + 1;

  let choice1, choice2, choice3, choice4 = 0;

  if(answerValue == 1){
    choice1 = answer.toString(); 
  }
  else{
    let choice = -Math.abs(getRandomInt(answerValue));
    choice1 = twosComplement(choice,8).toString();
  }
  if(answerValue == 2){
    choice2 = answer.toString(); 
  }
  else{
    let choice = -Math.abs(getRandomInt(100-questionValue));
    choice2 = twosComplement(choice,8).toString();
  }
  if(answerValue == 3){
    choice3 = answer.toString(); 
  }
  else{
    let choice = -Math.abs(getRandomInt(answerValue));
    choice3 = twosComplement(choice,8).toString();
  }
  if(answerValue == 4){
    choice4 = answer.toString(); 
  }
  else{
    let choice = -Math.abs(getRandomInt(100-questionValue));
    choice4 = twosComplement(choice,8).toString();
  }
  
  let question = "What is the two's complement binary representation of " + questionValue +" ?"
  question.toString();

  console.log([question, choice1,choice2, choice3, choice4, answerValue]);
  return[question, choice1,choice2, choice3, choice4, answerValue];
}

// function generateSet(arr){
//   let set = "{";
//   for(let i = 0; i < arr.length;i++){
//     set = set + arr[i];
//     if(i != arr.length - 1){
//       set = set + ","
//     }
//   }
//   set = set + "}";
//   return set;
// }

// function generateSetOperationQuestion(questionType){

//   let setAArr = [];
//   let setBArr = [];
//   let usedNums =[];
//   let nonAnswerNums = [];
  
//   let iterations = 0;

//   let duplicateNum1 = getRandomInt(40, usedNums);
//   usedNums.push(duplicateNum1);
//   let duplicateNum2 = getRandomInt(40, usedNums);
//   usedNums.push(duplicateNum2);

//   while(iterations < 4){
//     let newNum = getRandomNewInt(10 + iterations*10, usedNums);
//     usedNums.push(newNum);
//     nonAnswerNums.push(newNum);
//     setAArr.push(newNum);
//     iterations += 1;
//   }

//   iterations = 0;

//   while(iterations < 4){
//     let newNum = getRandomNewInt(10 + iterations*10, usedNums);
//     usedNums.push(newNum);
//     nonAnswerNums.push(newNum);
//     setBArr.push(newNum);
//     iterations +=1;
//   }

//   iterations = 0;


//   let rando = 1;

//   if(rando == 0){
//     let rando2 = getRandomInt(4);
//     let rando3 = getRandomInt(4);
//     setAArr[rando2] = duplicateNum1;
//     setBArr[rando3] = duplicateNum1;
//   }

//   if(rando == 1){
//    let  usedPlace = [];
//     let usedPlace2 = [];
//     let rando2 = getRandomInt(4);
//     usedPlace.push(rando2);
//     let rando3 = getRandomInt(4);
//     usedPlace2.push(rando3);
//     let rando21 = getRandomNewInt(4,usedPlace);
//     let rando32 = getRandomNewInt(4,usedPlace2);
//     setAArr[rando2] = duplicateNum1;
//     setBArr[rando3] = duplicateNum1;
//     setAArr[rando21] = duplicateNum2;
//     setBArr[rando32] = duplicateNum2;

//   }
  
//   let setA = generateSet(setAArr);
//   let setB = generateSet(setBArr);
  
//   let choice = [0,0,0,0];
//   let answerValue = getRandomInt(4);
//   let question = "";
//   if(questionType == 0){

//     iterations = 0;
//     while(iterations < 4){
      
//       if (iterations == answerValue && rando == 0){
//         let set = [duplicateNum1];
//         choice[iterations] = generateSet(set);
//         iterations += 1;
//         continue;
//       }
//       if (iterations == answerValue && rando == 1){
//         let set = [duplicateNum1,duplicateNum2];
//         iterations += 1;
//         choice[iterations] = generateSet(set);
//         continue;
//       }
    

//     choice[iterations] = generateSet([nonAnswerNums[getRandomInt(6)], usedNums[7]]);
//     iterations += 1;
//     }

//     question = "If A = " + setA +", and B is " + setB +". What is the value of A intersect" + "B?";
//   }
//   if(questionType == 1){
    
//     iterations = 0;
//     while(iterations < 4){
   
//       if (iterations == answerValue && rando == 0){
//         choice[iterations] = generateSet([usedNums]);
//         iterations += 1;
//         continue;
//       }
//       if (iterations == answerValue && rando == 1){
//         choice[iterations] = generateSet([usedNums]);
//         iterations += 1;
//         continue;
//       }
    
//     let usedNumsClone = usedNums;
//     usedNumsClone[getRandomInt(7)] = getRandomInt(30);
  
//     choice[iterations] = generateSet([usedNumsClone]);
//     iterations += 1;
//     }

//      question = "If A = " + setA +", and B is " + setB +". What is the value of A union " + "B?";

//   }
//   question.toString();
//   choice[0].toString();
//   choice[1].toString();
//   choice[2].toString();
//   choice[3].toString();
//   answerValue+=1;
//   answerValue.toString();
 
//   console.log(question, choice[0],choice[1], choice[2], choice[3], answerValue);

//   return[question, choice[0],choice[1], choice[2], choice[3], answerValue];
// }

  
function generateQuestions(){

  let q = [
    generateBaseOperationQuestion(2,0),
    generateBaseOperationQuestion(2,1),
    generateBaseOperationQuestion(8,getRandomInt(2)),
    generateBaseToDecimalQuestion(16),
    generateBaseToDecimalQuestion(8),
    generateBaseToDecimalQuestion(2),
    generateDecimalToBaseQuestion(2),
    generateDecimalToBaseQuestion(8),
    generateDecimalToBaseQuestion(16),
    generateTwosComplementQuestion()
  ];
  
  // let q1 = generateBaseToDecimalQuestion(16);
  // let q2 = generateBaseToDecimalQuestion(16);
  // let q3 = generateBaseToDecimalQuestion(16);
let questions = []
  for(let i = 0; i < 10; i++){
    questions[i]
   = {
    question: q[i][0],
    choice1: q[i][1],
    choice2: q[i][2],
    choice3: q[i][3],
    choice4: q[i][4],
    answer: q[i][5]
   }
  }
// let questions = [
    
 
//   {
//     question: q1[0],
//     choice1: q1[1],
//     choice2: q1[2],
//     choice3: q1[3],
//     choice4: q1[4],
//     answer: q1[5]
//   },
//   {
//     question: q2[0],
//     choice1: q2[1],
//     choice2: q2[2],
//     choice3: q2[3],
//     choice4: q2[4],
//     answer: q2[5]
//   },

//   {
//     question: q3[0],
//     choice1: q3[1],
//     choice2: q3[2],
//     choice3: q3[3],
//     choice4: q3[4],
//     answer: q3[5]
//   }
// ];
return questions;
}

let questions = generateQuestions();

//CONSTANTS
const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 10;

startGame = () => {
  questionCounter = 0;
  score = 0;
  availableQuesions = [...questions];
  getNewQuestion();
};

getNewQuestion = () => {
  if (availableQuesions.length === 0 || questionCounter >= MAX_QUESTIONS) {
    localStorage.setItem("mostRecentScore", score);
    //go to the end page
    return window.location.assign("/end.html");
  }
  questionCounter++;
  progressText.innerText = `Question ${questionCounter}/${MAX_QUESTIONS}`;
  //Update the progress bar
  progressBarFull.style.width = `${(questionCounter / MAX_QUESTIONS) * 100}%`;

  const questionIndex = Math.floor(Math.random() * availableQuesions.length);
  currentQuestion = availableQuesions[questionIndex];
  question.innerText = currentQuestion.question;

  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerText = currentQuestion["choice" + number];
  });

  availableQuesions.splice(questionIndex, 1);
  acceptingAnswers = true;
};

choices.forEach(choice => {
  choice.addEventListener("click", e => {
    if (!acceptingAnswers) return;

    acceptingAnswers = false;
    const selectedChoice = e.target;
    const selectedAnswer = selectedChoice.dataset["number"];

    const classToApply =
      selectedAnswer == currentQuestion.answer ? "correct" : "incorrect";

    if (classToApply === "correct") {
      incrementScore(CORRECT_BONUS);
    }

    selectedChoice.parentElement.classList.add(classToApply);

    setTimeout(() => {
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }, 1000);
  });
});

incrementScore = num => {
  score += num;
  scoreText.innerText = score;
};

startGame();

