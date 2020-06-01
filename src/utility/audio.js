// Returns the name of the mp3 file from import 
const getMP3Name = (importName) => {
	return importName.split("/")[4].split(".")[0];
}

const createInstantSound = (src) => {
	let audio = new Audio(src);
	audio.volume = 0.8;

	const soundElement = {
		sound: audio,
		volume: 100,
		name: getMP3Name(src),
		playing: false
	}

	return soundElement;
}

const createAudioElement = (src) => {
	let audio = new Audio(src);
	audio.loop = true; 
	audio.volume = 1;

	return {
		sound: audio,
		volume: 100,
		name: getMP3Name(src),
		playing: false
	}
}

export { createInstantSound, createAudioElement, getMP3Name }