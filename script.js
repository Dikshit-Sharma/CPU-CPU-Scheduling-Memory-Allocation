$(document).ready(function () {
    $("#myBtn").click(function () {
        $("#myModal").modal();
    });

    $("#processForm").submit(function (event) {
        event.preventDefault();
        var numProcesses = parseInt($("#numProcesses").val());
        if (numProcesses > 0) {
            var burstTimeInputs = "";
            for (var i = 1; i <= numProcesses; i++) {
                burstTimeInputs += '<div class="form-group">' +
                    '<label for="burstTime' + i + '"><span>Burst Time for Process ' + i + '</span></label>' +
                    '<input type="text" class="form-control" id="burstTime' + i + '" placeholder="Enter Burst Time">' +
                    '</div>';
            }
            $("#burstTimeInputs").html(burstTimeInputs);
            $("#calculateBtn").prop("disabled", false);
        } else {
            $("#burstTimeInputs").html("");
            $("#calculateBtn").prop("disabled", true);
        }
    });

    $("#calculateBtn").click(function () {
        var numProcesses = parseInt($("#numProcesses").val());
        var burstTimes = [];
        for (var i = 1; i <= numProcesses; i++) {
            var burstTime = parseInt($("#burstTime" + i).val());
            burstTimes.push(burstTime);
        }

        var wt = new Array(numProcesses);
        var tat = new Array(numProcesses);
        wt[0] = 0;
        tat[0] = burstTimes[0];

        for (var i = 1; i < numProcesses; i++) {
            wt[i] = burstTimes[i - 1] + wt[i - 1];
            tat[i] = burstTimes[i] + wt[i];
        }

        var total_wt = wt.reduce((a, b) => a + b, 0);
        var total_tat = tat.reduce((a, b) => a + b, 0);
        var avg_wt = total_wt / numProcesses;
        var avg_tat = total_tat / numProcesses;

        var table = "<h3>Scheduling Result:</h3>" +
            "<table class='table'>" +
            "<tr><th>Process</th><th>Burst Time</th><th>Waiting Time</th><th>Turnaround Time</th></tr>";
        for (var i = 0; i < numProcesses; i++) {
            table += "<tr><td>P" + (i + 1) + "</td><td>" + burstTimes[i] + "</td><td>" + wt[i] + "</td><td>" + tat[i] + "</td></tr>";
        }
        table += "</table><br>";
        table += "<p>Average Waiting Time: " + avg_wt.toFixed(2) + "</p><br>";
        table += "<p>Average Turnaround Time: " + avg_tat.toFixed(2) + "</p>";

        $("#output").html(table);
        $("#output").show(); // Add this line to display the output

        // Close the modal
        //   $("#myModal").modal("hide");
    });
});


$(document).ready(function () {
    // SJF button click event
    $("#sjfBtn").click(function () {
        $("#sjfModal").modal();
    });

    // SJF form submit event
    $("#sjfProcessForm").submit(function (event) {
        event.preventDefault();
        var numProcesses = parseInt($("#numProcessesSJF").val());
        if (numProcesses > 0) {
            var burstTimeInputs = "";
            for (var i = 1; i <= numProcesses; i++) {
                burstTimeInputs += '<div class="form-group">' +
                    '<label for="sjfBurstTime' + i + '"><span>Burst Time for Process ' + i + '</span></label>' +
                    '<input type="text" class="form-control" id="sjfBurstTime' + i + '" placeholder="Enter Burst Time">' +
                    '</div>';
            }
            $("#burstTimeInputsSJF").html(burstTimeInputs);
            $("#calculateSJFBtn").prop("disabled", false);
        } else {
            $("#burstTimeInputsSJF").html("");
            $("#calculateSJFBtn").prop("disabled", true);
        }
    });

    // SJF calculate button click event
    // SJF calculate button click event
    $("#calculateSJFBtn").click(function () {
        // Get the burst times for each process
        var numProcesses = parseInt($("#numProcessesSJF").val());
        var burstTimes = [];
        for (var i = 1; i <= numProcesses; i++) {
            var burstTime = parseInt($("#sjfBurstTime" + i).val());
            burstTimes.push(burstTime);
        }

        // Sort the burst times in ascending order
        burstTimes.sort(function (a, b) {
            return a - b;
        });

        // Calculate average waiting time and average turnaround time
        var wt = new Array(numProcesses);
        var tat = new Array(numProcesses);
        wt[0] = 0;
        tat[0] = burstTimes[0];
        var total_wt = wt[0];
        var total_tat = tat[0];

        // Function to find waiting time and turnaround time of all processes
        for (var i = 1; i < numProcesses; i++) {
            wt[i] = burstTimes[i - 1] + wt[i - 1];
            tat[i] = burstTimes[i] + wt[i];
            total_wt += wt[i];
            total_tat += tat[i];
        }

        // Create table for output
        var table = "<h3>Scheduling Result:</h3>" +
            "<table class='table'>" +
            "<tr><th>Process</th><th>Burst Time</th><th>Waiting Time</th><th>Turnaround Time</th></tr>";

        // Add process details to the table
        for (var i = 0; i < numProcesses; i++) {
            table += "<tr><td>P" + (i + 1) + "</td><td>" + burstTimes[i] + "</td><td>" + wt[i] + "</td><td>" + tat[i] + "</td></tr>";
        }
        table += "</table><br>";

        // Calculate and add average waiting time and turnaround time to the table
        var avg_wt = total_wt / numProcesses;
        var avg_tat = total_tat / numProcesses;
        table += "<p>Average Waiting Time: " + avg_wt.toFixed(2) + "</p><br>";
        table += "<p>Average Turnaround Time: " + avg_tat.toFixed(2) + "</p>";

        // Display table
        $("#outputSJF").html(table);
        $("#outputSJF").show();
    });
});

$(document).ready(function () {
    $("#priBtn").click(function () {
        $("#priModal").modal();
    });

    $("#priprocessForm").submit(function (event) {
        event.preventDefault();
        var numProcesses = parseInt($("#numProcesses").val());
        var inputs = "";
        for (var i = 1; i <= numProcesses; i++) {
            inputs += '<div class="form-group">' +
                '<label for="burstTime' + i + '">Burst Time for Process ' + i + ':</label>' +
                '<input type="number" class="form-control" id="burstTime' + i + '" placeholder="Enter Burst Time">' +
                '</div>';
            inputs += '<div class="form-group">' +
                '<label for="priority' + i + '">Priority for Process ' + i + ':</label>' +
                '<input type="number" class="form-control" id="priority' + i + '" placeholder="Enter Priority">' +
                '</div>';
        }
        $("#inputs").html(inputs);
        $("#calculatepriBtn").prop("disabled", false);
    });

    $("#calculatepriBtn").click(function () {
        var numProcesses = parseInt($("#numProcesses").val());
        var burstTimes = [];
        var priorities = [];
        for (var i = 1; i <= numProcesses; i++) {
            var burstTime = parseInt($("#burstTime" + i).val());
            burstTimes.push(burstTime);
            var priority = parseInt($("#priority" + i).val());
            priorities.push(priority);
        }

        var processIndices = [];
        for (var i = 0; i < numProcesses; i++) {
            processIndices.push(i);
        }

        // Sort the processes based on priority (in ascending order)
        processIndices.sort(function (a, b) {
            return priorities[a] - priorities[b];
        });

        var wt = [];
        var tat = [];
        wt[processIndices[0]] = 0;
        tat[processIndices[0]] = burstTimes[processIndices[0]];

        // Calculate waiting time and turnaround time for each process
        for (var i = 1; i < numProcesses; i++) {
            var currentProcessIndex = processIndices[i];
            wt[currentProcessIndex] = wt[processIndices[i - 1]] + burstTimes[processIndices[i - 1]];
            tat[currentProcessIndex] = wt[currentProcessIndex] + burstTimes[currentProcessIndex];
        }

        var total_wt = 0;
        var total_tat = 0;

        var output = "<h3>Scheduling Result:</h3>" +
            "<table class='table'>" +
            "<tr><th>Process</th><th>Burst Time</th><th>Priority</th><th>Waiting Time</th><th>Turnaround Time</th></tr>";

        for (var i = 0; i < numProcesses; i++) {
            var currentProcessIndex = processIndices[i];
            total_wt += wt[currentProcessIndex];
            total_tat += tat[currentProcessIndex];

            output += "<tr><td>P" + (currentProcessIndex + 1) + "</td><td>" + burstTimes[currentProcessIndex] + "</td><td>" +
                priorities[currentProcessIndex] + "</td><td>" + wt[currentProcessIndex] + "</td><td>" +
                tat[currentProcessIndex] + "</td></tr>";
        }

        output += "</table>";
        var avg_wt = total_wt / numProcesses;
        var avg_tat = total_tat / numProcesses;
        output += "<p><strong>Average Waiting Time:</strong> " + avg_wt.toFixed(2) + "</p>";
        output += "<p><strong>Average Turnaround Time:</strong> " + avg_tat.toFixed(2) + "</p>";

        $("#PRIoutput").html(output);
        $("#PRIoutput").show();
    });
});


$(document).ready(function () {
    $("#rrBtn").click(function () {
        $("#rrModal").modal();
    });

    $("#rrprocessForm").submit(function (event) {
        event.preventDefault();
        var numProcesses = parseInt($("#numProcesses").val());
        var inputs = ''; // Initialize the 'inputs' variable here
        for (var i = 1; i <= numProcesses; i++) {
            inputs += '<div class="form-group">' +
                '<label for="burstTime' + i + '">Burst Time for Process ' + i + ':</label>' +
                '<input type="number" class="form-control" id="burstTime' + i + '" placeholder="Enter Burst Time">' +
                '</div>';
            inputs += '<div class="form-group">' +
                '<label for="priority' + i + '">Priority for Process ' + i + ':</label>' +
                '<input type="number" class="form-control" id="priority' + i + '" placeholder="Enter Priority">' +
                '</div>';
        }
        $("#inputs").html(inputs);
        $("#calculateRRBtn").prop("disabled", false);
        // $("#rrQuantumForm").show();

    });

    $("#calculateRRBtn").click(function () {
        var numProcesses = parseInt($("#numProcesses").val());
        var burstTimes = [];
        for (var i = 1; i <= numProcesses; i++) {
            var burstTime = parseInt($("#burstTime" + i).val());
            burstTimes.push(burstTime);
        }

        var quantum = parseInt($("#rrQuantum").val());

        var remainingTimes = [];
        for (var i = 0; i < numProcesses; i++) {
            remainingTimes.push(burstTimes[i]);
        }

        var time = 0;
        var waitingTimes = [];
        var turnAroundTimes = [];
        var completed = false;

        while (!completed) {
            completed = true;
            for (var i = 0; i < numProcesses; i++) {
                if (remainingTimes[i] > 0) {
                    completed = false;
                    if (remainingTimes[i] > quantum) {
                        time += quantum;
                        remainingTimes[i] -= quantum;
                    } else {
                        time += remainingTimes[i];
                        waitingTimes[i] = time - burstTimes[i];
                        remainingTimes[i] = 0;
                    }
                }
            }
        }

        for (var i = 0; i < numProcesses; i++) {
            turnAroundTimes[i] = waitingTimes[i] + burstTimes[i];
        }

        var totalWaitingTime = 0;
        var totalTurnAroundTime = 0;

        var output = "<h3>Scheduling Result:</h3>" +
            "<table class='table'>" +
            "<tr><th>Process</th><th>Burst Time</th><th>Waiting Time</th><th>Turnaround Time</th></tr>";

        for (var i = 0; i < numProcesses; i++) {
            totalWaitingTime += waitingTimes[i];
            totalTurnAroundTime += turnAroundTimes[i];
            output += "<tr><td>P" + (i + 1) + "</td><td>" + burstTimes[i] + "</td><td>" + waitingTimes[i] + "</td><td>" + turnAroundTimes[i] + "</td></tr>";
        }

        output += "</table>";
        var avgWt = totalWaitingTime / numProcesses;
        var avgTat = totalTurnAroundTime / numProcesses;
    
        output += "<p><strong>Average Waiting Time:</strong> " + avgWt.toFixed(2) + "</p>";
    
        output += "<p><strong>Average Turnaround Time:</strong> " + avgTat.toFixed(2) + "</p>";
    
    
        $("#outputRR").html(output);
        $("#outputRR").show();
    });
});    