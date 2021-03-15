const question = document.querySelector('#question');
const choices = document.querySelectorAll('.choice-text');


let currentQuestion = {};
let acceptingAnswers = true;
let questionCounter = 0;
let availableQuestions = [];

let questions = [
    {
        question: '2+2?',
        choice1: '1',
        choice2: '2',
        choice3: '3',
        choice4: '4',
        answer: 4,

    },
    {
        question: '1+1?',
        choice1: '1',
        choice2: '2',
        choice3: '3',
        choice4: '4',
        answer: 2,

    },
    {
        question: '3+0?',
        choice1: '1',
        choice2: '2',
        choice3: '3',
        choice4: '4',
        answer: 3,

    },
    {
        question: '3-2?',
        choice1: '1',
        choice2: '2',
        choice3: '3',
        choice4: '4',
        answer: 1,

    }
]

const MAX_QUESTIONS = 