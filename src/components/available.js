import React from 'react';
import '../index.css';

// Container for the available sounds
function SoundboardContainer(props) {
	return(
		<div className="available-soundboard-container">
			<div className="soundboard-container">
				{props.children}
			</div>	
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
				alt="sound" src={require("../assets/" + props.name + ".png")}/>
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

export default {IconContainer, SoundboardContainer, CategoryTitle, InstantTitle}