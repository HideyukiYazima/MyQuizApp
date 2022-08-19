'use strict';

{
  const question = document.getElementById('question');
  const choices = document.getElementById('choices');
  const btn = document.getElementById('btn');
  const result = document.getElementById('result');
  const scoreLabel = document.querySelector('#result > p');

  const quizSet = shuffle([ // ここでshuffleを入れたことでクイズがランダムで表示される
    {q: '世界で一番大きな湖は？', c: ['カスピ海', 'カリブ海', '琵琶湖']},
    {q: '2の8乗は？', c: ['256', '64', '1024']},
    {q: '次のうち、最初にリリースされた言語は？', c: ['Python', 'JavaScript', 'HTML']},
  ]);
  let currentNum = 0;
  let isAnswered; // 一度選択肢を選んだら他のものは選択できない設定にするために必要
  let score = 0; // 問題の正答数を管理するために必要

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
      score++; // 正答数を管理するために必要
    } else {
      li.classList.add('wrong');
    }

    btn.classList.remove('disabled'); // 回答するとnextが選択できるようになる処理
  }
  
  function setQuiz() {
    isAnswered = false;

    question.textContent = quizSet[currentNum].q;
  
    while(choices.firstChild) {
      choices.removeChild(choices.firstChild);
    } // このように書くとchoices.firstChildの値がnullになるまでループするので結果的にchoicesの子要素が全て消える。

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

    if (currentNum === quizSet.length - 1) { // 最後の問題ではnextのテキストをShow Scoreに変える処理
      btn.textContent = 'Show Score';
    }
  }

  setQuiz();

  // nextクリック後に次の問題が表示されるようにする処理
  btn.addEventListener('click', () => {
    if (btn.classList.contains('disabled')) {
      return;
    } // disabledクラスが付いていたら次の問題にいかないようにreturnとする。
    btn.classList.add('disabled'); // そのうえで次の問題に行くときはbtnをグレーに戻したいのでここでdisabledクラスを付ける。

    if (currentNum === quizSet.length - 1) { // 最後の回答後にShow Scoreをクリックするとスコア確認が可能に //
      // console.log(`Score: ${score} / ${quizSet.length}`);
      scoreLabel.textContent = `Score: ${score} / ${quizSet.length}`;
      result.classList.remove('hidden');
    } else {
      currentNum++;
      setQuiz();
    }
  });
}