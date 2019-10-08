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
            var destination = $("#destination").val().trim();
            var firstTrainTime = $("#first-train-time").val().trim();
            var frequency = $("#frequency").val().trim();

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

        database.ref().on("child_added", function (childSnapshot) {
                var newRow = $("<tr>").attr("class", "table-warning");
                var trainNameDisplay = $("<td>");
                var destinationDisplay = $("<td>");
                var frequencyDisplay = $("<td>");
                var nextArrivalDisplay = $("<td>");
                var minAwayDisplay = $("<td>");
                var firstTrain = childSnapshot.val().firstTrainTime;
                var frequency = childSnapshot.val().frequency;

                console.log("trainName: " + childSnapshot.val().trainName);
                console.log("destination: " + childSnapshot.val().destination);
                console.log("firstTrainTime: " + childSnapshot.val().firstTrainTime);
                console.log("frequency: " + childSnapshot.val().frequency);


                // firstTrainInput = childSnapshot.val().firstTrainTime.format("HH:mm");
                // console.log ("firstTrainInput:" + firstTrainInput);

                var now = moment();
                console.log("Now" + now);

                var firstTrainTimeConverted = moment(firstTrain, "HH:mm").subtract(1, "years");
                console.log (firstTrainTimeConverted);

                var minTillNextArrival = now.diff(moment(firstTrainTimeConverted), "minutes");
                console.log("Min till next arrival:" + minTillNextArrival);

                var remainingMinutes = minTillNextArrival % frequency;
                console.log("remainingMinutes" + remainingMinutes);

                var minAway = frequency - remainingMinutes;
                console.log("minAway" + minAway);

                var nextArrival = now.add(minAway, "minutes");
                console.log("nextArrival" + moment(nextArrival).format("hh:mm"));

                var nextArrivalTime = nextArrival.format("HH:mm");
                console.log("nextArrivalTime" + nextArrivalTime);

                trainNameDisplay.text(childSnapshot.val().trainName);
                console.log("Train Name: "+childSnapshot.val().trainName);
                destinationDisplay.text(childSnapshot.val().destination);
                frequencyDisplay.text(childSnapshot.val().frequency + "min");
                nextArrivalDisplay.text(nextArrival.format("HH:mm"));
                minAwayDisplay.text(minAway);
                newRow.append(trainNameDisplay, destinationDisplay, frequencyDisplay, nextArrivalDisplay, minAwayDisplay);
                $(".table-body").append(newRow);

                // $("#name-display").text(snapshot.val().name);
            }, function (errorObject) {
                console.log("Errors:" + errorObject.code);
            }

        )




    }

);