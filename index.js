let homeScore = document.getElementById("home_score");
let guestScore = document.getElementById("guest_score");
let homeFoulCount = document.getElementById("homeFoulCounter");
let guestFoulCount = document.getElementById("guestFoulCounter");

//home score buttons functions
function homeAddOne(){
    homeScore.textContent = parseInt(homeScore.textContent) + 1;
    updateFontColor();
}
function homeAddTwo(){
    homeScore.textContent = parseInt(homeScore.textContent) + 2;
    updateFontColor();
}
function homeAddThree(){
    homeScore.textContent = parseInt(homeScore.textContent) + 3;
    updateFontColor();
}

//guest score buttons functions
function guestAddOne(){
    guestScore.textContent = parseInt(guestScore.textContent) + 1;
    updateFontColor();
}
function guestAddTwo(){
    guestScore.textContent = parseInt(guestScore.textContent) + 2;
    updateFontColor();
}
function guestAddThree(){
    guestScore.textContent = parseInt(guestScore.textContent) + 3;
    updateFontColor();
}
//add foul functions
function homeFoul(){
    homeFoulCount.textContent = parseInt(homeFoulCount.textContent) + 1;//add 1 to the home foul counter
}
function guestFoul(){
    guestFoulCounter.textContent = parseInt(guestFoulCounter.textContent) + 1;//add 1 to the guest foul counter
}
//minus foul functions
function homeFoulMinus(){
    if (parseInt(homeFoulCount.textContent) <= '0') {
        document.getElementById("noHomeFoul").disabled = true;
    }//check if the home foul counter is greater than 0
    else
    homeFoulCount.textContent = parseInt(homeFoulCount.textContent) - 1;//minus 1 to the home foul counter
}

function guestFoulMinus(){
    if (parseInt(guestFoulCounter.textContent) <= '0') {
        document.getElementById("noGuestFoul").disabled = true;
    }//check if the guest foul counter is greater than 0
    else{
        guestFoulCounter.textContent = parseInt(guestFoulCounter.textContent) - 1; //minus 1 to the guest foul counter 
    }
    
}

//Timer function
let timerInterval;
let shotClockInterval;
let remainingTime = 60 * 12; // 12 minutes in seconds
let remainingShotClockTime = 24; // 24 seconds
let mainDisplay = document.getElementById("timer");
let shotClockDisplay = document.getElementById("shotClock");
let pauseButton = document.getElementById("pause-resume");
const initialMainTimerDuration = 720; // 12 minutes in seconds
const initialShotClockDuration = 24;
let quarter = document.getElementById("period");

function startMainTimer(duration, display) {
    let timer = duration, minutes, seconds;
    timerInterval = setInterval(function () {
        minutes = parseInt(timer / 60, 10);
        seconds = parseInt(timer % 60, 10);

        minutes = minutes < 10 ? "0" + minutes : minutes;
        seconds = seconds < 10 ? "0" + seconds : seconds;

        display.textContent = minutes + ":" + seconds;

        if (--timer < 0) {
            timer = duration;   // Reset timer to original duration
            quarter.textContent = parseInt(quarter.textContent) + 1;
            if (quarter.textContent > 4){
                quarter.textContent = '1';
            }
        }

        remainingTime = timer; // Update remaining time
    }, 1000);
}

function startShotClockTimer(duration, shotClockDisplay) {
    let timer = duration, seconds;
    shotClockInterval = setInterval(function () {
        seconds = parseInt(timer % 60, 10);

        seconds = seconds < 10 ? "0" + seconds : seconds;

        shotClockDisplay.textContent = ":" + seconds;

        if (--timer < 0) {
            timer = duration;   // Reset timer to original duration
        }

        remainingShotClockTime = timer; // Update remaining time
    }, 1000);
}

function toggleTimers() {
    if (timerInterval && shotClockInterval) {
        // If timers are running, pause them
        clearInterval(timerInterval);
        clearInterval(shotClockInterval);
        timerInterval = null;
        shotClockInterval = null;
        pauseButton.textContent = "Resume";
    } else {
        // If timers are paused, resume them
        startMainTimer(remainingTime, mainDisplay);
        startShotClockTimer(remainingShotClockTime, shotClockDisplay);
        pauseButton.textContent = "Pause";
    }
}

window.onload = function () {
    let mainDisplay = document.getElementById("timer");
    startMainTimer(remainingTime, mainDisplay);

    let shotClockDisplay = document.getElementById("shotClock");
    startShotClockTimer(remainingShotClockTime, shotClockDisplay);
};
// Reset game function
function newGame() {
    // Reset main timer
    clearInterval(timerInterval);
    startMainTimer(initialMainTimerDuration, mainDisplay);

    // Reset shot clock timer
    clearInterval(shotClockInterval);
    startShotClockTimer(initialShotClockDuration, shotClockDisplay);

    // Reset scores
    homeScore.textContent = '0';
    guestScore.textContent = '0';

    // Reset fouls
    homeFoulCount.textContent = '0';
    guestFoulCounter.textContent = '0';

    //reset quarter
    quarter.textContent = '1';
}
function updateFontColor() {
    const homeElement = document.getElementById('home');
    const guestElement = document.getElementById('guest');
    const homeScore = parseInt(document.getElementById('home_score').textContent);
    const guestScore = parseInt(document.getElementById('guest_score').textContent);

    if (homeScore > guestScore) {
        homeElement.style.color = '#fcd703';
        guestElement.style.color = 'red';
    } else if (guestScore > homeScore) {
        guestElement.style.color = '#fcd703';
        homeElement.style.color = 'red';
    } else {
        homeElement.style.color = '#fff';
        guestElement.style.color = '#fff';
    }
}