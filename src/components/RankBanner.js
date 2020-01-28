import React, {Component} from 'react';


const RankBanner = ({user}) => {
return (
	<div>
		<p className = "white f3">{'Hi ' + user.name}</p>
		<p className = "white f3">{'Your current entries counter is '+ user.entries}</p>
	</div>
)		
}


export default RankBanner;
