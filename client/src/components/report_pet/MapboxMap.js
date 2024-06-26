import React, { useRef, useEffect, useState, useContext } from 'react';
import { AppStateContext } from '../../contexts/AppStateContext';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import {
	changeCoordsByUser,
	addNavigationButtons,
	addMarker,
	addFullscreenControl,
	addGeolocateControl,
	setCoords,
	handleClickOutside,
} from '../../utils/MapHelpers';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

const MapboxMap = (props) => {
	const { fetchPlaces } = useContext(AppStateContext);
	const { query, setQuery, lng, lat, setLng, setLat } = props;

	const mapContainer = useRef(null);
	const map = useRef(null);
	const dropdownRef = useRef(null);
	const [zoom, setZoom] = useState(9);
	const [places, setPlaces] = useState([]);
	const [display, setDisplay] = useState(false);

	const mapStyle = 'mapbox://styles/l1ll4n3m/clqkvquob00mw01o939rncxn5';

	function getLocation() {
		if (navigator.geolocation) {
			navigator.geolocation.getCurrentPosition(
				showPosition, // Success
				fallbackPosition, // Error
				{
					enableHighAccuracy: true,
					timeout: 5000,
					maximumAge: 0,
				}
			);
		} else {
			console.log('Geolocation is not supported by your browser.');
		}
	}

	function showPosition(position) {
		setCoords(setLng, position.coords.longitude);
		setCoords(setLat, position.coords.latitude);
		createMap(position.coords.longitude, position.coords.latitude);
	}

	function fallbackPosition() {
		// Helsinki fallback coords
		const fallbackLng = 24.9344;
		const fallbackLat = 60.1797;

		setCoords(setLng, fallbackLng);
		setCoords(setLat, fallbackLat);
		createMap(fallbackLng, fallbackLat);
	}

	function createMap(lng, lat) {
		map.current = new mapboxgl.Map({
			accessToken: mapboxgl.accessToken,
			container: mapContainer.current,
			style: mapStyle,
			center: [lng, lat],
			zoom: zoom,
		});

		changeCoordsByUser(map, setLng, setLat, setZoom);
		addNavigationButtons(map);
		addFullscreenControl(map);
		addGeolocateControl(map);
		addMarker(map, lng, lat);

		// Clean up on unmount
		return () => map.current.remove();
	}

	function handleChange(e) {
		setQuery(e.target.value);

		if (query) {
			fetchPlaces(query, setPlaces, lng, lat);
		} else {
			setPlaces('');
		}
	}

	const displayDropdown = () => {
		setDisplay(!display);
	};

	useEffect(() => {
		if (query) {
			fetchPlaces(query, setPlaces, lng, lat);
		}
	}, [fetchPlaces, query, setPlaces, lng, lat]);

	useEffect(() => {
		getLocation();
		// getLocation should load once
		// eslint-disable-next-line
	}, []);

	useEffect(() => {
		document.addEventListener('mousedown', (e) => handleClickOutside(e, dropdownRef, setDisplay));
		return () => document.removeEventListener('mousedown', (e) => handleClickOutside(e, dropdownRef, setDisplay));
	}, []);

	return (
		<>
			<div ref={mapContainer} className='map-container petReportMap' />
			<div className='locationContainer' ref={dropdownRef} onClick={displayDropdown}>
				<div className='inputBox'>
					<div className='searchButton'>
						<SearchIcon onChange={handleChange} />
					</div>
					<input
						className='formInput locationInput'
						placeholder='search places'
						name='places'
						id='places'
						type='search'
						value={query}
						onChange={handleChange}
						onFocus={(e) => e.target.select()}
					/>
				</div>
				<div className='locationSuggestionContainer'>
					{display &&
						places &&
						places.map((place) => {
							return (
								<div
									className='locationSuggestion'
									key={place.id}
									onClick={() => {
										setQuery(place.place_name);
										setLng(place.center[0]);
										setLat(place.center[1]);
										createMap(place.center[0], place.center[1]);
									}}
								>
									<div className='locationSuggestionText'>{place.text}</div>
									<p className='locationSuggestionName'>{place.place_name}</p>
								</div>
							);
						})}
				</div>
			</div>
		</>
	);
};

export default MapboxMap;
