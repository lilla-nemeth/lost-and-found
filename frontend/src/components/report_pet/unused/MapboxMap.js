import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

const styles = {
    categoryHeadline: {
        padding: '45px 0px 15px',
    }
}

const MapboxMap = (props) => {
    const { setLocation } = props;

    // mapContainer renders the map inside a specific DOM element
    const mapContainer = useRef(null);
    // The ref will prevent the map from reloading when the user interacts with the map
    const map = useRef(null);
    const [lng, setLng] = useState(null);
    const [lat, setLat] = useState(null);
    const [zoom, setZoom] = useState(9);

    let DEBUG = false;

    function getLocation() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(
                // Success:
                showPosition, 
                // Error:
                fallbackPosition, 
                {
                   enableHighAccuracy: true,
                   timeout: 5000,
                   maximumAge: 0
                });
        } else { 
            console.log('Geolocation is not supported by your browser.');
        }
    }
    
    function showPosition(position) {
        createMap(position.coords.longitude, position.coords.latitude);
    }

    function fallbackPosition() {
        // Helsinki fallback coords
        createMap(24.9344, 60.1797);
    }

    function changeCoordsByUser(map) {
        map.current.on('move', () => {
            setLng(map.current.getCenter().lng.toFixed(4));
            setLat(map.current.getCenter().lat.toFixed(4));
            setZoom(map.current.getZoom().toFixed(2));

            setLocation([
                {
                    lat: map.current.getCenter().lat.toFixed(4), 
                    lng: map.current.getCenter().lng.toFixed(4)
                }
            ]);
        });
    }

    function addNavigationButtons(map) {
        // Navigation buttons
        const nav = new mapboxgl.NavigationControl();
        map.current.addControl(nav, 'bottom-right');
    }

    function addSearchBar(map) {
        // Search location
        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            marker: true,
            placeholder: 'Search location',
        });

        map.current.addControl(geocoder);
    }

    function createMap(lng, lat) {
        if (map.current) return;
        map.current = new mapboxgl.Map({
            container: mapContainer.current,
            style: 'mapbox://styles/l1ll4n3m/clqkvquob00mw01o939rncxn5',
            center: [lng, lat],
            zoom: zoom
        });

        // Changes the latitude, longitude and zoom whenever the user interacts with the map
        changeCoordsByUser(map);
        addNavigationButtons(map);
        addSearchBar(map);

        // Clean up on unmount
        return () => map.remove();
    }


    useEffect(() => {
        // Ask user for location permission in the browser
        getLocation();
    });



    // Additional search settings: ZONE/DISTANCE, e.g: 5-10-25-50-75-100 km
    return (
        <>
            {/* <div style={{padding: '0 0 45px'}}>
                <h2 style={styles.categoryHeadline}>Location</h2>
                <div className='searchBox'>
                    <input  className='searchInput'
                            id='search' 
                            type='search' 
                            placeholder='City, Region or Zip' 
                            // value={search} 
                            // onChange={handleChange} 
                    />
                    <button className='searchButton'>
                        <SearchIcon/>
                    </button>
                </div>
            </div> */}
            <div className="sidebar" >
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div>
            <div ref={mapContainer} className="map-container" />
        </>
      );
}
 
export default MapboxMap;