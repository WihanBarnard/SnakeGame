document.addEventListener('DOMContentLoaded', () => {

    const squares = document.querySelectorAll('.grid div');
    const scoreDisplay = document.querySelector('span');
    const startBtn = document.querySelector('.start');

    const width = 10;
    let currentIndex = 0;
    let appleIndex = 0;
    let currentSnake = [2,1,0]; //all divs with val of 2 will be the head, all divs with val of 0 will be the tail
     
    let direction = 1;
    let score = 0;
    let speed = 0.9;
    let intervalTime = 0;
    let interval = 0;

    //to start, restart function 
    function startGame() {
        currentSnake.forEach(index => squares[index].classList.remove('snake'));
        squares[appleIndex].classList.remove('apple');
        clearInterval(interval);
        score = 0;
        randomApple();
        direction = 1;
        scoreDisplay.innerText = score;
        intervalTime = 1000;
        currentSnake = [2,1,0];
        currentIndex = 0;
        currentSnake.forEach(index => squares[index].classList.add('snake'));
        interval = setInterval(moveOutcomes, intervalTime);
    }

    //function that deals with ALL outcomes
    function moveOutcomes() {
        //deals with snake hitting border or itself
        if (
            (currentSnake[0] + width >= (width*width) && direction === width)   || //if snake hits bottom
            (currentSnake[0] % width === width - 1 && direction === 1)          || //if snake hits right wall
            (currentSnake[0] % width === 0 && direction === -1)                 || //if snake hits left wall
            (currentSnake[0] - width < 0 && direction === -width)               || //if snake hits top
            squares[currentSnake[0] + direction].classList.contains('snake')
        ) {
            return clearInterval(interval); //this will clear interval if any of the above conditions happen
        }

        const tail = currentSnake.pop(); //remove last piece of array and shows it
        squares[tail].classList.remove('snake'); //removes class snake from tail
        currentSnake.unshift(currentSnake[0] + direction); //gives direction to the head

        //deals with snake getting apple
        if(squares[currentSnake[0]].classList.contains('apple')) {
            squares[currentSnake[0]].classList.remove('apple');
            squares[tail].classList.add('snake'); //add extra square to tail, make it grow
            currentSnake.push(tail);
            randomApple()
            score++;
            scoreDisplay.textContent = score;
            clearInterval(interval);
            intervalTime = intervalTime * speed;
            interval = setInterval(moveOutcomes, intervalTime);
        }
        squares[currentSnake[0]].classList.add('snake');
    }

    //generate new apple once apple is eaten
    function randomApple() {
        do {
            appleIndex = Math.floor(Math.random() * squares.length);
        } while(squares[appleIndex].classList.contains('snake')) {
            squares[appleIndex].classList.add('apple');
        }
    }
    

    //assign functions to keycodes
    function control(event) {
        squares[currentIndex].classList.remove('snake'); //removing snake class

        if(event.keyCode == 39) {
            direction = 1; //if we press the right arrow, just increments space in div grid (going right)
        } else if(event.keyCode === 38) {
            direction = -width; //if we press the up key, has to go up (-10 each time)
        } else if(event.keyCode === 37) {
            direction = -1; //left key
        } else if(event.keyCode === 40) {
            direction = +width;
        }
    }



    document.addEventListener('keyup', control);
    startBtn.addEventListener('click', startGame);

})