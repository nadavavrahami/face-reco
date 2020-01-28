import React, {Component} from 'react';
import './DetectedImage.css';


const DetectedImage = ({imageUrl, box}) => {
	return (
		<div className = 'center ma2'>
			<div className = 'absolute'>
				<img alt='' id='inputimage' src={imageUrl}/>
				<div className = 'bounding-box' style={{top: box.topRow, right: box.rightCol, bottom: box.bottomRow, left:box.leftCol }}></div>
			</div>
		</div>
	)	
}


export default DetectedImage;