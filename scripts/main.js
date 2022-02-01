//start the title track tile shower when the page is ready
document.addEventListener("DOMContentLoaded", function(){
	getMetaData();

	audioTag = document.querySelector("audio");
	audioTag.load();
	audioTag.play();
})

//function for getting, parsing, and displaying the track info
function getMetaData() {
	//fetch the server info
	fetch("https://radio.ngrok.io/status-json.xsl").then( res => {
		//parse the json from the server
		res.json().then( json => {
			//display the track title
			document.querySelector("#trackTitle").innerHTML = "NOW PLAYING: " + json.icestats.source.title;
		})
	})
	setTimeout(getMetaData,5000);
};
function getArtwork () {
	
}

