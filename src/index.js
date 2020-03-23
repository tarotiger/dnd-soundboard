import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import rain from './assets/Rain.mp3';
import fire from './assets/Fire.mp3';
import cave from './assets/Cave.mp3';
import night from './assets/Night.mp3';
import festival from './assets/Festival.mp3';
import haunted from './assets/Haunted.mp3';
import combat from './assets/Combat (Plains).mp3';
import thunder from './assets/Thunder.mp3';
import carriage from './assets/Carriage.mp3';
import goblincave from './assets/Goblin Cave.mp3';
import lostmine from './assets/Lost Mine.mp3';
import woodland from './assets/Woodland Campsite.mp3';
import tavernmusic from './assets/Tavern Music.mp3';
import medievaltown from './assets/Medieval Town.mp3';
import tavern from './assets/Tavern.mp3';
import boss from './assets/Boss.mp3';

import sword from './assets/Sword.mp3';

const sounds = [rain, fire, cave, night, festival, haunted, combat, thunder, carriage, goblincave, lostmine, woodland, tavernmusic, medievaltown, tavern, boss];
const instant = [sword];
const AUDIO_SENSITIVITY = 100 / 3; 

// SOUND CATEGORIES 
const nature = [rain, fire, thunder, woodland];
const nighttime = [night, haunted];
const town = [tavernmusic, fire, medievaltown, tavern];
const dungeon = [cave, combat, goblincave, lostmine, boss];
const preset = [festival, combat, night, carriage, lostmine, woodland, tavern, boss];

sounds.sort();
instant.sort();
nature.sort();
nighttime.sort();
dungeon.sort();
preset.sort();
town.sort();

const unorderedSoundsCategory = {
	"nature": nature,
	"nighttime": nighttime,
	"dungeon": dungeon,
	"town": town
}

// Sort the categories alphabetically
const soundsCategory = {}
Object.keys(unorderedSoundsCategory).sort().forEach(function(key) {
	soundsCategory[key] = unorderedSoundsCategory[key];
})

soundsCategory["preset"] = preset; 

class Board extends React.Component {
	constructor(props) {
		super(props);

		localStorage.clear();

		let sound = [];
		let storedSound = localStorage.getItem('sound');

		// No presaved data in browser
		if (storedSound === null) {
			sound = [];
			for (let i = 0; i < sounds.length; i++) {
				sound.push(createAudioElement(sounds[i]));
			}
		} else {
			storedSound = JSON.parse(storedSound);
			console.log(storedSound);
			for (let i = 0; i < sounds.length; i++) {
				let audioElement = createAudioElement(sounds[i]);

				if (storedSound[i].playing) {
					audioElement.sound.play();
				}

				audioElement.playing = storedSound[i].playing;
				audioElement.volume = storedSound[i].volume;
				audioElement.soundVolume.gain.value = storedSound[i].volume/AUDIO_SENSITIVITY;
				sound.push(audioElement);
			}
		}

		this.state = {
			// Initialises the soundboard 
			sound: sound
		}
	}

	onSliderChange(i, event) {
		console.log(i);
		let sound = this.state.sound.slice();
		sound[i].volume = event; 
		sound[i].soundVolume.gain.value = event / AUDIO_SENSITIVITY;
		localStorage.setItem('sound', JSON.stringify(sound));
		this.setState({
			sound: sound
		})
	}

	handleClick(i) {
		let sound = this.state.sound.slice();

		// Check if context is in a suspended state 
		if (sound[i].soundContext === 'suspended') {
			sound[i].soundContext.resume();
		}

		// Toggle audio status 
		if (sound[i].playing) {
			sound[i].sound.pause();
			sound[i].playing = false;
		} else {
			sound[i].sound.play();
			sound[i].playing = true; 
		}
		
		localStorage.setItem('sound', JSON.stringify(sound));
		this.setState({
			sound: sound
		})
	}

	reset() {
		// Pause all sound 
		this.state.sound.forEach(element => {
			element.sound.pause();
		});

		let sound = [];
		for (let i = 0; i < sounds.length; i++) {
			sound.push(createAudioElement(sounds[i]));
		}

		localStorage.setItem('sound', JSON.stringify(sound));
		this.setState({
			sound: sound
		})
	}

	render() {
		return (
			<div>
				<SoundController
					boards={this.state.sound}
					onChange={(i, event) => this.onSliderChange(i, event)}
					onClick={(i) => this.handleClick(i)}
					reset={() => this.reset()}
				/>
			</div>
		);
	}
}

// Slider for soundboard to adjust volume

// Determines which sound sliders are shown 
class SoundController extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			query: "",
			// Keeps track of which soundboard slider is displayed
			displayed: Array(sounds.length).fill(true)
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		
		let query = this.state.query;
		let displayed = Array(sounds.length).fill(true);

		// Checks if audio object has search query in name
		for (let i = 0; i < this.props.boards.length; i++) {
			let matchesSearch = this.props.boards[i].name.toLowerCase().includes(query.toLowerCase());
			if (!matchesSearch) {
				displayed[i] = false;
			}
		}

		this.setState({
			query: query,
			displayed: displayed
		})
	}

	handleChange(event) {
		let query = event.target.value;
		let displayed = Array(sounds.length).fill(true);

		// Checks if audio object has search query in name
		for (let i = 0; i < this.props.boards.length; i++) {
			let matchesSearch = this.props.boards[i].name.toLowerCase().includes(query.toLowerCase());
			if (!matchesSearch) {
				displayed[i] = false; 
			}
		}

		this.setState({
			query: query,
			displayed: displayed
		})
	}

	reset() {
		this.props.reset();

		this.setState({
			query: "",
			displayed: Array(sounds.length).fill(true)
		})
	}

	render() {
		return (
			<div>
				<Soundboard
					boards={this.props.boards}
					onChange={(i, event) => this.props.onChange(i, event)}
					onClick={(i) => this.props.onClick(i)}
					displayed={this.state.displayed}
					reset={() => this.reset()}
					handleSubmit={(event) => this.handleSubmit(event)}
					handleChange={(event) => this.handleChange(event)}
					query={this.state.query}
				/>
			</div>
		);
	}
}

class Soundboard extends React.Component {
	constructor(props) {
		super(props);

		let animated = [];

		for (let i = 0; i < this.props.boards.length; i++) {
			if (this.props.boards[i].playing) {
				animated[i] = true;
			} else {
				animated[i] = false; 
			}
		}

		this.state = {
			animated: animated
		}
	}

	handleClick(i) {
		this.props.onClick(i);
		let animated = this.state.animated.slice();

		if (animated[i]) {
			setTimeout(() => {
				animated[i] = !animated[i];

				this.setState({
					animated: animated
				})
			}, 350);
		} else {
			animated[i] = !animated[i];

			this.setState({
				animated: animated
			})
		}
		
	}

	reset() {
		this.props.reset();
		
		this.setState({
			animated: Array(sounds.length).fill(false)
		})
	}

	render() {
		let numPlaying = 0; 
		let availableSound = [];

		// Counts the number of tracks currently playing 
		this.props.boards.forEach((element) => {
			if (element.playing === true) {
				numPlaying++;
			}
		})

		return (
			<div className="main">
				<header className="navbar navbar-expand flex-column flex-md-row bd-navbar">
					<div 
						onClick={() => this.reset()}
						className="logo"></div>
					<p className="nav-title font-weight-normal"> D&D Soundboard <span className="author-title"> github.com/kenxmel </span></p>
					<div className="navbar-container">
						<form className="search-form" onSubmit={(event) => this.props.handleSubmit(event)}>
							<input 
								type="text" 
								className="form-control search" 
								placeholder="Search..."
								value={this.props.query}
								onChange={(event) => this.props.handleChange(event)}
							/>
						</form>
					</div>
				</header>	
				<SoundboardContainer>
					<AvailableSoundboardContainer>
						{Object.keys(soundsCategory).map((key, step) => {
							availableSound = [];
							soundsCategory[key].map((soundimport, i) => {
								let sound;
								let index;

								for (let j = 0; j < this.props.boards.length; j++) {
									if (this.props.boards[j].name === getMP3Name(soundimport)) {
										sound = this.props.boards[j];
										index = j; 
										break; 
									}
								}

								const isPlaying = sound.playing;
								const volume = sound.soundVolume.gain.value * AUDIO_SENSITIVITY;
								if (!isPlaying && this.props.displayed[index]) {
									availableSound.push(<AvailableSoundSliderContainer 
										playing={isPlaying}
										name={sound.name}
										handleClick={() => this.handleClick(index)}
										volume={volume}
										step={index}
										onChange={(index, event) => this.props.onChange(index, event)}>
									</AvailableSoundSliderContainer>)
								}
								return(null);
							}) 
							// No sound for the category is playing 
							if (availableSound.length === 0) {
								return(null);
							}

							return(
								<React.Fragment>
									<CategoryTitle name={key}></CategoryTitle>
									<ul className="icon-container">
										{availableSound}
									</ul>
								</React.Fragment>
							);
						})}
					</AvailableSoundboardContainer>
					<PlayingSoundboardContainer>
						{this.props.boards.map((val, step) => {
							const isPlaying = this.props.boards[step].playing;
							const volume = this.props.boards[step].soundVolume.gain.value * AUDIO_SENSITIVITY;

							if (step === 0 && numPlaying === 0) {
								return(
									<p className="font-weight-light" key={"no-sound"}> No sounds currently playing... </p>
								);
							}

							if (this.state.animated[step]) {
								return(
									<PlayingSoundSliderContainer 
										playing={isPlaying}
										name={val.name}
										handleClick={() => this.handleClick(step)}
										volume={volume}
										step={step}
										onChange={(i, event) => this.props.onChange(i, event)}>
									</PlayingSoundSliderContainer>
								);
							} else {
								return(null);
							}
						})}
					</PlayingSoundboardContainer>
					
				</SoundboardContainer>
			</div>		
		);
	}
}

// Containment for soundsliders 
function SoundboardContainer(props) {
	return (
		<div className="soundboard">
			{props.children}
		</div>
	)
}

function PlayingSoundboardContainer(props) {
	return(
		<ul className="list-group playing-soundboard-container">
			<p className="soundboard-title">PLAYING</p>
			{props.children}
		</ul>
	)
}

function AvailableSoundboardContainer(props) {
	return(
		<div className="available-soundboard-container">
			<div className="soundboard-container">
				{props.children}
			</div>	
		</div>
	)
}

// Container for sound sliders 
// Requires props: playing (bool), name(string) 
function PlayingSoundSliderContainer(props) {
	return (
		<li 
			className={"playing-slider list-group-item " + (props.playing ? "slide-in-animation" : "slide-out-animation")}
			key={props.name}>
			<p className={"text-left"}>{props.name}</p>
			<img alt={props.name} className="playing-image" src={require("./assets/" + props.name + ".png")} />
			<button
				className="btn"
				onClick={() => props.handleClick(props.step)}>
				<img className="pause-button" alt="pause button" src={require("./assets/pause.png")} />
			</button>
			<div className="slider-container">
				<SoundSlider 
					volume={props.volume}
					onChange={(event) => props.onChange(props.step, event)}
				/>
			</div>	
		</li>
	)
}


// Contains the title of each category
function CategoryTitle(props) {
	return (
		<div className="category-title">
			<p className="soundboard-title"> {props.name} </p>
		</div>
	)
}

// Container for sound sliders 
// Requires props: playing (bool), name(string) 
function AvailableSoundSliderContainer(props) {
	return (
		<li key={props.name}>
			<figure>
				<div 
					className="hover-button"> 
					<img className="play-button" alt="play button" src={require("./assets/play.png")}/> 
				</div>
				<img 
				onClick={() => props.handleClick(props.step)}
				alt="sound" src={require("./assets/" + props.name + ".png")}/>
				<figcaption> {props.name} </figcaption>
			</figure>
		</li>
	)
}

class SoundSlider extends React.Component {
	render() {
		return(
			<Slider
				min={0}
				max={100}
				value={this.props.volume}
				onChange={this.props.onChange}
			/>
		)
	}
}

// Returns the name of the mp3 file from import 
const getMP3Name = (importName) => {
	return importName.split("/")[3].split(".")[0];
}

const createAudioElement = (src) => {
	// Dynamically generate audio elements 
	let audioDOM = document.createElement("audio");
	audioDOM.src = src;
	audioDOM.type = "audio/*";
	audioDOM.addEventListener('ended', function () {
		this.currentTime = 0;
		this.play();
	}, false);

	// Uses Web Audio API to increase volume sensitivity 
	const audio = new AudioContext();
	const track = audio.createMediaElementSource(audioDOM);
	track.loop = true;

	const gainNode = audio.createGain();
	gainNode.gain.value = 1.5;

	track.connect(gainNode);
	gainNode.connect(audio.destination);

	return {
		sound: audioDOM,
		soundVolume: gainNode,
		soundContext: audio,
		volume: 50,
		name: getMP3Name(src),
		playing: false
	}
}

ReactDOM.render(
	<Board />,
	document.getElementById('root')
)