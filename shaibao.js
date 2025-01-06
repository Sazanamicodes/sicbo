//variables=======================================================

//the three dices
let dices = []; //type: array[string]

//big or small
let bos = ''; //type: string

//count number of each dices, also used for single
let count = [0, 0, 0, 0, 0, 0]; //type: array[number], length = 6

//double and triple
let doubles = ''; // type: string
let triples = ''; //type: string

//the combiations
let combi = []; //type: array[string]

//the sum of the three dices
let sum = 0; //type: number

//------------------------------------------------------------------------

//the bet correspond to the choices
let bet = 0; //used in recordChoice

//store player choices
let playerChoice = { //object
  BoS: [],           //array[string]
  Single: [],
  Double: [],
  Triple: [],
  Combi: [],
  Sum: []
};

//store player bet
let playerBet = { //object
  BoS: [],        //array[string]
  Single: [],
  Double: [],
  Triple: [],
  Combi: [],
  Sum: []
};


let bankroll = 10000; // the sum of player bet
let payout = 0; // the sum of all reward
let totalBet = 0;


//========================================================================

//functions to generate dices and store values

//generate 1 dice
function dice() {
  return(Math.floor(Math.random() * 6 + 1));
}


//generate 3 dices and store their value
function diceResult() {
  for(let i = 0; i <3; i++) {
    dices[i]=dice();
  }

  document.querySelector('.dice1').innerHTML = displayDice(dices[0]);
  document.querySelector('.dice2').innerHTML = displayDice(dices[1]);
  document.querySelector('.dice3').innerHTML = displayDice(dices[2]);

  dices.sort((a, b) => a - b);
}

function displayDice(dice) {
  if (dice === 1) {
    return `<img src="dice_Images/dice-six-faces-one.svg" alt="Button Image">`;
  }
  if (dice === 2) {
    return `<img src="dice_Images/dice-six-faces-two.svg" alt="Button Image">`;
  }
  if (dice === 3) {
    return `<img src="dice_Images/dice-six-faces-three.svg" alt="Button Image">`;
  }
  if (dice === 4) {
    return `<img src="dice_Images/dice-six-faces-four.svg" alt="Button Image">`;
  }
  if (dice === 5) {
    return `<img src="dice_Images/dice-six-faces-five.svg" alt="Button Image">`;
  }
  if (dice === 6) {
    return `<img src="dice_Images/dice-six-faces-six.svg" alt="Button Image">`;
  }
}

//calculate the sum and determine big or small
function bigORsmall(sum){
  if(sum > 10 && sum < 18){
    bos = 'Big';
  } else if (sum > 3 && sum < 11){
    bos = 'Small';
  }
}


//function to calculate how many dices for each value
function diceCount(dices) {
  for(let i = 0; i < 3; i++) {
    if (dices[i] === 1) {
      count[0] ++;
    }
    if (dices[i] === 2) {
      count[1] ++;
    }
    if (dices[i] === 3) {
      count[2] ++;
    }
    if (dices[i] === 4) {
      count[3] ++;
    }
    if (dices[i] === 5) {
      count[4] ++;
    }
    if (dices[i] === 6) {
      count[5] ++;
    }
  }
}

//calculate doubles and triples and store the value to double and triple
function countDT(){
  for (let i = 0; i < 6; i++) {
    if (count[i] == 2) {
      doubles = String(i + 1) + String(i + 1);
    } 
    if (count[i] == 3) {
      triples = String(i + 1) + String(i + 1) + String(i + 1);
    }
  }
  console.log(`doubles: ${doubles}, triples: ${triples}`);
}


//generate combination-------------------------------------
//combi = result;
function generateCombi() {
  if (dices[0] !== dices[1]) {
    combi.push(String(dices[0]) + String(dices[1]));
  }
  if (dices[0] !== dices[2] && dices[1] !== dices[2]) {
    combi.push(String(dices[0]) + String(dices[2]));
  }
  if (dices[1] !== dices[2] && dices[0] !== dices[1]) {
    combi.push(String(dices[1]) + String(dices[2]));
  }
}


//roll the dices, generate the result, using all the functions above
function generateResult(){
  dices = [];
  bos = ''; 
  count = [0, 0, 0, 0, 0, 0];
  doubles = ''; 
  triples = ''; 
  combi = [];
  sum = 0; 

  diceResult();

  dices.forEach(function getSum(i){
    sum += i;
  });

  bigORsmall(sum);
  diceCount(dices);
  countDT();
  generateCombi();

  console.log(`dices: ${dices}, ${bos}, single: ${count}, double: ${doubles}, triples: ${triples}, combi: ${combi}, sum: ${sum}`)
}


//=======================================================================
//add event listener to record players choices

//chatgpt advice:
// Store all event listeners to allow removal later
const eventListeners = [];

// Refactor `recordChoice` to support removable listeners
function recordChoice(jsClass, rChoice, rBet) {
  const selectObject = document.querySelector(jsClass);

  // Define a named function to handle the click event
  const choiceHandler = (event) => {
    if (bet === 0 || bet === '') {
      alert('Please place bet first!!!');
    } else {
      rBet.push(bet);
      totalBet += Number(bet);
      rChoice.push(event.target.innerHTML);
      console.log(`total bet: ${totalBet}, bet ${rBet} on ${jsClass}: ${event.target.id} ${rChoice}`);
      document.querySelector('.js-player-choice').innerHTML += `bet ${rBet} on ${jsClass}: ${event.target.id} ${rChoice}; `;
    }
  };

  // Add the event listener
  selectObject.addEventListener('click', choiceHandler);

  // Store the listener reference and the element for removal
  eventListeners.push({ element: selectObject, handler: choiceHandler, jsClass });
}

// Example: Call `recordChoice` for all relevant elements
recordChoice('.js-single', playerChoice.Single, playerBet.Single);
recordChoice('.js-double', playerChoice.Double, playerBet.Double);
recordChoice('.js-triple', playerChoice.Triple, playerBet.Triple);
recordChoice('.js-bos', playerChoice.BoS, playerBet.BoS);
recordChoice('.js-sum', playerChoice.Sum, playerBet.Sum);
recordChoice('.js-combi', playerChoice.Combi, playerBet.Combi);

// Remove all event listeners when needed
function removeEventListeners() {
  eventListeners.forEach(({ element, handler }) => {
    element.removeEventListener('click', handler);
    console.log(`Removed listener from ${element.className}`);
  });

  // Clear the stored listeners
  eventListeners.length = 0;
}
/* //dice
function recordChoice (jsClass, rChoice, rBet) {
  const selectObject = document.querySelector(jsClass);
  selectObject.addEventListener('click', () => {
    if (bet === 0 || bet === '') {
      alert('Please place bet first!!!');
    } else {
      rBet.push(bet);
      totalBet += Number(bet);
      rChoice.push(event.target.innerHTML);
      console.log(`total bet: ${totalBet}, bet ${rBet} on ${jsClass}: ${event.target.id} ${rChoice}`);
    }
  });
} 


//record single, double, triple, bos, sum, combi choices
  recordChoice('.js-single', playerChoice.Single, playerBet.Single);
  recordChoice('.js-double', playerChoice.Double, playerBet.Double);
  recordChoice('.js-triple', playerChoice.Triple, playerBet.Triple);
  recordChoice('.js-bos', playerChoice.BoS, playerBet.BoS);
  recordChoice('.js-sum', playerChoice.Sum, playerBet.Sum);
  recordChoice('.js-combi', playerChoice.Combi, playerBet.Combi);
*/

//bet
const selectBet = document.querySelector('.js-bet');
selectBet.addEventListener('click', (event) =>{
  bet = event.target.innerHTML;
  document.querySelector('.placeBet').innerHTML = `Place Bet: ${bet}`;
}); 

//====================================================================


//display choices
function displayChoice() {
  document.querySelector('.playerChoice').innerHTML = "You choose: " + playerChoice.BoS + ", " + playerChoice.Single + ", " + playerChoice.Double + ", " + playerChoice.Triple + ", " + playerChoice.Combi + ", " + playerChoice.Sum;

  document.querySelector('.bankroll').innerHTML = `Bankroll: ${bankroll}`;
  document.querySelector('.placeBet').innerHTML = `Place Bet: ${bet}`
}


//========================================================================

//Reward:

//update payout 
function checkResult (pChoice, pBet, result, odds) {
  if (pChoice.length !== 0) {
    for (let i = 0; i < pChoice.length; i ++){
      if (pChoice[i] === String(result)) {
        payout += ((odds + 1) * Number(pBet[i]));
      }
    }
  }
  console.log(`choice: ${pChoice}, bet: ${pBet}, result: ${result}, 
    payout: ${payout}, total bet: ${totalBet}`);
}

function checkResultArray (pChoice, pBet, resultArray, odds) {
  for ( let i = 0; i < resultArray.length; i++) {
    checkResult(pChoice, pBet, resultArray[i], odds);
  }
}


//button for calculate payout
function calculatePayout() {
  //payout for big or small
  checkResult(playerChoice.BoS, playerBet.BoS, bos, 1);

  //payout for singles
  checkResultArray(playerChoice.Single, playerBet.Single, dices, 1);

  //payout for doubles
  checkResult(playerChoice.Double, playerBet.Double, doubles, 8);

  //payout for triples
  if (playerChoice.Triple === '000') {
    if (Number(triples) > 0) {
      checkResult (playerChoice.Triple, playerBet.Triple, '000', 24);
    }
  } else {
    checkResult(playerChoice.Triple, playerBet.Triple, triples, 150);
  }
  
  //payout for combi
  checkResultArray(playerChoice.Combi, playerBet, combi, 5);

  //payout for sum-------------------------------------------------
  checkResult(playerChoice.Sum, playerBet.Sum, sum, sumPayout(sum));

}

//=======================================================================


//calculate the payout of sum
function sumPayout(sum) {
  if (sum === 3 || sum === 18) {
    return 0;
  }
  if (sum === 4 || sum === 17) {
    return 50;
  }
  if (sum === 5 || sum === 16) {
    return 18;
  }
  if (sum === 6 || sum === 15) {
    return 14;
  }
  if (sum === 7 || sum === 14) {
    return 12;
  }
  if (sum === 8 || sum === 13) {
    return 8;
  }
  if (sum > 8 && sum < 13) {
    return 6;
  }
}
//------------------------------------------------------------------

//for TESTING purpose, we create functions to update bankroll



function updateBankroll(){
  bankroll -= totalBet;
  bankroll += payout;
  console.log(`payout: ${payout}, bankroll: ${bankroll}`);
}

function restartBankroll(){
  bankroll = 10000; // the sum of player bet
  payout = 0; // the sum of all reward
  totalBet = 0;
  console.log(`payout: ${payout}, totalBet: ${totalBet}, bankroll: ${bankroll}`);
}


//----------------------------------------
//dice, compare, calculate, update
function rollTheDices(){
  generateResult();
  calculatePayout();
  updateBankroll();
}


//=====================================================================
//INITIALIZE

//initialize for the next round
function nextRound(){
  totalBet = 0;
  bet = 0;
  payout = 0;
  

  dices = []; 

  bos = '';
  count = [0, 0, 0, 0, 0, 0]; 
  doubles = '';
  triples = '';
  combi = [];
  sum = 0;
  
  playerChoice = { 
    BoS: [],           
    Single: [],
    Double: [],
    Triple: [],
    Combi: [],
    Sum: []
  };

  playerBet = { 
    BoS: [],       
    Single: [],
    Double: [],
    Triple: [],
    Combi: [],
    Sum: []
  };

}

function startNextRound() {
  removeEventListeners();
  console.log("Starting the next round...");
  
  // Reset necessary variables for the next round
  nextRound();

  // Reattach event listeners
  recordChoice('.js-single', playerChoice.Single, playerBet.Single);
  recordChoice('.js-double', playerChoice.Double, playerBet.Double);
  recordChoice('.js-triple', playerChoice.Triple, playerBet.Triple);
  recordChoice('.js-bos', playerChoice.BoS, playerBet.BoS);
  recordChoice('.js-sum', playerChoice.Sum, playerBet.Sum);
  recordChoice('.js-combi', playerChoice.Combi, playerBet.Combi);

  console.log("Listeners reattached for the next round.");
}

// all variables that need to be initialized
function initializeAll(){
  dices = []; 

  bos = '';
  count = [0, 0, 0, 0, 0, 0]; 
  doubles = '';
  triples = '';
  combi = [];
  sum = 0;
  
  bet = 0;
  
  playerChoice = { 
    BoS: [],           
    Single: [],
    Double: [],
    Triple: [],
    Combi: [],
    Sum: []
  };

  playerBet = { 
    BoS: [],       
    Single: [],
    Double: [],
    Triple: [],
    Combi: [],
    Sum: []
  };


  bankroll = 10000;
  payout = 0;
  totalBet = 0;

  location.reload();
}



/* //tests:
let testPlayerChoice = ['Small'];
let testPlayerBet = ['200'];
let testResult = 'Small';
function testCheckResult(){

  console.log(bankroll);
  totalBet += Number(testPlayerBet);
  checkResult(testPlayerChoice, testPlayerBet, testResult, 1);
  updateBankroll();
  console.log(bankroll, totalBet);

  testPlayerChoice = ['Big'];
  testPlayerBet = ['100'];
  testResult = 'Small';
  totalBet += Number(testPlayerBet);
  checkResult(testPlayerChoice, testPlayerBet, testResult, 1);
  updateBankroll();
  console.log(bankroll, totalBet);

  testPlayerChoice = ['Big'];
  testPlayerBet = ['20'];
  testResult = 'Big';
  totalBet += Number(testPlayerBet);
  checkResult(testPlayerChoice, testPlayerBet, testResult, 1);
  updateBankroll();
  console.log(bankroll, totalBet);
}

testCheckResult(); */