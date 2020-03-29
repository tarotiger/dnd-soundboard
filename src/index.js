import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import Available from './components/available.js';
import Playing from './components/playing.js';
import Utility from './utility/audio.js';
import SoundboardContainer from './container.js';

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
import megu from './assets/Megumin.mp3';
import explosion from './assets/Explosion.mp3';
import cheer from './assets/Cheer.mp3';

const sounds = [rain, fire, cave, night, festival, haunted, combat, thunder, carriage, goblincave, lostmine, woodland, tavernmusic, medievaltown, tavern, boss];
const AUDIO_SENSITIVITY = 100 / 3; 

// SOUND CATEGORIES 
const instant = [sword, megu, explosion, cheer];
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

class Start extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			start: false 
		}
	}

	startSoundboard() {
		this.setState({
			start: true
		});
	}
	
	render() {
		return(
			<React.Fragment>
				{this.state.start ? (
					<Board />
				) : (
					<div className="start-button">
						<p className="text-center welcome">Welcome to dnd-soundboard</p>
						<div>
							<button 
								className="btn btn-primary btn-lg" 
								onClick={() => this.startSoundboard()}> 
									Begin soundboard
							</button>
						</div>
					</div>
				)}
			</React.Fragment>
		)
	}
	
}

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
				sound.push(Utility.createAudioElement(sounds[i]));
			}
		} else {
			storedSound = JSON.parse(storedSound);
			console.log(storedSound);
			for (let i = 0; i < sounds.length; i++) {
				let audioElement = Utility.createAudioElement(sounds[i]);

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

	pauseSound(i) {
		let sound = this.state.sound.slice();

		sound[i].sound.pause();
		sound[i].playing = false;

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
			sound.push(Utility.createAudioElement(sounds[i]));
		}

		localStorage.setItem('sound', JSON.stringify(sound));
		this.setState({
			sound: sound
		})
	}

	render() {
		return (
			<SoundController
				boards={this.state.sound}
				onChange={(i, event) => this.onSliderChange(i, event)}
				onClick={(i) => this.handleClick(i)}
				reset={() => this.reset()}
				pauseSound={(i) => this.pauseSound(i)}
			/>		
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
					pauseSound={(i) => this.props.pauseSound(i)}
				/>
			</div>
		);
	}
}

class Soundboard extends React.Component {
	constructor(props) {
		super(props);

		let animated = Array(sounds.length).fill(false);

		this.state = {
			animated: animated
		}
	}

	openSoundSlider(i) {
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

	closeSoundSlider(i) {
		this.props.pauseSound(i);
		let animated = this.state.animated.slice();

		animated[i] = !animated[i];

		this.setState({
			animated: animated
		})
	}

	reset() {
		this.props.reset();
		
		this.setState({
			animated: Array(sounds.length).fill(false)
		})
	}

	onSwipeLeft(event, i) {
		this.props.pauseSound(i);

		let animated = this.state.animated.slice();

		animated[i] = !animated[i];

		this.setState({
			animated: animated
		})
	}

	playInstant(sound) {
		sound.sound.play();
	}

	render() {
		let numPlaying = 0; 
		let availableSound = [];


		// Counts the number of tracks currently playing 
		this.state.animated.forEach((element) => {
			if (element === true) {
				numPlaying++;
			}
		})

		return (
			<div className="main">
				<header className="navbar navbar-expand flex-column flex-md-row bd-navbar">
					<div className="navbar-container-left">
						<div 
							onClick={() => this.reset()}
							className="logo"></div>
						<p className="nav-title font-weight-normal"> D&D Soundboard <span className="author-title"> github.com/kenxmel </span></p>
					</div>
					<div className="navbar-container-right">
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
					<Playing.SoundboardContainer>
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
									<Playing.Soundboard
										animated={this.state.animated[step]}
										playing={isPlaying}
										name={val.name}
										handleClick={() => this.props.onClick(step)}
										handleSoundSlider={() => this.closeSoundSlider(step)}
										volume={volume}
										step={step}
										onChange={(i, event) => this.props.onChange(i, event)}>
									</Playing.Soundboard>
								);
							} else {
								return(null);
							}
						})}
					</Playing.SoundboardContainer>
					<Available.SoundboardContainer>
						<React.Fragment>
							<Available.InstantTitle name={"Instant"} />
							<ul className="icon-container instant-container">
								{instant.map((val, step) => {
									availableSound = [];

									const instantSound = Utility.createInstantSound(val);
									
									return(
										<Available.IconContainer
											name={instantSound.name}
											handleClick={() => this.playInstant(instantSound)}
											step={instantSound.name}>
										</Available.IconContainer>
									)
								})}
							</ul>
						</React.Fragment>
						
						{Object.keys(soundsCategory).map((key, step) => {
							availableSound = [];
							soundsCategory[key].map((soundimport, i) => {
								let sound;
								let index;

								for (let j = 0; j < this.props.boards.length; j++) {
									if (this.props.boards[j].name === Utility.getMP3Name(soundimport)) {
										sound = this.props.boards[j];
										index = j; 
										break; 
									}
								}

								if (!this.state.animated[index] && this.props.displayed[index]) {
									availableSound.push(
									<Available.IconContainer
										name={sound.name}
										handleClick={() => this.openSoundSlider(index)}
										step={index}>
									</Available.IconContainer>)
								}
								return(null);
							}) 
							// No sound for the category is playing 
							if (availableSound.length === 0) {
								return(null);
							}

							return(
								<React.Fragment>
									<Available.CategoryTitle name={key}></Available.CategoryTitle>
									<ul className="icon-container">
										{availableSound}
									</ul>
								</React.Fragment>
							);
						})}
					</Available.SoundboardContainer>
				</SoundboardContainer>
			</div>		
		);
	}
}

ReactDOM.render(
	<Start />,
	document.getElementById('root')
)