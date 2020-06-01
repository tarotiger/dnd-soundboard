// Returns the name of the mp3 file from import 
const getMP3Name = (importName) => {
	return importName.split("/")[4].split(".")[0];
}

const createInstantSound = (src) => {
	// Dynamically generate audio elements 
	let audioDOM = document.createElement("audio");
	audioDOM.src = src;
	audioDOM.type = "audio/*";

	// Uses Web Audio API to increase volume sensitivity 
	const audio = new AudioContext();
	const track = audio.createMediaElementSource(audioDOM);
	track.loop = true;

	const gainNode = audio.createGain();
	gainNode.gain.value = 1.5;

	track.connect(gainNode);
	gainNode.connect(audio.destination);

	const soundElement = {
		sound: audioDOM,
		soundVolume: gainNode,
		soundContext: audio,
		volume: 100,
		name: getMP3Name(src)
	}

	return soundElement;
}

const createAudioElement = (src) => {
	let audio = new Audio(src);
	audio.loop = true; 
	audio.volume = 0.5;

	return {
		sound: audio,
		volume: 50,
		name: getMP3Name(src),
		playing: false
	}
}

export { createInstantSound, createAudioElement, getMP3Name }