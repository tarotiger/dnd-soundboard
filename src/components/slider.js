import React from 'react';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

export default class SoundSlider extends React.Component {
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
