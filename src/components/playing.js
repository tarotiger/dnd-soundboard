import React from 'react';
import '../index.css';
import SoundSlider from './slider.js';

function SoundboardContainer(props) {
	return(
		<div className="playing-soundboard-container">
			<ul className="list-group">
				<p id="playing" className="soundboard-title">Playing</p>
				{props.children}
			</ul>
		</div>
	)
}

function Soundboard(props) {
	return (
		<li 
			className={"playing-slider list-group-item " + (props.animated ? "slide-in-animation" : "slide-out-animation")}
			key={props.name}>
			<div className="close-wrapper-controller">
				<div className="close-wrapper">
					<img 
						onClick={() => props.handleSoundSlider(props.step)}
						className="close-button" 
						alt="close" 
						src={require("../assets/close.png")}/>
				</div>
			</div>
			<p className={"text-left"}>{props.name}</p>
			<img alt={props.name} className="playing-image" src={require("../assets/" + props.name + ".png")} />
			<div
				className="playing-soundboard-button"
				onClick={() => props.handleClick(props.step)}>
				{props.playing ? (
					<img className="playing-button" alt="pause button" src={require("../assets/pause.png")} />
				) : (
					<img className="playing-button" alt="pause button" src={require("../assets/play.png")} />
				)}
			</div>
			<div className="slider-container">
				<SoundSlider 
					volume={props.volume}
					onChange={(event) => props.onChange(props.step, event)}
				/>
			</div>	
		</li>
	)
}

export default {Soundboard, SoundboardContainer};