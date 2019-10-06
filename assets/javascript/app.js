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

            nextArrivalCalculator();
            // pushing multiple lines of data to db
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
        });

        function nextArrivalCalculator(){
            var now = moment();
            console.log (now);
            // var nextArrival = 

        };
 


    }

);