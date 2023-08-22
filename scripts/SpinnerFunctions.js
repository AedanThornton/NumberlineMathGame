//function to create the list of spinner values
function createSpinnerVals(spinnerVals){
    spinnerVals.push(1,1,1,2,2,2,3,3,4,4,5,6,7,8);
}

//function to randomize which numbers display on the spinner
function randomizeSpinnerVals(current_player, spinnerVals){
    for (i = 1; i < spinner.segments.length; i++){
        var randInt = parseInt((Math.random() * (spinnerVals.length - 1)), 10);
        var randNeg = Math.random();
        //var negDist = 0.5; //% of vals that should be negative
        //if (randNeg < negDist){
        if (current_player == 1) {
            spinner.segments[i].text = "-" + spinnerVals[randInt];
        } else {
            spinner.segments[i].text = "+" + spinnerVals[randInt];
        }
    }
    
    let sum = 0;
    for (i = 0; i < spinnerVals.length; i++){
        sum += spinnerVals[i];
    }

    for (i = 0; i < spinnerVals.length; i++){
        if (spinnerVals[i] > sum/spinnerVals.length){
            spinnerVals[i] += Math.ceil(Math.random());
        }
    }
}

//function to determine what happens after each frame is drawn
function afterDraw(clickable){
    drawPointer(clickable);
}

//function to determine what happens after the wheel finishes spinning
function postSpin(){
    spinner.rotationAngle = spinner.getRotationPosition();

    let landed_segment_val = parseInt(spinner.getIndicatedSegment().text);

    createButtonVals(globalGamePosition + landed_segment_val);

    overlayOn();

    drawPointer(clickable);
}

//function to draw the pointer at the top of the canvas
function drawPointer(clickable){
    if (clickable) {
        tx.strokeStyle = '#000000';
        tx.fillStyle = '#EEEEEE';
    } else {
        tx.strokeStyle = '#990000';
        tx.fillStyle = 'red';
    }
    tx.lineWidth = 2;
    tx.beginPath();
    tx.moveTo(w/2 - w/32, 0);
    tx.lineTo(w/2 + w/32, 0);
    tx.lineTo(w/2 + w/32, w/10);
    tx.lineTo(w/2, w/6);
    tx.lineTo(w/2 - w/32, w/10);
    tx.lineTo(w/2 - w/32, 0);
    tx.stroke();
    tx.fill(); 
}

function gameReset(){
    setupGame(difficulty, negatives);
    document.getElementById("win_overlay").style.display = "none";
    clickable = true;
}