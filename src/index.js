import React from 'react';
import ReactDOM from 'react-dom';
import './index.css'
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import rain from './assets/Rain.mp3';
import campfire from './assets/Campfire.mp3';
import cave from './assets/Cave.mp3';
import villageMorn from './assets/Village (morning).mp3';
import villageNight from './assets/Village (night).mp3';
import torch from './assets/Torch.mp3';
import festival from './assets/Festival.mp3';
import haunted from './assets/Haunted.mp3';
import resting from './assets/Resting.mp3';

const sounds = [rain, campfire, cave, villageMorn, villageNight, torch, festival, haunted, resting];

sounds.sort();

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
			in: false
		}
	}

	generateSlider(i) {
		let volume = this.props.boards[i].volume;
		return (
			<SoundSlider 
				volume={volume}
				onChange={(event) => this.props.onChange(i, event)}
			/>
		)
	}

	handleClick(i) {
		this.props.onClick(i);
		this.setState({
			in: !this.state.in
		})
	}

	render() {
		return (
			<div className="soundboard">
				<ul className="list-group soundboard-container">
					{/* Adding objects to the soundboard */}
					<p> Available Boards </p>
					{sounds.map((val, step) => {
						return(
							<li 
								className="sound-slider list-group-item"
								key = {step}>
								<p> {getMP3Name(val)} </p>
								<button 
									onClick={() => this.handleClick(step)}>
									{
										this.props.boards[step].playing ? '⏸️' : '▶️'
									}
								</button>  

								{this.generateSlider(step)}
							</li>
						);
					})}
				</ul>
				{/* Adding playing sounds to a separate soundtrack */}
				<ul className="list-group soundboard-container">
					<p> Playing... </p>
					{this.props.boards.map((val, step) => {
						// Adds sound that is current playing 
						if (this.props.boards[step].playing) {
							return(
								<li
									className="playing-slider list-group-item"
									key={step}>
									<p> {val.name} </p>
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
			</div>
		);
	}
}

class Board extends React.Component {
	constructor(props) {
		super(props);

		let sound = [];
		for (let i = 0; i < sounds.length; i++) {
			let soundObject = {
				sound: new Audio(sounds[i]),
				volume: 50,
				name: getMP3Name(sounds[i]),
				playing: false
			}

			sound.push(soundObject);
		}

		this.state = {
			// Initialises the soundboard 
			sound: sound
		}
	}

	onSliderChange(i, event) {
		let sound = this.state.sound.slice();
		sound[i].volume = event;
		sound[i].sound.volume = event/100;
		this.setState({
			sound: sound
		})
		console.log(sound);
	}

	handleClick(i) {
		let sound = this.state.sound.slice();

		// Toggle audio status 
		if (sound[i].playing) {
			sound[i].sound.pause();
			sound[i].playing = false;
		} else {
			sound[i].sound.loop = true;
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
			let soundObject = {
				sound: new Audio(sounds[i]),
				volume: 50,
				playing: false
			}

			sound.push(soundObject);
		}

		this.setState({
			sound: sound
		})
	}

	render() {
		console.log(rain);
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
				<div className="reset-wrapper">
					<button type="button" className="btn btn-primary btn-lg" onClick={() => {this.reset()}}>
						Reset sounds 
					</button>
				</div>
				<Soundboard
					boards={this.state.sound}
					onChange={(i, event) => this.onSliderChange(i, event)}
					onClick={(i) => this.handleClick(i)}
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

ReactDOM.render(
	<Board />,
	document.getElementById('root')
)