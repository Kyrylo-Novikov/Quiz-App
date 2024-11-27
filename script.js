let myQuestions = [
    {
        "question": "Welche Farbe hat das Licht mit der höchsten Energie im sichtbaren Spektrum?",
        "answer_1": "Rot",
        "answer_2": "Gelb",
        "answer_3": "Blau",
        "answer_4": "Grün",
        "right_answer": 3
    },
    {
        "question": "Welche Art von Obst hat in der Regel den niedrigsten Zuckergehalt?",
        "answer_1": "Banane",
        "answer_2": "Mango",
        "answer_3": "Apfel",
        "answer_4": "Beeren",
        "right_answer": 4
    }, {
        "question": "Was ist der empfohlene Ruhepuls für einen gesunden Erwachsenen?",
        "answer_1": "20-40 Schläge pro Minute",
        "answer_2": "40-60 Schläge pro Minute",
        "answer_3": "60-100 Schläge pro Minute",
        "answer_4": "100-120 Schläge pro Minute",
        "right_answer": 3
    },
    {
        "question": "Welches der folgenden Nahrungsmittel ist besonders reich an Proteinen und fördert den Muskelaufbau??",
        "answer_1": "Äpfel",
        "answer_2": "Eier",
        "answer_3": "Kartoffeln",
        "answer_4": "Brokkoli",
        "right_answer": 2
    },
    {
        "question": "Welche Aktivität fördert die neuroplastischen Fähigkeiten des Gehirns am meisten?",
        "answer_1": "Tägliche Routine beibehalten",
        "answer_2": " Neue Fertigkeiten lernen",
        "answer_3": "Vermeiden von Herausforderungen",
        "answer_4": "Immer dieselben Aufgaben erledigen",
        "right_answer": 2
    },
    {
        "question": "Welches Attribut wird im <img>-Tag verwendet, um ein Bild zu beschreiben??",
        "answer_1": "title",
        "answer_2": "desc",
        "answer_3": "src",
        "answer_4": "alt",
        "right_answer": 4
    },
];

let currentQuestion = 0;
let rightQuestionsCount = 0 ;
let audioRight = new Audio("disigne/Dark/Quizapp Dark/sounds/right.mp3");
let audioWrong = new Audio("disigne/Dark/Quizapp Dark/sounds/fail.mp3");

function init() {
    questionAmount()
    showQuestion()
}

function questionAmount() {
    let maxQuestionsRef = document.getElementById("max-questions")
    maxQuestionsRef.innerText = myQuestions.length
    let maxQuestionsFinishRef = document.getElementById("max-questions-finish")
    maxQuestionsFinishRef.innerText = myQuestions.length
    let currentQuestionNumb = document.getElementById("current-question-numb")
    currentQuestionNumb.innerText = currentQuestion +1
    progressbar()
}

function progressbar() {
    currentQuestionRef = currentQuestion +1
    let progressbarRef =document.getElementById("progress-bar")
    let progressbar =  Math.round(currentQuestionRef / myQuestions.length * 100 )
    progressbarRef.style.width = Math.round(currentQuestionRef / myQuestions.length * 100 )
    progressbarRef.innerText = `${progressbar}%`
    progressbarRef.style.width = `${progressbar}%`
}

function showQuestion() {
    let question = myQuestions[currentQuestion]
    let questiontextRef = document.getElementById("questiontext")
    questiontextRef.innerText = question['question'];
    let answer1Ref = document.getElementById("answer-1");
    let answer2Ref = document.getElementById("answer-2");
    let answer3Ref = document.getElementById("answer-3");
    let answer4Ref = document.getElementById("answer-4");
    answer1Ref.innerText = question['answer_1'];
    answer2Ref.innerText = question['answer_2'];
    answer3Ref.innerText = question['answer_3'];
    answer4Ref.innerText = question['answer_4'];
}


function answerCheck(selection) {
    let question = myQuestions[currentQuestion]
    let rightAnswer = question.right_answer
    let selectionNumber = selection.slice(-1)
    let takenChoise = document.getElementById(`answer-${selectionNumber}`)
    let btnRightAnswer = document.getElementById(`answer-${rightAnswer}`)
    if (rightAnswer == selectionNumber) {   
        rightAnswerCheck(takenChoise) 
    }else{
        wrongAnswer(takenChoise,btnRightAnswer)
    }
    nextBtn()
}
function rightAnswerCheck(takenChoise) {
    takenChoise.classList.add("bg-success")   
        rightQuestionsCount++
        audioRight.play()
}
function wrongAnswer(takenChoise,btnRightAnswer) {
    takenChoise.classList.add("bg-danger")  
        btnRightAnswer.classList.add("bg-success")
        audioWrong.play()
}
function nextBtn() {
    document.getElementById(`next-question-btn`).removeAttribute("disabled");
    let rightAnswerCountRef = document.getElementById("right-questions")
        rightAnswerCountRef.innerText = rightQuestionsCount
}

function nextQuestion() {
    currentQuestion ++
    if (currentQuestion == myQuestions.length ) {
        currentQuestion =  myQuestions.length - 1
        displayChange()
    }
    resetCard()
    questionAmount()
    showQuestion()
}

function displayChange() {
        let endCard = document.getElementById("finish-card")
        let finishImg = document.getElementById("finish-img")
        let quizCard = document.getElementById("question-card")
        let quizCardImg = document.getElementById("quiz-card-img")
        quizCard.classList.toggle("d-none")
        endCard.classList.toggle("d-none")
        finishImg.classList.toggle("d-none")
        quizCardImg.classList.toggle("d-none")
}

function resetCard() {
    let btns = document.getElementsByTagName('button')
    for (let i = 0; i < btns.length; i++) {
        let btn = btns[i];
        btn.classList.remove("bg-danger")
        btn.classList.remove("bg-success")
    }
    document.getElementById(`next-question-btn`).setAttribute("disabled",true);
}


function newTry() {
    currentQuestion = 0;
    rightQuestionsCount = 0 ;
    displayChange()
    showQuestion()
    questionAmount()
}