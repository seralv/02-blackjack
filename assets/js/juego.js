let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

let puntosJugador = 0,
    puntosComputadora = 0;

//Referencias del HTML
const btnPedir = document.querySelector('#btnPedir');
const puntosHTML = document.querySelectorAll('small');

const crearDeck = () => {
    for (let i = 1; i <= 10; i++) {
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

//pedirCarta();

const valorCarta = ( carta ) => {
    const valor = carta.substring( 0, carta.length-1 );
    return isNaN(valor) ? ( ( valor === 'A' ) ? 11 : 10 ) : valor * 1;
}

//Eventos
btnPedir.addEventListener('click', () => {
    const carta = pedirCarta();
    puntosJugador = puntosJugador + valorCarta( carta );
    puntosHTML[0].innerText = puntosJugador;
});