import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from 'mapbox-gl';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import { ReactComponent as SearchIcon } from '../../../assets/icons/search.svg';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

const styles = {
    categoryHeadline: {
        padding: '45px 0px 15px',
    }
}

const MapboxMap = () => {
    const mapContainer = useRef(null);
    // The ref will prevent the map from reloading when the user interacts with the map:
    const map = useRef(null);
    const [lng, setLng] = useState(25.975399273184166);
    const [lat, setLat] = useState(65.00440031202271);
    const [zoom, setZoom] = useState(6);

    let DEBUG = true;
    // if (DEBUG) console.log('from MapboxMap component', mapboxgl.accessToken);
    // container: render the map inside a specific DOM element.

    useEffect(() => {
        // Basic data of map
        let currentMap = map.current;
        if (currentMap) return;
        currentMap = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/mapbox/streets-v11',
        center: [lng, lat],
        zoom: zoom
        });

        // Navigation buttons
        const nav = new mapboxgl.NavigationControl();
        currentMap.addControl(nav, 'bottom-right');

        // 'Search location'
        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            mapboxgl: mapboxgl,
            // marker: false, // Do not use the default marker style
            placeholder: 'Search City',
        });

        currentMap.addControl(geocoder);
        if (DEBUG) console.log(geocoder);
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
            <div ref={mapContainer} className="map-container" />
        </>
      );
}
 
export default MapboxMap;