import React, {Component} from 'react';
import Tilt from 'react-tilt'
import logoIcon from './logoIcon.jpeg'

const Navigation = ({onSighOut, onRouteChange, route}) => {
	if (route==='home') { 
	return (
		<nav className = "ma2 mt2" style={{display: "flex",justifyContent: "space-between"}}>
			<div>
				<Tilt 
				className="Tilt" 
				options={{ max : 50 }} 
				style={{ height: 120, width: 120 }} >
					<div className="Tilt-inner">
						<img className="pa1 br4 shadow-2" 
						alt="logo" 
						src={logoIcon}
						style={{ height: 100, width: 100 }}/> 
					</div>
				</Tilt>
			</div>
			<div>
				<p onClick={() => onSighOut()} className="f3 link dim black pa3 pointer">Sign Out</p>
			</div>
		</nav>
	);
	} else {
	return (
		<nav className = "ma2 mt2" style={{display: "flex",justifyContent: "space-between"}}>
			<div>
				<Tilt 
				className="Tilt" 
				options={{ max : 50 }} 
				style={{ height: 120, width: 120 }} >
					<div className="Tilt-inner">
						<img className="pa1 br4 shadow-2" 
						alt="logo" 
						src={logoIcon}
						style={{ height: 100, width: 100 }}/> 
					</div>
				</Tilt>
			</div>
			<div style={{display: "flex"}}>
				<p onClick={() => onRouteChange('signin')} className="f3 link dim black pa3 pointer">Sign In</p>
				<p onClick={() => onRouteChange('register')} className="f3 link dim black pa3 pointer">Register</p>
			</div>
		</nav>
	);}	
}


export default Navigation;