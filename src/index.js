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

class Soundboard extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			animated: Array(sounds.length).fill(false),
			query: "",
			displayed: Array(sounds.length).fill(true)
		}
	}

	generateSlider(i) {
		console.log(this.props.boards[i].soundVolume.gain.value);
		let volume = this.props.boards[i].soundVolume.gain.value * AUDIO_SENSITIVITY;
		return (
			<SoundSlider 
				volume={volume}
				onChange={(event) => this.props.onChange(i, event)}
			/>
		)
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
			animated: Array(sounds.length).fill(false),
			query: "",
			displayed: Array(sounds.length).fill(true)
		})
	}

	handleChange(event) {
		let displayed = Array(sounds.length).fill(true);

		for (let i = 0; i < sounds.length; i++) {
			if (!this.props.boards[i].name.toLowerCase().includes(event.target.value.toLowerCase())) {
				displayed[i] = false;
			}
		}

		this.setState({
			query: event.target.value,
			displayed: displayed 
		});
	}

	handleSubmit(event) {
		event.preventDefault();

		let displayed = Array(sounds.length).fill(true);

		for (let i = 0; i < sounds.length; i++) {
			if (!this.props.boards[i].name.toLowerCase().includes(this.state.query)) {
				displayed[i] = false; 
			}
		}

		this.setState({
			query: this.state.query.toLowerCase(),
			displayed: displayed
		});
	}

	render() {
		return (
			<div>
				<div className="reset-wrapper">
					<form onSubmit={(event) => this.handleSubmit(event)}>
						<input 
							type="text" 
							className="form-control search" 
							placeholder="Search..."
							value={this.state.query}
							onChange={(event) => this.handleChange(event)}
						/>
					</form>
					<button type="button" className="btn btn-primary btn-lg" onClick={() => {this.reset()}}>
						Reset sounds 
					</button>
				</div>
				<div className="soundboard">
					{/* Adding playing sounds to a separate soundtrack */}
					<ul className="list-group soundboard-container">
						<p> Playing... </p>
						{this.props.boards.map((val, step) => {
							const isPlaying = this.props.boards[step].playing;

							if (this.state.animated[step] && this.state.displayed[step]) {
								return(
									<li
										className={
											`playing-slider list-group-item ${val.name.toLowerCase()}-animated ${isPlaying ? "slide-in-animation" : "slide-out-animation"}`
										}
										key={step}>
										<p className="sound-title"> {val.name} </p>
										<button 
											onClick={() => this.handleClick(step)}>
											{
												this.props.boards[step].playing ? '⏸️' : '▶️'
											}
										</button>  

										{this.generateSlider(step)}
									</li>
								);
							} else {
								return(null);
							}
						})}
					</ul>
					<ul className="list-group soundboard-container">
						{/* Adding objects to the soundboard */}
						<p> Available Boards </p>
						{this.props.boards.map((val, step) => {
							const isPlaying = this.props.boards[step].playing;
							
							if (this.state.animated[step] || !this.state.displayed[step]) {
								return(null);
							} else {
								// Adds sound if it isn't playing
								return(
									<li 
										className = {
											`sound-slider list-group-item ${val.name.toLowerCase()}-still ${isPlaying ? "slide-out-animation" : "slide-in-animation"}`
										}
										key={step}>
										<p className="sound-title"> {val.name} </p>
										<button 
											onClick={() => this.handleClick(step)}>
											{
												this.props.boards[step].playing ? '⏸️' : '▶️'
											}
										</button>  

										{this.generateSlider(step)}
									</li>
								);
							}
						})}
					</ul>
				</div>
			</div>
		);
	}
}

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
				<div className="jumbotron jumbotron-fluid">
					<div className="container">
						<h1 className="display-4">
							D&D Soundboard
						</h1>
						<p className="lead">
							Adjust volume below
						</p>
					</div>
				</div>
				<Soundboard
					boards={this.state.sound}
					onChange={(i, event) => this.onSliderChange(i, event)}
					onClick={(i) => this.handleClick(i)}
					reset={() => this.reset()}
				/>
			</div>
		);
	}
}

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