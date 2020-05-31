import React from 'react';
import { getMP3Name } from '../utility/audio.js';
import Player from './player.js';

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

const audio = [rain, fire, cave, night, festival, haunted, combat, thunder, carriage, goblincave, lostmine, woodland, tavernmusic, medievaltown, tavern, boss];

export default class Controller extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			query: "",
			// Keeps track of which soundboard slider is displayed
			displayed: Array(audio.length).fill(true)
		}
	}

	handleSubmit(event) {
		event.preventDefault();
		
		let query = this.state.query;
		let displayed = Array(audio.length).fill(true);

		// Checks if audio object has search query in name
		for (let i = 0; i < audio.length; i++) {
			let audioName = getMP3Name(audio[i]).toLowerCase();
			if (!audioName.includes(query.toLowerCase())) {
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
		let displayed = Array(audio.length).fill(true);

		// Checks if audio object has search query in name
		for (let i = 0; i < audio.length; i++) {
			let audioName = getMP3Name(audio[i]).toLowerCase();
			if (!audioName.includes(query.toLowerCase())) {
				displayed[i] = false;
			}
		}

		this.setState({
			query: query,
			displayed: displayed
		})
	}

	reset() {
		this.setState({
			query: "",
			displayed: Array(audio.length).fill(true)
		})
	}

	render() {
		return (
			<div>
				<Player
					displayed={this.state.displayed}
					handleChange={(event) => this.handleChange(event)}
					handleSubmit={(event) => this.handleSubmit(event)}
					len={audio.length}
					query={this.state.query}
					reset={() => this.reset()}
				/>
			</div>
		);
	}
}