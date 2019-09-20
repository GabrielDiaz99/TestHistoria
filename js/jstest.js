// elementos
const comenzar = document.getElementById("comenzar");
const examen = document.getElementById("examen");
const pregunta = document.getElementById("pregunta");
const eImg = document.getElementById("eImg");
const opcionA = document.getElementById("A");
const opcionB = document.getElementById("B");
const opcionC = document.getElementById("C");
const contar = document.getElementById("contar");
const tiempo2 = document.getElementById("tiempo2");
const progreso = document.getElementById("progreso");
const scoreDiv = document.getElementById("contarpuntos");


// creacion de preguntas
let questions = [
    {
        pregunta : "¿Cuando se hizó el descubrimiento de América?",
        imgSrc : "../img/pregunta1.jpg",
        opcionA : "1492",
        opcionB : "1482",
        opcionC : "1472",
        correct : "A"
    },{
        pregunta : "¿En que puerto salieron los barcos españoles?",
        imgSrc : "../img/pregunta2.jpg",
        opcionA : "Puerto de España",
        opcionB : "Puerto de Palos",
        opcionC : "Puerto de la Libertad",
        correct : "B"
    },{
        pregunta : "¿En cual barco regresó Colón a España?",
        imgSrc : "../img/pregunta3.jpg",
        opcionA : "La Santa María",
        opcionB : "La pinta",
        opcionC : "La niña",
        correct : "C"
    },{
        pregunta : "¿Cuando inicio la Primera Guerra Mundial?",
        imgSrc : "../img/pregunta4.jpg",
        opcionA : "1916",
        opcionB : "1914",
        opcionC : "1912",
        correct : "B"
    },{
        pregunta : "¿Cuando terminó la Primera Guerra Mundial?",
        imgSrc : "../img/pregunta5.jpg",
        opcionA : "1918",
        opcionB : "1919",
        opcionC : "1917",
        correct : "A"
    },{
        pregunta : "¿Cuando inicio la Segunda Guerra Mundial?",
        imgSrc : "../img/pregunta6.jpg",
        opcionA : "1941",
        opcionB : "1937",
        opcionC : "1939",
        correct : "C"
    },{
        pregunta : "¿Cuando terminó la Segunda Guerra Mundial?",
        imgSrc : "../img/pregunta7.jpg",
        opcionA : "1944",
        opcionB : "1945",
        opcionC : "1947",
        correct : "B"
    },{
        pregunta : "¿Cuando inicio la Guerra Fria?",
        imgSrc : "../img/pregunta8.jpg",
        opcionA : "1948-1950",
        opcionB : "1946-1948",
        opcionC : "1945-1947",
        correct : "C"
    },{
        pregunta : "¿Cuando finalizó la Guerra Fria?",
        imgSrc : "../img/pregunta9.jpg",
        opcionA : "1989-1991",
        opcionB : "1990-1992",
        opcionC : "1988-1989",
        correct : "A"
    },{
        pregunta : "¿Cuando se fundó la ONU?",
        imgSrc : "../img/pregunta10.png",
        opcionA : "1955",
        opcionB : "1945",
        opcionC : "1965",
        correct : "B"
    }
];

// crear variables

const lastQuestion = questions.length - 1;
let runningQuestion = 0;
let count = 0;
const questionTime = 10; // 10 segundos
const gaugeWidth = 150; // 150px
const gaugeUnit = gaugeWidth / questionTime;
let TIMER;
let score = 0;

// hacer una pregunta
function renderQuestion(){
    let q = questions[runningQuestion];
    
    pregunta.innerHTML = "<p>"+ q.pregunta +"</p>";
    eImg.innerHTML = "<img src="+ q.imgSrc +">";
    opcionA.innerHTML = q.opcionA;
    opcionB.innerHTML = q.opcionB;
    opcionC.innerHTML = q.opcionC;
}

comenzar.addEventListener("click",comenzarexamen);


// Comenzar examen
function comenzarexamen(){
    comenzar.style.display = "none";    
    renderQuestion();
    examen.style.display = "block";
    renderProgress();
    renderCounter();
    TIMER = setInterval(renderCounter,1000); // 1000ms = 1 segundo
}

// ver progreso
function renderProgress(){
    for(let qIndex = 0; qIndex <= lastQuestion; qIndex++){
        progreso.innerHTML += "<div class='prog' id="+ qIndex +"></div>";
    }
}

// contador

function renderCounter(){
    if(count <= questionTime){
        contar.innerHTML = count;
        tiempo2.style.width = count * gaugeUnit + "px";
        count++
    }else{
        count = 0;
        // cambiar color a rojo
        answerIsWrong();
        if(runningQuestion < lastQuestion){
            runningQuestion++;
            renderQuestion();
        }else{
            // final del examen y ver el resultado
            clearInterval(TIMER);
            scoreRender();
        }
    }
}

// calificar respuesta

function checkAnswer(answer){
    if( answer == questions[runningQuestion].correct){
        // Respuesta Correcta
        score++;
        // cambiar color a verde
        answerIsCorrect();
    }else{
        // pregunta es incorrecta
        // cambiar el color a rojo
        answerIsWrong();
    }
    count = 0;
    if(runningQuestion < lastQuestion){
        runningQuestion++;
        renderQuestion();
    }else{
        // Final del examen 
        clearInterval(TIMER);
        scoreRender();
    }
}

// Respuesta es Correcta
function answerIsCorrect(){
    document.getElementById(runningQuestion).style.backgroundColor = "#0f0";
}

// Respuesta es incorrecta
function answerIsWrong(){
    document.getElementById(runningQuestion).style.backgroundColor = "#f00";
}

// Ver puntuacion
function scoreRender(){
    scoreDiv.style.display = "block";
    
    // calcular el porcentaje de respuestas
    const scorePerCent = Math.round(100 * score/questions.length);
    
    // imagenes segun el resultado
    let img = (scorePerCent >= 80) ? "../img/5.png" :
              (scorePerCent >= 60) ? "../img/4.png" :
              (scorePerCent >= 40) ? "../img/3.png" :
              (scorePerCent >= 20) ? "../img/2.png" :
              "img/1.png";
    
    scoreDiv.innerHTML = "<img src="+ img +">";
    scoreDiv.innerHTML += "<p>"+ scorePerCent +"%</p>";
    scoreDiv.innerHTML += "<p><a href='../index.html'>Volver</a></p>"
}





















