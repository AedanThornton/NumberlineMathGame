//function to turn on the button-check overlay
function overlayOn() {
    document.getElementById("overlay").style.display = "flex";
    var docwidth = document.body.clientWidth;
    var docheight = document.body.clientHeight;
    var small_edge = ((docheight < docwidth) ? docheight : docwidth);
    var button_rad = small_edge * 0.3;
    
    // ideally the number of buttons to choose from varies by difficulty selected, where higher difficulty means more buttons
    // button pattern would change based on the amount of buttons, currently with three buttons it is:
    //
    //          []  []  []
    //
    // with 7 buttons it might be:
    //
    //            []  []
    //          []  []  []
    //            []  []
    //
    // the following code should be able to handle any number of buttons, except for automatically arranging them based on number, which would be a nice feature
    const buttons = Array.from( 
        document.getElementById("buttons1").getElementsByClassName('button')
    );

    //adjust button sizes to better fit the screen, could be improved on
    buttons.forEach(button => {
        button.style.width = button_rad;
        button.style.height = button_rad;
        button.style.maxWidth = button_rad;
        button.style.maxHeight = button_rad;
    });

    //write helper formula to top of overlay
    document.getElementById("hint").innerHTML = "(Hint: What is " + globalGamePosition + spinner.getIndicatedSegment().text + "?)";
}

//function to turn off the button-check overlay
function overlayOff() {
    document.getElementById("overlay").style.display = "none";
}

//function for what happens when a button is clicked
function buttonClick(buttonID){
    let currentPosition = globalGamePosition;
    globalGamePosition += parseInt(spinner.getIndicatedSegment().text);

    //check for correct answer, and adjust global position to match
    if(document.getElementById(buttonID).textContent == globalGamePosition){
        if(players[current_player].bonus != 0){
            if(players[current_player].bonus > 0){
                document.getElementById("bonus").innerHTML = '+' + players[current_player].bonus;
            } else if(players[current_player].bonus < 0){
                document.getElementById("bonus").innerHTML = players[current_player].bonus;
            }
            document.getElementById("bonus_div").style.display = "block";

            globalGamePosition += players[current_player].bonus;
        }
    } else {
        //adjust global position to match mistake, meant to keep gameplay smooth after an incorrect answer is given instead of having players adjust to what the game position should be
        //this can be changed in the future if playtesting shows that this hinders learning
        //could be changed to a system that has players adjust to the correct answer to facilitate better learning
        globalGamePosition = parseInt(document.getElementById(buttonID).textContent);
    }

    //reward coins if picked up, adding the coin value to the player's bonus total
    for (let i = 0; i < coins.length; i++){
        if (coins[i].collected == false){
            if ((globalGamePosition >= coins[i].position && currentPosition <= coins[i].position) || (globalGamePosition <= coins[i].position && currentPosition >= coins[i].position)){
                coins[i].collected = true;
                if (current_player % 2 == 0) {
                    players[current_player].bonus += coins[i].value;
                } else {
                    players[current_player].bonus -= coins[i].value;
                }
            }
        }
    }

    overlayOff();

    //change current player to the next player, has support for any number of consecutive players
    current_player++;
    if (current_player >= players.length){
        current_player = 0;
    }
    document.getElementById("currentplayer").innerText = players[current_player].name + "'s turn";

    //prepare spinner for next spin
    randomizeSpinnerVals(current_player, spinnerVals);
    spinner.draw();
    clickable = true;
    drawPointer(clickable);

    //check for winner and display win_overlay if someone has met their win condition
    if (globalGamePosition <= document.getElementById("player1_goal").innerHTML) {
        clickable = false;
        document.getElementById("winner_text").innerHTML = players[0].name + " wins!!";
        document.getElementById("win_overlay").style.display = "flex";
    } else if (globalGamePosition >= document.getElementById("player2_goal").innerHTML) {
        clickable = false;
        document.getElementById("winner_text").innerHTML = players[1].name + " wins!!";
        document.getElementById("win_overlay").style.display = "flex";
    }
}

//function for setting the range of values for what the answers could be
function createButtonVals(actualGamePosition){
    let pos_checks = [];
    pos_checks.push(actualGamePosition)
    let pos_mods = [-5,-4,-3,-2,-1,1,2,3,4,5] //values to modify the actual answer by to make the players actually have to figure it out, could be improved
    for (let i = 0; i < 2; i++){
        pos_checks.push(actualGamePosition + getRandom(pos_mods));
    }

    //assign chosen values to random buttons so the correct answer isn't always on the same button
    document.getElementById("B1").textContent = getRandom(pos_checks);
    document.getElementById("B2").textContent = getRandom(pos_checks);
    document.getElementById("B3").textContent = getRandom(pos_checks);
}

//function from www.codevscolor.com, used to get a random value from an array
const getRandom = (arr) => {
    var randInt = ~~(Math.random() * arr.length);
    var output = arr[randInt];
    arr.splice(randInt, 1); //remove used element from array
    return output;
};