import React from 'react';
import './index.css';

// Containment for soundsliders 
function SoundboardContainer(props) {
	return (
		<div className="soundboard">
			{props.children}
		</div>
	)
}

export default SoundboardContainer;