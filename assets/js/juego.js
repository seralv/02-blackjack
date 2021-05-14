let deck = [];
const tipos = ['C', 'D', 'H', 'S'];
const especiales = ['A', 'J', 'Q', 'K'];

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

    // console.log( deck );
    console.log( carta );
    return carta;
}

pedirCarta();

const valorCarta = ( carta ) => {
    const valor = carta.substring( 0, carta.length-1 );
    return isNaN(valor) ? ( ( valor === 'A' ) ? 11 : 10 ) : valor * 1;
}

console.log(valorCarta( pedirCarta() ));