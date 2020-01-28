import React, {Component} from 'react';
import './UrlForm.css'

const UrlForm = ({onInputChange, onButtonSubmit}) => {
	return (
		<div>
			<p className='f3'>
				{'Enter pictures URL and FaceReco will recognize faces in the pictures'}
			</p>
			<div className="pa4 br3 shadow-5 center form">
				<input className="f4 pa2 w-70 center" type="text" name="urlInput" onChange={onInputChange} />
				<button className="w-30 grow f4 link ph3 pv2 dib white bg-light-purple" onClick={onButtonSubmit}>{'recognize'}</button>
			</div>
		</div>
	)
}


export default UrlForm;