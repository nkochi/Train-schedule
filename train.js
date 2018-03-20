// Initialize Firebase
var config = {
  apiKey: "AIzaSyC2vO0seCC5OP2FFPCYTZqS6pieGMki1A8",
  authDomain: "trains-78191.firebaseapp.com",
  databaseURL: "https://trains-78191.firebaseio.com",
  projectId: "trains-78191",
  storageBucket: "trains-78191.appspot.com",
  messagingSenderId: "952281097288"
};

firebase.initializeApp(config);
var database = firebase.database();

$("#submit").on("click", function (event) {
  event.preventDefault();

  var trainName = $("#trainName-input").val().trim();
  var destination = $("#destination-input").val().trim();
  var firstTrain = moment($("#train-input").val().trim(),"HH:mm").subtract(10, "years").format("X");
  var frequency = $("#frequency-input").val().trim();

  var newTrian = {
    name: trainName,
    dest: destination,
    first: firstTrain,
    freq: frequency
  };

  database.ref().push(newTrian);

  

  console.log(newTrian.name);
  console.log(newTrian.dest);
  console.log(newTrian.first);
  console.log(newTrian.freq);

  alert("Train successfully added");

  // Clears all of the text-boxes
  $("#trainName-input").val("");
  $("#destination-input").val("");
  $("#train-input").val("");
  $("#frequency-input").val("");
});

database.ref().on("child_added", function (Snapshot, prevChildKey) {

  //console.log(Snapshot.val());

  var trainName = Snapshot.val().name;
  var firstTrain = Snapshot.val().first;
  var frequency = Snapshot.val().freq;
  var destination = Snapshot.val().dest;

  console.log(trainName);
  console.log(destination);
  console.log(firstTrain);
  console.log(frequency);

  var differenceTimes = moment().diff(moment.unix(firstTrain), "minutes"); 
	var remainder = moment().diff(moment.unix(firstTrain), "minutes") % frequency;
	var minutes = frequency - remainder;

	var arrival = moment().add(minutes, "m").format("hh:mm A"); 
	//	console.log(minutes);
		//console.log(arrival);

		console.log(moment().format("hh:mm A"));
		//console.log(arrival);
		console.log(moment().format("X"));

		// Append train data to table 
		$("#train-table > tbody").append("<tr><td>" + trainName + "</td><td>" + destination + "</td><td>" + frequency + "</td><td>" + arrival + "</td><td>" + minutes + "</td></tr>");

	});
//});