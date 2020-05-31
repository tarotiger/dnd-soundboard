import React from 'react'; 
import { AContainer, CategoryTitle, Container, IconContainer, InstantTitle, PContainer, SoundBar } from './items.js';
import { createAudioElement, createInstantSound, getMP3Name } from '../utility/audio.js';

import rain from '../assets/Rain.mp3';
import fire from '../assets/Fire.mp3';
import cave from '../assets/Cave.mp3';
import night from '../assets/Night.mp3';
import festival from '../assets/Festival.mp3';
import haunted from '../assets/Haunted.mp3';
import combat from '../assets/Combat (Plains).mp3';
import thunder from '../assets/Thunder.mp3';
import carriage from '../assets/Carriage.mp3';
import goblincave from '../assets/Goblin Cave.mp3';
import lostmine from '../assets/Lost Mine.mp3';
import woodland from '../assets/Woodland Campsite.mp3';
import tavernmusic from '../assets/Tavern Music.mp3';
import medievaltown from '../assets/Medieval Town.mp3';
import tavern from '../assets/Tavern.mp3';
import boss from '../assets/Boss.mp3';

import sword from '../assets/Sword.mp3';
import megu from '../assets/Megumin.mp3';
import explosion from '../assets/Explosion.mp3';
import cheer from '../assets/Cheer.mp3';

const audio = [rain, fire, cave, night, festival, haunted, combat, thunder, carriage, goblincave, lostmine, woodland, tavernmusic, medievaltown, tavern, boss];

const VolScale = 100 / 3;

// SOUND CATEGORIES 
const instant = [sword, megu, explosion, cheer];
const nature = [rain, fire, thunder, woodland];
const nighttime = [night, haunted];
const town = [tavernmusic, fire, medievaltown, tavern];
const dungeon = [cave, combat, goblincave, lostmine, boss];
const preset = [festival, combat, night, carriage, lostmine, woodland, tavern, boss];

audio.sort();
instant.sort();
nature.sort();
nighttime.sort();
dungeon.sort();
preset.sort();
town.sort();

const unorderedAudioCategory = {
	"nature": nature,
	"nighttime": nighttime,
	"dungeon": dungeon,
	"town": town
}

// Sort the categories alphabetically
const audioCategory = {}

Object.keys(unorderedAudioCategory).sort().forEach(function (key) {
	audioCategory[key] = unorderedAudioCategory[key];
})

audioCategory["preset"] = preset;


export default class Player extends React.Component {
	constructor(props) {
		super(props);

		let animated = Array(this.props.len).fill(false);
		let init = Array(this.props.len).fill(false);
		let sound = {};

		for (let i = 0; i < audio.length; i++) {
			sound[getMP3Name(audio[i])] = null; 
		}

		let position = [];

		Object.keys(sound).forEach((key, value) => {
			position.push(key);
		})

		this.state = {
			animated: animated,
			init: init, 
			position: position,
			sound: sound
		}
	}

	onClick(i) {
		let sound = this.state.sound;
		let init = this.state.init.slice();
		let key = getMP3Name(audio[i]);

		if (this.state.init[i]) {
			// Check if context is in a suspended state 
			if (sound[key].soundContext === 'suspended') {
				sound[key].soundContext.resume();
			}

			// Toggle audio status 
			if (sound[key].playing) {
				sound[key].sound.pause();
				sound[key].playing = false;
			} else {
				sound[key].sound.play();
				sound[key].playing = true;
			}
		} else {
			sound[key] = createAudioElement(audio[i]);
			init[i] = true;

			sound[key].sound.play();
			sound[key].playing = true;
		}

		this.setState({
			init: init,
			sound: sound
		})
	}

	openSoundSlider(i) {
		this.onClick(i);

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

	pause(i) {
		let sound = this.state.sound;
		let key = getMP3Name(audio[i]);

		sound[key].sound.pause();
		sound[key].playing = false;

		this.setState({
			sound: sound
		})
	}

	closeSoundSlider(i) {
		this.pause(i);

		let animated = this.state.animated.slice();

		animated[i] = !animated[i];

		this.setState({
			animated: animated
		})
	}

	onSliderChange(i, event) {
		let sound = this.state.sound;
		let key = getMP3Name(audio[i]);

		sound[key].volume = event;
		sound[key].soundVolume.gain.value = event / VolScale;

		this.setState({
			sound: sound
		})
	}

	reset() {
		this.props.reset();

		// Pause all sounds
		Object.keys(this.state.sound).forEach((key, value) => {
			if (this.state.sound[key] !== null) {
				this.state.sound[key].sound.pause();
			}	
		})

		let sound = {};
		let init = Array(audio.length).fill(false);
		
		this.setState({
			animated: Array(this.props.len).fill(false),
			init: init,
			sound: sound
		})
	}

	playInstant(sound) {
		sound.sound.play();
	}

	render() {
		let index = -1; 
		let availableSound = [];

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
				<Container>
					<PContainer>
						{Object.keys(this.state.sound).map((key, value) => {
							if (this.state.sound[key] === null) {
								return(null);
							}

							for (let i = 0; i < this.props.len; i++) {
								if (key === this.state.position[i]) {
									index = i;
									break;
								}
							}
							
							const isPlaying = this.state.sound[key].playing;
							const volume = this.state.sound[key].soundVolume.gain.value * VolScale;

							if (this.state.animated[index]) {
								return(
									<SoundBar
										animated={this.state.animated[index]}
										playing={isPlaying}
										name={key}
										handleClick={(index) => this.onClick(index)}
										handleSoundSlider={(index) => this.closeSoundSlider(index)}
										volume={volume}
										step={index}
										onChange={(i, event) => this.onSliderChange(i, event)}>
									</SoundBar>
								);
							} else {
								return(null);
							}
						})}
					</PContainer>
					<AContainer>
						<React.Fragment>
							<InstantTitle name={"Instant"} />
							<ul className="icon-container instant-container">
								{instant.map((val, step) => {
									availableSound = [];

									const instantSound = createInstantSound(val);
									
									return(
										<IconContainer
											name={instantSound.name}
											handleClick={() => this.playInstant(instantSound)}
											step={instantSound.name}>
										</IconContainer>
									)
								})}
							</ul>
						</React.Fragment>
						{Object.keys(audioCategory).map((key, val) => {
							availableSound = [];
							audioCategory[key].map((soundimport, i) => {
								let pos;

								for (let j = 0; j < this.props.len; j++) {
									if (this.state.position[j] === getMP3Name(soundimport)) {
										pos = j; 
										break; 
									}
								}
								
								if (!this.state.animated[pos] && this.props.displayed[pos]) {
									availableSound.push(
									<IconContainer
										name={getMP3Name(soundimport)}
										handleClick={() => this.openSoundSlider(pos)}
										step={`available-sound-${pos}`}>
									</IconContainer>)
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
					</AContainer>
				</Container>
			</div>		
		);
	}
}