nowPlaying = "null - null"
//start the title track tile shower when the page is ready
document.addEventListener("DOMContentLoaded", function(){
	getMetaData();

	//query the doc tags
	audioTag = document.querySelector("audio");
	button = document.querySelector("#playPause")
	volume = document.querySelector("#volume")

	//setup the volume slider
	volume.addEventListener("input", function() {
		audioTag.volume = volume.value / 100;
	})

	//setup the play button
	button.addEventListener("click", function(){
		if (audioTag.paused) {
			audioTag.play();
		} else {
			audioTag.pause();
		}
		updateButton();
	})

	//setup the play button auto update
	audioTag.addEventListener("playing", updateButton);
	audioTag.addEventListener("pause", updateButton);
	
	//I HAVE NO CLUE HOW THIS FIXES THE SAFARI BUG BUT WHATEVER IT WORKS NOW
	//setTimeout(startPlayback,500);
	// ??NO??
})

//button update function
function updateButton() {
	console.log("yes")
	button = document.querySelector("#playPause")
	if (audioTag.paused) {
		button.innerHTML = "Play"
	} else {
		button.innerHTML = "Pause"
	}
}
//load the audio and play it to get around the safari infiload bug
function startPlayback() {
	audioTag = document.querySelector("audio");
	audioTag.load();
	audioTag.play();
}

//function for getting, parsing, and displaying the track info
function getMetaData() {
	//fetch the server info
	fetch("https://radio.ngrok.io/status-json.xsl").then( res => {
		//parse the json from the server
		res.json().then( json => {
			//display the track title
			document.querySelector("#trackTitle").innerHTML = "NOW PLAYING: " + json.icestats.source.title;
			//add the title to the audio player
			document.querySelector("audio").title = "MOCRD RADIO - " + json.icestats.source.title;

			//fuck it, constant albumn art check
			getArtwork();
		})
	})
	setTimeout(getMetaData,5000);
};
function getArtwork () {
	fetch("https://iceimagegen.ngrok.io/art").then( res => {
		console.log(res);
		res.text().then( text => {
			console.log(text);
			if (text == "no art") {
				document.querySelector("#albumArt").src = "images/noArt.png";
			} else {
				document.querySelector("#albumArt").src = text;
			}
		})
	});
}

