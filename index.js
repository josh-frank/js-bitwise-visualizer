const operationForm = document.getElementById( "operation-form" );
const numberAField = document.getElementById( "number-a" );
const operationField = document.getElementById( "operation" );
const numberBField = document.getElementById( "number-b" );
const numberADisplay = [ ...document.getElementById( "number-a-display" ).getElementsByTagName( "td" ) ].slice( 1 );
const numberBDisplay = [ ...document.getElementById( "number-b-display" ).getElementsByTagName( "td" ) ].slice( 1 );
const resultDisplay = [ ...document.getElementById( "result-display" ).getElementsByTagName( "td" ) ].slice( 1 );

function binaryArray( number ) {
    return ( "00000000".substr( number.toString( 2 ).length ) + number.toString( 2 ) ).split( "" );
}

function renderNumber( number, numberDisplay ) {
    const numberToRender = binaryArray( number )
    numberToRender.slice( numberToRender.length - 8 ).forEach( ( bit, index ) => numberDisplay[ index ].textContent = bit );
}

function renderOperation() {
    const numberA = parseInt( numberAField.value ), numberB = parseInt( numberBField.value );
    renderNumber( !!numberA ? numberA : 0, numberADisplay );
    renderNumber( !!numberB ? numberB : 0, numberBDisplay );
    let operationResult;
    switch ( operationField.value ) {
        case "and" : operationResult = numberA & numberB; break;
        case "or" : operationResult = numberA | numberB; break;
        case "xor" : operationResult = numberA ^ numberB; break;
        case "not" : operationResult = ~numberA; break;
        case "lsh" : operationResult = numberA << numberB; break;
        case "rsh" : operationResult = numberA >> numberB;
    }
    renderNumber( Math.abs( operationResult ), resultDisplay );
    document.getElementById( "result-sign" ).textContent = operationResult < 0 ? "-" : "";
}

document.addEventListener( "DOMContentLoaded", () => {
    operationForm.addEventListener( "change", renderOperation )
} );
