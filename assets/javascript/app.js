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
        var trainName
        var destination
        var firstTrainTime
        var frequency

        // when submit button click
        $("#submit-button").on("click", function (e) {
            e.preventDefault();
            // get the values from input field
            trainName = $("#train-name").val().trim();
            console.log(trainName);
            destination = $("#destination").val().trim();
            console.log(destination);
            firstTrainTime = $("#first-train-time").val();
            console.log(firstTrainTime);
            frequency = $("#frequency").val();
            console.log(frequency);

            database.ref().push({
                trainName: trainName,
                destination: destination,
                firstTrainTime: firstTrainTime,
                frequency: frequency
            })
            // clean out the input field after input
            $("#train-name").val("")
            $("#destination").val("");
            $("#first-train-time").val("");
            $("#frequency").val("");
        })



    }

);