import { preguntas } from "./preguntas.js";

let mostrarPregunta = document.getElementById("pregunta");
let boton1 = document.getElementById("boton1");
let boton2 = document.getElementById("boton2");
let boton3 = document.getElementById("boton3");
let boton4 = document.getElementById("boton4");
let botones = document.getElementsByClassName("botones");
let next = document.getElementById("next");
let respuesta = document.getElementById("contador");
let bloquePrincipal = document.getElementById("principal");
let bloqueSecundario = document.getElementById("secundario");


let contador = 0;
let contadorExterior = 0;
let preguntas_respondidas = 1;
let Array_preguntas_respuestas = [];

function numeroRandom() {
    return Math.floor(Math.random() * preguntas.length);
}

function deshabilitarBoton() {
    for (let i = 0; i < botones.length; i++) {
        botones[i].disabled = true;
    }
}

function habilitarBotones() {
    for (let i = 0; i < botones.length; i++) {
        botones[i].disabled = false;
    }
}

function RestablecerEstilos() {
    for (let i = 0; i < botones.length; i++) {
        botones[i].style.background = "White";
        botones[i].style.color = "rgb(90, 90, 219)";
    }
}

function RestStar() {
    contador = 0;
    preguntas_respondidas = 1;
    Array_preguntas_respuestas = [];
}

function Starquizz() {
    if (preguntas_respondidas == preguntas.length) {
        bloquePrincipal.style.display="none";
        bloqueSecundario.style.display="block"
        respuesta.innerHTML = `Has acertado <span <span style="font-size: 60px; color: Green;">${contadorExterior}</span> respuestas correctas`;
        console.log("Has terminado el formulario");
        console.log(contadorExterior);

        return;
    }

    let numero_aleatorio = numeroRandom();

    while (Array_preguntas_respuestas.includes(numero_aleatorio)) {
        numero_aleatorio = numeroRandom();
    }

    Array_preguntas_respuestas.push(numero_aleatorio);

    const pregunta_actual = preguntas[numero_aleatorio];
    const indiceRespuestasCorrectas = pregunta_actual.respuesta.findIndex(respuesta => respuesta.correcto === "true");

    mostrarPregunta.innerHTML = pregunta_actual.pregunta;
    boton1.innerHTML = pregunta_actual.respuesta[0].texto;
    boton2.innerHTML = pregunta_actual.respuesta[1].texto;
    boton3.innerHTML = pregunta_actual.respuesta[2].texto;
    boton4.innerHTML = pregunta_actual.respuesta[3].texto;

    for (let i = 0; i < botones.length; i++) {
        botones[i].value = pregunta_actual.respuesta[i].correcto;
    }

    for (let i = 0; i < botones.length; i++) {
        botones[i].addEventListener("click", function () {
            if (botones[i].value === "true") {
                botones[i].style.background = "Green";
                botones[i].style.color = "White";
                if (i === indiceRespuestasCorrectas) {
                    contador++;
                }
            } else {
                botones[i].style.background = "Red";
                botones[i].style.color = "White";
                for(let j=0; j<botones.length; j++){
                    if(botones[j].value === "true"){
                        botones[j].style.background = "Green"
                        botones[j].style.color = "White"
                    }
                }
            }

            deshabilitarBoton();
        });
    }

    if(contador>0){
        contadorExterior++;
        console.log(contadorExterior)
    }
    contador = 0;
}

RestStar();
Starquizz();

next.addEventListener("click", function () {
    RestablecerEstilos();
    habilitarBotones();
    Starquizz();
    preguntas_respondidas++;
});





















