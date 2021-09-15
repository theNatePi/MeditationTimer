
// this function handles the actual timer, the outer_function is the function executed when you start the timer
function outer_function() {
    function alert_function() {
        clearTimeout();
        // checking if the user provided a time for the timer
        if (!isNaN(length)) {
            if (proceed === true) {
                alert("Great job, it's time to meditate! Sit back, get some water, and when you come back to work just click ok.\nTo stop the timer, go to the extension in the top right");
                // will repeat the function depending on the length the user provided
                setTimeout(alert_function, length_mill);
            } else {
                // if proceed != true clear the loop and stop the timer
                clearTimeout();
            }
        } else {
            alert("You didnt provide a time for the reminder")
        }
        // after this function is defined, turn the amount of minutes the user provided into milliseconds
        length_mill = length * 60000;
    }
    // call the function
    alert_function();
    // after the function is called the first time, now set proceed to true. The function had to be called to check if a timer was provided
    proceed = true;
    if (!isNaN(length)) {
        alert("Your timer is starting!")
        setTimeout(alert_function, length_mill);
    }
}

// This is the script inserted to end the loop
function outer_end_function() {
    // function to end the loop
    function end_script() {
        clearTimeout();
        var id = window.setTimeout(function() {}, 0);
        while (id--) {
            window.clearTimeout(id);
        }
        proceed = false;
        length = NaN
    }
    // running the function
    end_script();
}

// Function to prompt for the time
function outer_start_function() {
    function start_script() {
        length = prompt("How many minutes do you want in between reminders?", "30");
        length = parseFloat(length)
        proceed = false;
    }
    start_script();
}

// Following functions insert the outer functions into the file of the website
function start() {
    chrome.tabs.query({ active: true }, function (tabs) {
        let tab = tabs[0];
        chrome.scripting.executeScript(
            {
                target: { tabId: tab.id },
                function: outer_function,
            }
        );
    });
}

function end_loop() {
    chrome.tabs.query({ active: true }, function (tabs) {
        let tab = tabs[0];
        chrome.scripting.executeScript(
            {
                target: { tabId: tab.id },
                function: outer_end_function,
            }
        );
    });
}

function starting() {
    chrome.tabs.query({ active: true }, function (tabs) {
        let tab = tabs[0];
        chrome.scripting.executeScript(
            {
                target: { tabId: tab.id },
                function: outer_start_function,
            }
        );
    });
}

// calls each of the functions when the buttons are clicked
document.getElementById("test1").addEventListener("click", start);
document.getElementById("test2").addEventListener("click", end_loop);
document.getElementById("test3").addEventListener("click", starting);
