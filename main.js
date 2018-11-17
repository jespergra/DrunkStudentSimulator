/**
 * A function to wrap it all in.
 */
(function () {
    "use strict";
    var map = [
        "X", "X", "X", "X", "X", "X",
        "X", "0", "0", "0", "0", "X",
        "X", "0", "0", "0", "0", "X",
        "X", "0", "0", "S", "0", "X",
        "X", "0", "0", "0", "0", "X",
        "X", "X", "X", "X", "X", "X"
    ];
    var c = document.getElementById("myCanvas");
    var simulations = document.getElementById("simulations");
    var average = document.getElementById("average");
    var range = document.querySelector('input[type="range"]');
    var ctx = c.getContext("2d");
    var radius = 40,
    studentPos = 21,
    xPos = 460,
    yPos = 480,
    distance = 0,
    totalDistance = 0,
    runs = 0,
    timerId,
    exitCount = [],
    relativeFrequency = [];


    var rangeValue = function(){
      clearInterval(timerId);
      var delay = range.value;
      timerId = setInterval(simulate, delay);
    }

    for (var i = 0; i < map.length; i++) {
        //init 0 for exitCounts and relativeFrequencys
        relativeFrequency.push(0);
        exitCount.push(0);
    }

    function draw() {
        var X = 0;
        var Y = 0;
        for (var i = 0; i < map.length; i++) {
            X += 120;
            if (i % 6 == 0) {
                X = 100;
                Y += 120;
            };
            ctx.beginPath();
            ctx.arc(X, Y, radius, 0, 2 * Math.PI, false);
            ctx.strokeStyle = "black";
            ctx.stroke();
            ctx.fill();

            switch (map[i]) {
                case "X":
                    ctx.fillStyle = "lightgreen";
                    ctx.fill();
                    ctx.beginPath();
                    ctx.fillStyle = "black";
                    ctx.font="25px Calibri";
                    ctx.textAlign = "center";
                    ctx.fillText(relativeFrequency[i], X, Y+10);
                    break;
                case "S":
                    ctx.fillStyle = "red";
                    ctx.fill();
                    ctx.beginPath();
                    ctx.fillStyle = "black";
                    ctx.textAlign="center";
                    ctx.font="25px Calibri";
                    ctx.fillText("PUB", X, Y+8);
                    break;
                default:
                    ctx.fillStyle = "white";
                    ctx.fill();
                    break;
            }
        }
    }
    function simulate() {
        var direction = Math.floor((Math.random() * 4) + 1);
        //for debugging
        var directions = [0, "right", "left", "down", "left"];
        //console.log("direction:" + directions[direction]);
        //console.log(direction);
        switch (direction) {
            case 1:
                xPos += 120;
                studentPos += 1;
                break;
            case 2:
                xPos -= 120;
                studentPos -= 1;
                break;
            case 3:
                yPos += 120;
                studentPos += 6;
                break;
            case 4:
                yPos -= 120;
                studentPos -= 6;
                break;
        }

        distance++;
        draw();
        ctx.beginPath();
        ctx.arc(xPos, yPos, radius, 0, 2 * Math.PI, false);
        ctx.fillStyle = "black";
        ctx.fill();

        if (map[studentPos] == "X") {
            runs++;
            totalDistance += distance;
            simulations.innerHTML = runs;
            average.innerHTML = parseFloat(totalDistance / runs).toFixed(2);
            exitCount[studentPos] += 1;
            relativeFrequency[studentPos] = parseFloat(exitCount[studentPos] / runs).toFixed(2);
            distance = 0;
            xPos = 460;
            yPos = 480;
            studentPos = 21;
        }
    }
    range.addEventListener("input", rangeValue);
})();
