'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');

  const quizSet = [
    {q: 'What is A?', c: ['A0', 'A1', 'A2']},
    {q: 'What is B?', c: ['B0', 'B1', 'B2']},
    {q: 'What is C?', c: ['C0', 'C1', 'C2']},
  ];
  let currentNum = 0;
  let isAnswered; // 一度選択肢を選んだら他のものは選択できない設定にするために必要

  // クイズ選択肢とシャッフル処理
  function shuffle(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[j], arr[i]] = [arr[i], arr[j]];
    }
    return arr;
  }

  function checkAnswer(li) { // 答えが正解か識別する処理
    
    // if (isAnswered === true) { // 以下の通り===trueは省略してもOK 
    if (isAnswered) { // もしisAnsweredがtrueなら以降の正誤処理はしない設定
      return;
    }
    isAnswered = true;

    if (li.textContent === quizSet[currentNum].c[0]) {
      li.classList.add('correct');
    } else {
      li.classList.add('wrong');
    }
  }
  
  function setQuiz() {
    isAnswered = false;
    question.textContent = quizSet[currentNum].q;
  
    const shuffledChoices = shuffle([...quizSet[currentNum].c]);
    // console.log(quizSet[currentNum].c);
    shuffledChoices.forEach(choice => {
      const li = document.createElement('li');
      li.textContent = choice;
      li.addEventListener('click', () => {
        checkAnswer(li);
      });
      choices.appendChild(li);
    });
  }

  setQuiz();
}