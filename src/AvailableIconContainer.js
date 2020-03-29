import React from 'react';
import './index.css';

function AvailableSoundSliderContainer(props) {
	return (
		<li key={props.name}>
			<figure>
				<div 
					className="hover-button"> 
					<img className="play-button" alt="play button" src={require("./assets/play.png")}/> 	
				</div>
				<img 
				className="icon-image"
				onClick={() => props.handleClick(props.step)}
				alt="sound" src={require("./assets/" + props.name + ".png")}/>
				<figcaption> {props.name} </figcaption>
			</figure>
		</li>
	)
}

export default AvailableSoundSliderContainer;