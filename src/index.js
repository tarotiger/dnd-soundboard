import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import rain from './assets/Rain.mp3';
import campfire from './assets/Campfire.mp3';
import cave from './assets/Cave.mp3';
import night from './assets/Night.mp3';
import torch from './assets/Torch.mp3';
import festival from './assets/Festival.mp3';
import haunted from './assets/Haunted.mp3';

const sounds = [rain, campfire, cave, night, torch, festival, haunted];
const ambient = [night, festival, haunted];
const AUDIO_SENSITIVITY = 100 / 3; 

sounds.sort();
ambient.sort();

class Board extends React.Component {
	constructor(props) {
		super(props);

		let sound = [];
		for (let i = 0; i < sounds.length; i++) {
			sound.push(createAudioElement(sounds[i]));
		}

		this.state = {
			// Initialises the soundboard 
			sound: sound
		}
	}

	onSliderChange(i, event) {
		console.log(i);
		let sound = this.state.sound.slice();
		sound[i].soundVolume.gain.value = event / AUDIO_SENSITIVITY;
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

		this.state = {
			animated: Array(sounds.length).fill(false)
		}
	}

	handleClick(i) {
		this.props.onClick(i);

		setTimeout(() => {
			let animated = this.state.animated.slice();
			animated[i] = !animated[i];

			this.setState({
				animated: animated
			})
		}, 450);
	}

	reset() {
		this.props.reset();
		
		this.setState({
			animated: Array(sounds.length).fill(false)
		})
	}

	render() {
		return (
			<div class="main">
				<div className="jumbotron jumbotron-fluid" onClick={() => this.reset()}>
					<div className="container">
						<h1 className="display-4">
							D&D Soundboard
						</h1>
						<p className="lead">
							Click here to reset
						</p>
					</div>
				</div>
				<form onSubmit={(event) => this.props.handleSubmit(event)}>
					<input 
						type="text" 
						className="form-control search" 
						placeholder="Search..."
						value={this.props.query}
						onChange={(event) => this.props.handleChange(event)}
					/>
				</form>
				<SoundboardContainer>
					<AvailableSoundboardContainer>
						{this.props.boards.map((val, step) => {
							const isPlaying = this.props.boards[step].playing;
							const volume = this.props.boards[step].soundVolume.gain.value * AUDIO_SENSITIVITY;

							if (!this.state.animated[step] && this.props.displayed[step]) {
								return(
									<AvailableSoundSliderContainer 
										playing={isPlaying}
										name={val.name}
										handleClick={() => this.handleClick(step)}
										volume={volume}
										step={step}
										onChange={(i, event) => this.props.onChange(i, event)}>
									</AvailableSoundSliderContainer>
								);
							} else {
								return(null);
							}
						})}
					</AvailableSoundboardContainer>
					<PlayingSoundboardContainer>
						{this.props.boards.map((val, step) => {
							const isPlaying = this.props.boards[step].playing;
							const volume = this.props.boards[step].soundVolume.gain.value * AUDIO_SENSITIVITY;

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
			<p>Playing...</p>
			{props.children}
		</ul>
	)
}

function AvailableSoundboardContainer(props) {
	return(
		<ul className="list-group available-soundboard-container">
			<p>Available</p>
			{props.children}
		</ul>
	)
}

// Container for sound sliders 
// Requires props: playing (bool), name(string) 
function PlayingSoundSliderContainer(props) {
	return (
		<li 
			className={"playing-slider list-group-item " + (props.playing ? "slide-in-animation" : "slide-out-animation")}
			key={props.step}>
			<p className={"sound-title"}>{props.name}</p>
			<button
				onClick={() => props.handleClick(props.step)}>
				{props.playing ? '⏸️' : '▶️'}
			</button>
			<SoundSlider 
				volume={props.volume}
				onChange={(event) => props.onChange(props.step, event)}
			/>
		</li>
	)
}

// Container for sound sliders 
// Requires props: playing (bool), name(string) 
function AvailableSoundSliderContainer(props) {
	return (
		<li 
			className={"playing-slider list-group-item " + (props.playing ? "slide-out-animation" : "slide-in-animation")}
			key={props.step}>
			<p className={"sound-title"}>{props.name}</p>
			<button
				onClick={() => props.handleClick(props.step)}>
				{props.playing ? '⏸️' : '▶️'}
			</button>
			<SoundSlider 
				volume={props.volume}
				onChange={(event) => props.onChange(props.step, event)}
			/>
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

// function Reset(props) {
// 	return (
// 		<div className="reset-wrapper">
// 			<button type="button" className="btn btn-primary btn-lg reset" onClick={() => props.reset()}>
// 				Reset sounds 
// 			</button>
// 		</div>
// 	)
// }


// HELPER FUNCTIONS 

// Returns the name of the mp3 file from import 
const getMP3Name = (importName) => {
	return importName.split("/")[3].split(".")[0];
}

const createAudioElement = (src) => {
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