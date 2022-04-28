/* Selecionar as celulas */
const cellElements = document.querySelectorAll('[data-cell]');
const container = document.querySelector('[data-container]');
const winningMessageTextElement = document.querySelector('[winning-messageText]');
const winningMessage = document.querySelector('[ data-winning-message]');
const restartButton = document.querySelector('[data-restart-message-button]');

let isCircleTurn;

/*Combinações de vitoria*/
const winningCombinations = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];
/* Verificar ganhador */
const checkForWin = (currentPlayer) => {
    /*Verificando se alguma conbinação está preenchida com o current Player  */
    return winningCombinations.some((combination) => {
        return combination.every((index)=> {
            return cellElements[index].classList.contains(currentPlayer);
        });
    });
};

const checkForDraw = () => {
    return [ ... cellElements].every (cell => {
        return cell.classList.contains('x') || cell.classList.contains('circle');
    });
};

const startGame = () => { 
    isCircleTurn = false; /* X sempre iniciará o jogo */
/* Adcionar um evento click em todas as celulas */
    for (const cell of cellElements){
        cell.classList.remove('x');
        cell.classList.remove('circle');
        cell.removeEventListener('click',handleClick);
        cell.addEventListener('click', handleClick, {once:true}); /* Esse evento vai ocorrer apenas uma vez em cada celula */
    };

    setBoardHoverClass();
    winningMessage.classList.remove('show-winning-message');
}
/* Função para encerrar o jogo */
const endGame = (isDraw) => {   
    if (isDraw){
        winningMessageTextElement.innerHTML = 'Empate';
    } else {
        winningMessageTextElement.innerHTML= isCircleTurn ? ' O Venceu!': 'X Venceu!'
    }

    winningMessage.classList.add('show-winning-message');
}

const placeMark = (cell,classToAdd)=>{
    cell.classList.add(classToAdd)
}

const setBoardHoverClass = () => {
    /* Remover a classe x e circulo do container */
    container.classList.remove("circle");
    container.classList.remove("x");

    if (isCircleTurn){
        container.classList.add('circle');
    }else{
        container.classList.add('x');
    }
}
/* Mudar o simbolo */
const swupTurns = () => {
    isCircleTurn = !isCircleTurn;
    setBoardHoverClass();
}
const handleClick =(e)=>{
    /* Colocar a marca de X ou circulo */
    const cell = e.target;
    const classToAdd= isCircleTurn ? 'circle': 'x';
    placeMark(cell,classToAdd);
    /* Verificar vitoria */
    const isWin = checkForWin(classToAdd);
    /* Verificar por empate */
    const isDraw = checkForDraw();
    if (isWin){
        endGame(false);
    } else if(isDraw){
        endGame(true);
    } else {
        /* Mudando o simbolo */
        swupTurns();
    }
    
    
}

startGame();
restartButton.addEventListener('click', startGame);