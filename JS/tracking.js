// THE STOPWATCH CODE SECTION
var seconds = 0;
var minutes = 0;
var timerID;

// Timer Section:

function updateStopwatch() {
    seconds++;

    // Check if the minute or hour needs to be incremented
    if (seconds >= 60) {
        seconds = 0;
        minutes++;
    }

    // Format the time
    let time = `${minutes
        .toString()
        .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;

    // Display the time in the HTML element
    document.getElementById("time-var").textContent = time;
};

var listOfExercises = [
    "20 PUSH-UPs",
    "15 SQUATS",
    "16 LUNGES",
    "22 JUMPING JACKS",
    "20 HIGH KNEES",
    "10 BURPEES",
    "FINISHED",
];

// THE CURRENT & NEXT CODE SECTION
var curIndex = 0;

function setCurrentValue() {
    document.getElementById("current-var").textContent = listOfExercises[curIndex];
};

function setNextValue() {
    document.getElementById("next-var").textContent = listOfExercises[curIndex + 1];
};

function getNextAction() {
    setCurrentValue();
    setNextValue();

    curIndex++;
    if (curIndex == listOfExercises.length) {
        window.location.href = "./result.html";
        caloriesCounter().stopCounting();
        heartrateCount().stopBpmCount();
        clearInterval(timerID);
    }
};

document.getElementById("next-button").addEventListener("click", getNextAction);

// HEARTRATE SECTION
// var heartrate = 70;
// var signHeartRate = 1;
// const minHeartate = 80;
// const maxHeartRate = 160;


// function heartrateCount() {
//     let HRTimeID;

//     var incrementHeartrate = () => Math.floor(Math.random() * 7) + 1;

//     const updateHeartRate = () => {


//         if (signHeartRate == 1) {
//             if ((heartrate + 7) < maxHeartRate) {
//                 heartrate += signHeartRate * incrementHeartrate();
//             }
//             else {
//                 signHeartRate *= -1;
//                 heartrate += signHeartRate * incrementHeartrate();
//             }
//         }
//         else {
//             if ((heartrate - 7) < minHeartate) {
//                 heartrate += signHeartRate * incrementHeartrate();
//             }
//             else {
//                 signHeartRate *= -1;
//                 heartrate += signHeartRate * incrementHeartrate();
//             }
//         }

//         console.log(heartrate);
//         document.getElementById("heartrate-var").textContent = heartrate.toString();
//     };

//     const startBpmCount = () => {
//         updateHeartRate();
//         HRTimeID = setInterval(updateHeartRate, 1000);

//     };

//     const stopBpmCount = () => { clearInterval(HRTimeID) };

//     return { startBpmCount, stopBpmCount };

// };

// start bij 70
// increment met 1 to 4
// 120 threshold - random range -4 to +4
// maxlimit 160
var heartrate = 70;
const maxHeartRate = 160;

function updateHeartrate() {
    if (heartrate < 120) {
        heartrate = heartrate + Math.floor(Math.random() * 3) + 1;
    }
    else if (heartrate >= 120 && heartrate < maxHeartRate) {
        heartrate = heartrate + Math.floor(Math.random() * 9) - 4;
    }
    else if (heartrate >= maxHeartRate) {
        heartrate = heartrate - 5;
    }

    document.getElementById("heartrate-var").textContent = heartrate.toString() + " BPM";
};


var vo2Var = 40;
const maxVo2Var = 70;

function updateVo2() {
    if (vo2Var < 50) {
        vo2Var = vo2Var + Math.floor(Math.random() * 2) + 1;
    }
    else if (vo2Var >= 50 && vo2Var < maxVo2Var) {
        vo2Var = vo2Var + Math.floor(Math.random() * 5) - 2;
    }
    else if (vo2Var >= maxVo2Var) {
        vo2Var = vo2Var - 5;
    }

    document.getElementById("vo2-var").textContent = vo2Var.toString() + " mL/kg/min";
};

// Calories Counter Section:
var calCount = 0;

function caloriesCounter() {

    let timeID;
    //2 - to 5 calories per minute
    var randomIncrement = () => Math.floor(Math.random() * 3) + 2; // Generates random number between 2 and 5

    const incCalories = () => {
        calCount += randomIncrement();
        document.getElementById("calories-var").textContent = calCount.toString() + " kcal";
    };

    const startCounting = () => {
        incCalories();
        timeID = setInterval(incCalories, 10000);       // Counts every 60 seconds. 
    };

    const stopCounting = () => {
        clearInterval(timeID);
    };
    return { startCounting, stopCounting };

};

function timerCounter() {
    var currentTimer = minutes;
    var goalTimer = 20;

    document.getElementById("timer-var").textContent = currentTimer.toString() + "/" + goalTimer.toString() + " min";
};

function updateCaloriesBar() {
    //The 150 value is the GOAL of the calories burned 
    const calCountPercent = Math.floor((calCount / 150) * 100);
    const countString = calCountPercent.toString();
    const widthText = "width: " + countString + "%";

    const calorieBar = document.getElementById("calories-bar");
    calorieBar.setAttribute("aria-valuenow", countString);
    calorieBar.setAttribute("style", widthText);
}

function updateVo2Bar() {
    const vo2Percent = Math.floor((vo2Var / 90) * 100);
    const percentString = vo2Percent.toString();
    const widthText = "width: " + percentString + "%";

    const vo2Bar = document.getElementById("vo2-bar");
    vo2Bar.setAttribute("aria-valuenow", percentString);
    vo2Bar.setAttribute("style", widthText);
}

// TIMER FUNCTION
function updateTimerBar() {
    const totalTime = minutes * 60 + seconds;
    //The 1200 value is the GOAL of the duration of the workout set
    const minPercent = Math.floor((totalTime / 1200) * 100);
    const timeString = minPercent.toString();
    const widthText = "width: " + timeString + "%";

    const timerBar = document.getElementById("timer-bar");
    timerBar.setAttribute("aria-valuenow", timeString);
    timerBar.setAttribute("style", widthText);
}

function updateHeartrateBar() {
    // The 200 value is the max heartrate. 
    const heartratePercent = Math.floor((heartrate / 200) * 100);
    const rateString = heartratePercent.toString();
    const widthText = "width: " + rateString + "%";

    const calorieBar = document.getElementById("heartrate-bar");
    calorieBar.setAttribute("aria-valuenow", rateString);
    calorieBar.setAttribute("style", widthText);
};


// windows.onload SECTION
window.onload = function () {
    timerID = setInterval(updateStopwatch, 1000); // Update the stopwatch every second

    document.getElementById("current-var").textContent = listOfExercises[curIndex];
    document.getElementById("next-var").textContent = listOfExercises[curIndex + 1];
    curIndex++;


    setInterval(updateHeartrate, 1000);
    setInterval(updateVo2, 1000);
    setInterval(timerCounter, 2000);
    caloriesCounter().startCounting();

    setInterval(updateCaloriesBar, 1000);
    setInterval(updateVo2Bar, 1000);
    setInterval(updateTimerBar, 1000);
    updateHeartrateBar();
    setInterval(updateHeartrateBar, 10000);

};

// To use the caloriesCounter: call startCounting to start, and when workout finished call stopCounting.
// calCount global variable could be use to display the number of calories burned