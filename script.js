// haven't split the characters into correct letter, but at wrong index, and correct letters... They are all going into one storage.

// haven't got rid of duplicates will get logged to wrong letter

// we get try again when we input 'earth' on the third try.


const user = {
  /* DATA */

  currentGuess: '',

  accumulatedGuess: {
    0: '_',
    1: '_',
    2: '_',
    3: '_',
    4: '_'
  },

  /* for later
  yellow object:
  isAnswerWrongIndex: {
    1: [r, 1], [t, 3], [e, 4]
    2: nil
  } */
  
  letterData: {
    inAnswerWrongIndex:[],
    notInAnswer: []
  },

  attemptCounter: 0,

  previousGuesses: []
};
  

const game = {
  /* DATA */

  // listOfWords: ['earth'],
  listOfWords: ["earth", "which", "there", "their", "about", "would", "these", "other", "words", "could", "write", "first", "water", "after", "where", "right", "think", "three", "years", "place", "sound", "great", "again", "still", "every", "small", "found", "those", "never", "under", "might", "while", "house", "world", "below", "asked", "going", "large", "until", "along", "shall", "being", "often", "earth", "began", "since", "study", "night", "light", "above", "paper", "parts", "young", "story", "point", "times", "heard", "whole", "white", "given", "means", "music", "miles", "thing", "today", "later", "using", "money", "lines", "order", "group", "among", "learn", "known", "space", "table", "early", "trees", "short", "hands", "state", "black", "shown", "stood", "front", "voice", "kinds", "makes", "comes", "close", "power", "lived", "vowel", "taken", "built", "heart", "ready", "quite", "class", "bring", "round", "horse", "shows", "piece", "green", "stand", "birds", "start", "river", "tried", "least", "field", "whose", "girls", "leave", "added", "color", "third", "hours", "moved", "plant", "doing", "names", "forms", "heavy", "ideas", "cried", "check", "floor", "begin", "woman", "alone", "plane", "spell", "watch", "carry", "wrote", "clear", "named", "books", "child", "glass", "human", "takes", "party", "build", "seems", "blood", "sides", "seven", "mouth", "solve", "north", "value", "death", "maybe", "happy", "tells", "gives", "looks", "shape", "lives", "steps", "areas", "sense", "speak", "force", "ocean", "speed", "women", "metal", "south", "grass", "scale", "cells", "lower", "sleep", "wrong", "pages", "ships", "needs", "rocks", "eight", "major", "level", "total", "ahead", "reach", "stars", "store", "sight", "terms", "catch", "works", "board", "cover", "songs", "equal", "stone", "waves", "guess", "dance", "spoke", "break", "cause", "radio", "weeks", "lands", "basic", "liked", "trade", "fresh", "final", "fight", "meant", "drive", "spent", "local", "waxes", "knows", "train", "bread", "homes", "teeth", "coast", "thick", "brown", "clean", "quiet", "sugar", "facts", "steel", "forth", "rules", "notes", "units", "peace", "month", "verbs", "seeds", "helps", "sharp", "visit", "woods", "chief", "walls", "cross", "wings", "grown", "cases", "foods", "crops", "fruit", "stick", "wants", "stage", "sheep", "nouns", "plain", "drink", "bones", "apart", "turns", "moves", "touch", "angle", "based", "range", "marks", "tired", "older", "farms", "spend", "shoes", "goods", "chair", "twice", "cents", "empty", "alike", "style", "broke", "pairs", "count", "enjoy", "score", "shore", "roots", "paint", "heads", "shook", "serve", "angry", "crowd", "wheel", "quick", "dress", "share", "alive", "noise", "solid", "cloth", "signs", "hills", "types", "drawn", "worth", "truck", "piano", "upper", "loved", "usual", "faces", "drove", "cabin", "boats", "towns", "proud", "court", "model", "prime", "fifty", "plans", "yards", "prove", "tools", "price", "sheet", "smell", "boxes", "raise", "match", "truth", "roads", "threw", "enemy", "lunch", "chart", "scene", "graph", "doubt", "guide", "winds", "block", "grain", "smoke", "mixed", "games", "wagon", "sweet", "topic", "extra", "plate", "title", "knife", "fence", "falls", "cloud", "wheat", "plays", "enter", "broad", "steam", "atoms", "press", "lying", "basis", "clock", "taste", "grows", "thank", "storm", "agree", "brain", "track", "smile", "funny", "beach", "stock", "hurry", "saved", "sorry", "giant", "trail", "offer", "ought", "rough", "daily", "avoid", "keeps", "throw", "allow", "cream", "laugh", "edges", "teach", "frame", "bells", "dream", "magic"],

  masterWord: {
    0: '',
    1: '',
    2: '',
    3: '',
    4: ''
  },

  masterWordString: '',

  status: 'in progress',

  messages: {
    win: () => {
      alert(`You got it, the word was ${Object.values(game.masterWord).join('')}!`);
      game.displayUserData();
    },
    lose: () => {
      alert(`You lost! Correct word is: ${Object.values(game.masterWord).join('')}`)
      game.displayUserData();
    },
    currentGuessMessage: () => {
      return `Attempt ${user.attemptCounter}/6 | \n
      Guess: ${user.currentGuess} | \n
      Correct letters: ${Object.values(user.accumulatedGuess).join(' ')} | \n
      In word, but wrong spot: [ ${user.letterData.inAnswerWrongIndex.join(' ')} ] | \n
      Not in word: [ ${user.letterData.notInAnswer.join(' ')} ]\n`
    }
  },

  /* FUNCTIONALITY */
  startGame: function() {
    if (user.attemptCounter === 0) game.selectMasterWord(); // game just started

    if (user.attemptCounter < 6) { // game is in progress
      game.resetLetterData();
      user.attemptCounter++;
      setTimeout(game.getInput(), 1000*user.attemptCounter);
      game.updateUser();
    }

    if (game.checkGuess() === true) { // did you get it right
      game.status = 'end';
      game.messages.win();
      game.reset(); 
      return;
    };
    

    if (user.attemptCounter >= 6 && game.status !== 'win') { // you lost
      game.status = 'end';
      game.messages.lose();
      game.reset();
    }

    else return game.displayUserData();
  },
 
  selectMasterWord: function () {
    let masterWordString = game.listOfWords[Math.floor(Math.random() * game.listOfWords.length)];
    game.masterWordString = masterWordString;
    for (let i = 0; i < masterWordString.length; i++) {
      game.masterWord[i] = masterWordString[i];
    }
  },

  getInput: function() {user.currentGuess = window.prompt('Please enter a five letter word').toLowerCase()},

  updateUser: function() {
    let guess = user.currentGuess;
    for (let i = 0; i < 5; i++) {
      let char = guess[i]; 
      if (game.masterWord[i] === char) user.accumulatedGuess[i] = char;
      else
        if (Object.values(game.masterWord).includes(char) && !user.letterData.inAnswerWrongIndex.includes(char)) user.letterData.inAnswerWrongIndex.push(char)
        else 
          if (!user.letterData.notInAnswer.includes(char)) user.letterData.notInAnswer.push(char);
    }
  },

  displayUserData: function() {
    user.previousGuesses.push(game.messages.currentGuessMessage());
    let newTextLine = document.createElement('div');
    newTextLine.setAttribute('id', 'message');
    let newMessage = game.messages.currentGuessMessage();
    newTextLine.textContent = `${newMessage}`;
    messageBox.appendChild(newTextLine);
  },
  
  resetLetterData: function() {
    for (let key in user.accumulatedGuess) user.accumulatedGuess[key] = '_';
    user.letterData.inAnswerWrongIndex = [];
  },

  reset: function() {
    user.currentGuess = '';
    for (let key in user.accumulatedGuess) user.accumulatedGuess[key] = '_';
    user.letterData = {
    inAnswerWrongIndex:[],
    notInAnswer: []
    };
    game.status = 'in progress'
    user.attemptCounter = 0;
    user.previousGuesses = [];
    game.masterWordString = '';
    let allMessages = Array.from(document.querySelectorAll('#message'));
    console.log(allMessages);
    for (let msg of allMessages) {
      msg.parentNode.removeChild(msg);
    }
  },

  checkGuess: function() {
    let answer = Object.values(game.masterWord).join('');
    if (user.currentGuess === answer) return true
  }
}

const startBtn = document.querySelector('button');
startBtn.addEventListener('click', () => game.startGame());

const messageBox = document.querySelector('#console');
