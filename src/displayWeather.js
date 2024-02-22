import React from 'react';
import {useState} from 'react';

import searchImg from './images/search.png';
import sunImg from './images/sun.png';
import sunCloudImg from './images/sunCloud.png';
import sunRainImg from './images/sunRain.png';
import humidityImg from './images/humidity.png';

import windImg from './images/wind.png';
import snowImg from './images/snowflake.png';

import mistImg from './images/mist.png';
import moonImg from './images/moon.png';
import moonCloudImg from './images/moonCloud.png';
import moonRainImg from './images/moonRain.png';

import ExtraInfo from './extraInfo';

function DisplayWeather(){
	const [cityName, setCityName] = useState('');
	const [weatherImage, setWeatherImage] = useState(sunImg);
	const [tempC, setTempC] = useState(0);
	const [clarity, setClarity] = useState('');
	const [percentHumidity, setPercentHumidity] = useState(0);
	const [windSpeed, setWindSpeed] = useState(0);

	const handleInputTyping = ({target}) => {
		setCityName(target.value);
	}

	const showWeather = (weatherData) => {
		document.getElementById('cityDisplay').innerHTML = weatherData.location.name;
		weatherData = weatherData.current;
		
		setTempC(weatherData.temp_c);
		setWindSpeed(weatherData.wind_kph);
		setPercentHumidity(weatherData.humidity);
		setClarity(`, ${weatherData.condition.text}`);

		if (weatherData.is_day){
			if (weatherData.condition.text === 'Partly cloudy'){
				setWeatherImage(sunCloudImg);
				
			} else if (/rain/.test(weatherData.condition.text)){
				setWeatherImage(sunRainImg);
				
			} else if (weatherData.condition.text === 'Mist') {
				setWeatherImage(mistImg);
			} else if (/snow/.test(weatherData.condition.text)){
				setWeatherImage(snowImg);	
			} else {
				setWeatherImage(sunImg);
			}
		} else {
			if (weatherData.condition.text === 'Partly cloudy'){
				setWeatherImage(moonCloudImg);
			} else if (/rain/.test(weatherData.condition.text)){
				setWeatherImage(moonRainImg);
			} else if (weatherData.condition.text === 'Mist') {
				setWeatherImage(mistImg);
			} else {
				setWeatherImage(moonImg);
			}
		}
	}

	//Weather Part
	const apiKey = '187552e3d23548b097b135823232909';
	const apiUrl = 'https://api.weatherapi.com/v1/current.json';

	const getWeatherData = () => {
		const location = cityName;
		const url = `${apiUrl}?key=${apiKey}&q=${location}`;

		fetch(url)
		  	.then(response => {
		    	if (!response.ok) {
		    		alert(`Invalid City Name: ${cityName}`);
		      		throw new Error('Network response was not ok');

		    	}
		    	return response.json();
		  	})
		  	.then(data => {
		    	// Process and use the weather data
		    	console.log(data);
		    	showWeather(data)
		
		  	})
		  	.catch(error => {
		    	console.error('Fetch error: ' + error);
		  	});
	}

	const onSearchClick = () => {
		getWeatherData();
	}

	const onEnterKeyPress = (event) =>{
		if (event.key === 'Enter' || event.key === 'Return'){
			onSearchClick();
		}
	}


	return(
		<div className="displayDiv">
			<div className="inputDiv">
				<input placeholder="   Enter City Name"
				value={cityName} onChange={handleInputTyping} onKeyPress={onEnterKeyPress}/>
				<button onClick={onSearchClick}>
					<img src={searchImg} width="100%" height="100%" alt="search icon"/>
				</button>
			</div>

			<div className="weatherDiv">
				<div className="tempDiv">
					<img src={weatherImage} alt="weather img"/>
					<h1 id="temp">{tempC}°C <span>{clarity}</span></h1>
					<h3 id="cityDisplay"> </h3>

				</div>

				<div className="extraDiv">
					<ExtraInfo image={humidityImg} alt="humidity image"
					data={percentHumidity} info="Humidity" unit="%"/>
					<ExtraInfo image={windImg} alt="wind image"
					data={windSpeed} info="Wind Speed" unit="km/h"/>
				</div>
			</div>
			
		</div>
	);
}

export default DisplayWeather;