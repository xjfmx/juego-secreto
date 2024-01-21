let numeroSecreto = 0;
let intentos = 0;
let listaNumerosSorteados = [];
let numeroMaximo = 10;

function asignarTextoElemento(elemento, texto) {
    let elementoHTML = document.querySelector(elemento);
    elementoHTML.innerHTML = texto;
    return;
}

function verificarIntento() { // SE DEFINE
    let numeroDeUsuario = parseInt(document.getElementById('valorUsuario').value);
    console.log(intentos);
    if (numeroDeUsuario === numeroSecreto){
        // el usuario acertó y puede reiniciar el juego
        asignarTextoElemento('p',`Acertaste el número en ${intentos} ${(intentos === 1) ? 'vez' : 'veces'}`) // CAMBIA ENTRE "VEZ" Y "VECES" DEPENDIENDO DE LOS INTENTOS
        document.getElementById('reiniciar').removeAttribute('disabled'); // se habilita el botón
    } else {
        if (numeroDeUsuario > numeroSecreto){
            asignarTextoElemento('p','No, el número es menor!');
        } else {
            // el usuario no acertó
            asignarTextoElemento('p','No, el número es mayor!');
        }
        intentos++;
        if (intentos == 3) {
            asignarTextoElemento('p', 'Es tu ultima chance')
        } 
        if (intentos == 4) {
            asignarTextoElemento('p', `Juego Terminado. El numero era ${numeroSecreto}`)
            document.getElementById('reiniciar').removeAttribute('disabled');
        }
        limpiarCaja();
    }
}

function condicionesIniciales() { // NUEVO JUEGO
    limpiarCaja();
    asignarTextoElemento('h1','Juego del numero secreto');
    asignarTextoElemento('p', `Indica un número del 1 al ${numeroMaximo}`)
    numeroSecreto = generarNumeroSecreto()// generar número aleatrorio
    intentos = 1;
    document.querySelector("#reiniciar").setAttribute('disabled','true');
}

function reiniciarJuego() {
    limpiarCaja()
    condicionesIniciales()
    
}

function limpiarCaja() {
    document.querySelector('#valorUsuario').value = '';
}

function generarNumeroSecreto(){
    let numeroGenerado = Math.floor(Math.random()*numeroMaximo)+1;
    console.log(listaNumerosSorteados); // VER LISTA
    if (listaNumerosSorteados.length == numeroMaximo) {
        asignarTextoElemento('p', 'Ya se sortearon todos los numeros posibles');
    } else {
    // si el numero generado está incluido en la lista
    if (listaNumerosSorteados.includes(numeroGenerado)) {
        return generarNumeroSecreto();
    } else
        listaNumerosSorteados.push(numeroGenerado);
        return numeroGenerado;
    }
}

condicionesIniciales();
