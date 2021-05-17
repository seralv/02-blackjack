let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputadora = 0;

//Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const btnNuevo = document.querySelector('#btnNuevo');
const btnDetener = document.querySelector('#btnDetener');
const puntosHTML = document.querySelectorAll('small');
const divCartasJugador = document.querySelector('#jugador-cartas');
const divCartasComputadora = document.querySelector('#computadora-cartas');
const msgWinner = document.querySelector('.msgWinner');
document.querySelector('.alert').hidden = true;

const crearDeck = () => {
    for (let i = 2; i <= 10; i++) {
        for (const tipo of tipos) {
            deck.push( i + tipo );
        }
    }

    for (const esp of especiales) {
        for (const tipo of tipos) {
            deck.push( esp + tipo );
        }
    }

    // console.log( deck );
    deck = _.shuffle( deck );
    console.log( deck );
}

crearDeck();

const pedirCarta = () => {
    if ( deck.length === 0 ) {
        throw 'No hay cartas en el deck';
    }

    const carta = deck.pop();

    return carta;
}

const valorCarta = ( carta ) => {
    const valor = carta.substring( 0, carta.length-1 );
    return isNaN(valor) ? ( ( valor === 'A' ) ? 11 : 10 ) : valor * 1;
}

//Begin new game
const beginGame = () => {
    for (let i = 0; i < 2; i++) {
        const carta = pedirCarta();
        puntosJugador = puntosJugador + valorCarta( carta );
        puntosHTML[0].innerText = puntosJugador;
        
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ carta }.png`;
        imgCarta.classList.add('carta');
        divCartasJugador.append( imgCarta );
    }

    const cartaCompu = pedirCarta();
    puntosComputadora += valorCarta( cartaCompu );
    puntosHTML[1].innerText = puntosComputadora;
    
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ cartaCompu }.png`;
    imgCarta.classList.add('carta');
    divCartasComputadora.append( imgCarta );
}

beginGame();

//Eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta( carta );
    puntosHTML[0].innerText = puntosJugador;
    
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${ carta }.png`;
    imgCarta.classList.add('carta');
    divCartasJugador.append( imgCarta );

    if ( puntosJugador >= 21 ) {
        btnPedir.disabled = true;
        document.querySelector('.alert').hidden = false;
        msgWinner.innerText = `COMPUTADORA WON WITH ${ puntosComputadora }`;
    }
});

btnDetener.addEventListener('click', () => {
    while (puntosComputadora < 21) {
        const cartaCompu = pedirCarta();
        puntosComputadora += valorCarta( cartaCompu );
        puntosHTML[1].innerText = puntosComputadora;
        
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${ cartaCompu }.png`;
        imgCarta.classList.add('carta');
        divCartasComputadora.append( imgCarta );
    }

    document.querySelector('.alert').hidden = false;

    if ( puntosJugador <= 21 || puntosComputadora <= 21 ) {
        if ( puntosJugador === puntosComputadora) {
            msgWinner.innerText = 'THE GAME WAS TIED';
        } else {
            if ( puntosJugador <= 21 && puntosComputadora <= 21 ) {
                if ( puntosJugador === 21 ) {
                    msgWinner.innerText = `JUGADOR WON WITH ${ puntosJugador }`;
                } else {
                    if ( puntosComputadora === 21 ) {
                        msgWinner.innerText = `COMPUTADORA WON ${ puntosComputadora }`;    
                    } else {
                        if ( 21 - puntosJugador < 21 - puntosComputadora ) {
                            msgWinner.innerText = `JUGADOR WON WITH ${ puntosJugador }`;
                        } else {
                            msgWinner.innerText = `COMPUTADORA WON ${ puntosComputadora }`;
                        }            
                    }
                }
            } else {
                if ( puntosJugador <= 21 && puntosComputadora > 21 ) {
                    msgWinner.innerText = `JUGADOR WON WITH ${ puntosJugador }`;
                } else {
                    if ( puntosComputadora <= 21 ) {
                        msgWinner.innerText = `COMPUTADORA WON ${ puntosComputadora }`;
                    } else {
                        
                    }
                    msgWinner.innerText = `COMPUTADORA WON ${ puntosComputadora }`;
                }
            }
        }        
    } else {
        msgWinner.innerText = 'BOTH LOSE';
    }
});

btnNuevo.addEventListener('click', () => {
    window.location.href = window.location.href;
});

