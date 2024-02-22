import React from 'react';

export default function ExtraInfo(props){
	return(
		<div>
		
			<img src={props.image} alt={props.alt}/>
			<p>{props.data}{props.unit}<br/><span>{props.info}</span></p>
		</div>
	);
}