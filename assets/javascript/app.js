// firebase config
var firebaseConfig = {
    apiKey: "AIzaSyAnGXSMsz0EnaGllNMGeoz4XVjneCJJzxI",
    authDomain: "trainschedule-c0c61.firebaseapp.com",
    databaseURL: "https://trainschedule-c0c61.firebaseio.com",
    projectId: "trainschedule-c0c61",
    storageBucket: "trainschedule-c0c61.appspot.com",
    messagingSenderId: "414807725496",
    appId: "1:414807725496:web:1e1bd5a9454a5acf0b2b4d"
};
// Initialize Firebase
firebase.initializeApp(firebaseConfig);
var database = firebase.database();

$(document).ready(
    function trainSchedule() {
        // when submit button click
        $("#submit-button").on("click", function (e) {
            e.preventDefault();
            // get the values from input field
            var trainName = $("#train-name").val().trim();
            console.log(trainName);
            var destination = $("#destination").val().trim();
            console.log(destination);
            var firstTrainTime = $("#first-train-time").val();
            console.log(firstTrainTime);
            var frequency = $("#frequency").val();
            console.log(frequency);

            // pushing multiple lines of data to db
            database.ref().push({
                trainName: trainName,
                destination: destination,
                firstTrainTime: firstTrainTime,
                frequency: frequency,
            })
            // clean out the input field after input
            $("#train-name").val("")
            $("#destination").val("");
            $("#first-train-time").val("");
            $("#frequency").val("");
        });

        // function nextArrivalCalculator(firstTrain) {
        //     firstTrainInput = moment(firstTrainTime, "HH:mm");
        //     var now = moment();
        //     console.log("Now" + now);
        //     var minTillNextArrival = now.diff(firstTrainInput, 'minutes');
        //     console.log("till next arrival" + minTillNextArrival);
        //     var remainingMinutes = minTillNextArrival%frequency;
        //     var minAway = frequency - remainingMinutes
        //     var nextArrival = now.add(minAway, "minutes");
        //     var nextArrivalTime = nextArrival.format("HH:mm");
        // };

        database.ref().on("child_added", function (snapshot) {
            var newRow = $("<tr>").attr("class", "table-warning");
            var trainNameDisplay = $("<td>");
            var destinationDisplay = $("<td>");
            var frequencyDisplay = $("<td>");
            var nextArrivalDisplay = $("<td>");
            var minAwayDisplay = $("<td>");

            firstTrainInput = moment(snapshot.val().firstTrainTime, "HH:mm");
            var now = moment();
            console.log("Now" + now);
            var minTillNextArrival = now.diff(firstTrainInput, 'minutes');
            console.log("till next arrival" + minTillNextArrival);
            var remainingMinutes = minTillNextArrival % frequency;
            console.log ("remainingMinutes" + remainingMinutes);
            var minAway = frequency - remainingMinutes
            console.log ("minAway" + minAway);
            var nextArrival = now.add(minAway, "minutes");
            console.log ("nextArrival" + nextArrival);
            var nextArrivalTime = nextArrival.format("HH:mm");
            console.log ("nextArrivalTime" + nextArrivalTime);

            trainNameDisplay.text(snapshot.val().trainName);
            console.log (snapshot.val().name);
            destinationDisplay.text(snapshot.val().destination);
            frequencyDisplay.text(snapshot.val().frequency + "min");
            nextArrivalDisplay.text(nextArrivalTime);
            minAwayDisplay.text(minAway);
            newRow.append(trainNameDisplay,destinationDisplay,frequencyDisplay,nextArrivalDisplay,minAwayDisplay);
            $(".table-body").append(newRow);
            
            // $("#name-display").text(snapshot.val().name);
        })




    }

);