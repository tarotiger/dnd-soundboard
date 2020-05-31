import React from 'react';
import '../index.css';
import SoundSlider from './slider.js';

// Container for the available sounds
function AContainer(props) {
	return(
		<div className="available-soundboard-container">
			<div className="soundboard-container">
				{props.children}
			</div>	
		</div>
	)
}

// Container for soundsliders 
function Container(props) {
	return (
		<div className="soundboard">
			{props.children}
		</div>
	)
}

// Icon containers 
function IconContainer(props) {
	return (
		<li key={props.name}>
			<figure>
				<div 
					className="hover-button"> 
					<img className="play-button" alt="play button" src={require("../assets/play.png")}/> 	
				</div>
				<img 
				className="icon-image"
				onClick={() => props.handleClick(props.step)}
				alt="sound" src={require(`../assets/${props.name}.png`)}/>
				<figcaption> {props.name} </figcaption>
			</figure>
		</li>
	)
}

// Contains the title of each category
function CategoryTitle(props) {
	return (
		<div className="category-title">
			<p className="category-text"> {props.name.charAt(0).toUpperCase() + props.name.slice(1)} </p>
		</div>
	)
}

// Contains the title of instant sounds
function InstantTitle(props) {
	return (
		<div className="category-title instant-container">
			<p className="category-text"> {props.name.charAt(0).toUpperCase() + props.name.slice(1)} </p>
		</div>
	)
}

function PContainer(props) {
	return(
		<div className="playing-soundboard-container">
			<ul className="list-group">
				<p id="playing" className="soundboard-title">Playing</p>
				{props.children}
			</ul>
		</div>
	)
}

function SoundBar(props) {
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

export { AContainer, CategoryTitle, Container, IconContainer, InstantTitle, PContainer, SoundBar };