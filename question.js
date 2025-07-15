const quizData = [
    {
        question: "1. 다음 단어의 뜻을 구별해 주는 요소로 알맞지 않은 것은?",
        choices: [
            "① 곰, 솜 - 자음",
            "② 종, 공 - 자음",
            "③ 돌, 돈 - 모음",
            "④ 산, 선 - 모음",
            "⑤ 밥, 법 - 모음"
        ],
        answer: 3
    },
    {
        question: "2. 국어의 음운에 대한 설명으로 적절하지 않은 것은?",
        choices: [
            "① 음운의 종류에는 자음과 모음이 있다.",
            "② 말의 뜻을 구별해 주는 소리의 단위이다.",
            "③ 모음은 공기가 그대로 흘러나오는 소리이다.",
            "④ 자음은 모음 없이 홀로 소리 낼 수 있는 음운이다.",
            "⑤ 음운에 따라 소리 낼 때의 느낌이 달라질 수 있다."
        ],
        answer: 4
    },
    {
        question: "3. 말의 뜻을 구별해 주는 소리의 가장 작은 단위는?",
        choices: [
            "① 음운",
            "② 음절",
            "③ 단어",
            "④ 문장",
            "⑤ 형태소"
        ],
        answer: 1
    },
    {
        question: "4. ‘돌’의 음운 중 하나를 골라 다른 음운으로 바꾼 단어가 아닌 것은?",
        choices: [
            "① 솔",
            "② 달",
            "③ 덕",
            "④ 돈",
            "⑤ 독"
        ],
        answer: 3
    },
    {
        question: "5. 음운에 대한 설명으로 알맞지 않은 것은?",
        choices: [
            "① 단어의 음운을 바꾸어 쓰면 의미가 달라진다.",
            "② 우리말의 음운은 자음과 모음으로 이루어진다.",
            "③ 자음은 공기가 방해를 받으며 나오는 소리이다.",
            "④ 말의 뜻을 구별해 주는 소리의 가장 작은 단위이다.",
            "⑤ 모음은 홀로 소리 낼 수 없어 자음을 만나야만 소리를 낼 수 있다."
        ],
        answer: 5
    }
];

let currentQuiz = 0;
let score = 0;
let selected = null;

const questionEl = document.getElementById('question');
const choicesEl = document.getElementById('choices');
const nextBtn = document.getElementById('next-btn');
const resultBox = document.getElementById('result-box');
const quizBox = document.getElementById('quiz-box');
const scoreEl = document.getElementById('score');
const restartBtn = document.getElementById('restart-btn');

function loadQuiz() {
    const quiz = quizData[currentQuiz];
    questionEl.textContent = quiz.question;
    choicesEl.innerHTML = '';
    quiz.choices.forEach((choice, idx) => {
        const btn = document.createElement('button');
        btn.textContent = choice;
        btn.onclick = () => selectChoice(idx);
        btn.className = selected === idx ? 'selected' : '';
        const li = document.createElement('li');
        li.appendChild(btn);
        choicesEl.appendChild(li);
    });
    nextBtn.disabled = selected === null;
}

function selectChoice(idx) {
    selected = idx;
    Array.from(choicesEl.querySelectorAll('button')).forEach((btn, i) => {
        btn.className = i === idx ? 'selected' : '';
    });
    nextBtn.disabled = false;
}

nextBtn.onclick = function() {
    const quiz = quizData[currentQuiz];
    if (selected === quiz.answer - 1) {
        score++;
    }
    currentQuiz++;
    selected = null;
    if (currentQuiz < quizData.length) {
        loadQuiz();
    } else {
        showResult();
    }
};

function showResult() {
    quizBox.style.display = 'none';
    resultBox.style.display = 'block';
    scoreEl.textContent = `총 ${quizData.length}문제 중 ${score}문제 맞춤!`;
}

restartBtn.onclick = function() {
    currentQuiz = 0;
    score = 0;
    selected = null;
    quizBox.style.display = 'block';
    resultBox.style.display = 'none';
    loadQuiz();
};

window.onload = loadQuiz;
