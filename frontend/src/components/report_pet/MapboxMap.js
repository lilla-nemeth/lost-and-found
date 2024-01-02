import React, { useRef, useEffect, useState, useContext } from 'react';
import { AppStateContext } from '../../contexts/AppStateContext';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { ReactComponent as SearchIcon } from '../../assets/icons/search.svg';
import { 
    changeCoordsByUser, 
    addNavigationButtons, 
    addMaker, 
    addFullscreenControl,
    addGeolocateControl,
    setCoords
} from '../MapHelpers';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;


const MapboxMap = (props) => {
    const { fetchPlaces } = useContext(AppStateContext);
    const { 
        query, 
        setQuery,
        lng,
        lat,
        setLng, 
        setLat 
    } = props;
    
    // mapContainer renders the map inside a specific DOM element
    // The ref will prevent the map from 
    // reloading when the user interacts with the map
    const mapContainer = useRef(null);
    const map = useRef(null);
    const dropdownRef = useRef(null);
    const [zoom, setZoom] = useState(9);
    const [places, setPlaces] = useState([]);
    const [display, setDisplay] = useState(false);
    
    const mapStyle = 'mapbox://styles/l1ll4n3m/clqkvquob00mw01o939rncxn5';

    let DEBUG = false;

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                showPosition,  // Success
                fallbackPosition, // Error
                {
                   enableHighAccuracy: true,
                   timeout: 5000,
                   maximumAge: 0
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
            zoom: zoom
        });
        
        changeCoordsByUser(map, setLng, setLat, setZoom);
        addNavigationButtons(map);
        addFullscreenControl(map);
        addGeolocateControl(map);
        addMaker(true, map, lng, lat);

        // Clean up on unmount
        return () => map.current.remove();
    }

    function handleChange(e) {
        setQuery(e.target.value);

        if (e.target.value) {
            fetchPlaces(query, setPlaces, lng, lat);
        } else {
            setPlaces('');
        }
    }

    const displayDropdown = () => {
        setDisplay(!display);
    };

    function handleClickOutside(event) {
        if (
          dropdownRef.current &&
          !dropdownRef.current.contains(event.target) &&
          event.target !== dropdownRef.current
        ) {
          setDisplay(false);
        }
    };

    useEffect(() => {
        fetchPlaces(query, setPlaces, lng, lat);
    }, [query]);

    useEffect(() => {
        getLocation();
    }, []);

    useEffect(() => {
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, []);

    return (
        <>
            <div 
                ref={mapContainer} 
                className='map-container petReportMap' />
            <div  
                className='locationContainer' 
                ref={dropdownRef} 
                onClick={displayDropdown}
                >
                <div className='inputBox' style={{padding: '10px 0 0 0 !important'}}>
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
                    {display && places && places.map(place => {
                        return (
                            <div
                                className='locationSuggestion'
                                key={place.id}
                                onClick={() => {
                                    setQuery(place.place_name);
                                    setLng(place.center[0]);
                                    setLat(place.center[1]);
                                    createMap(place.center[0], place.center[1])
                                }}>
                                <div className='locationSuggestionText'>{place.text}</div>
                                <p className='locationSuggestionName'>{place.place_name}</p>   
                            </div>
                        )
                    })}
                </div>
            </div>
        </>
    );
}
 
export default MapboxMap;