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

    console.log( deck );
    deck = _.shuffle( deck );
    console.log( deck );
}

crearDeck();