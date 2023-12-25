import React, { useRef, useEffect, useState } from 'react';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';

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

            setLocation([[map.current.getCenter().lng.toFixed(4)], [map.current.getCenter().lat.toFixed(4)]]);
        });
    }

    function addNavigationButtons(map) {
        // Navigation buttons
        const nav = new mapboxgl.NavigationControl();
        map.current.addControl(nav, 'bottom-right');
    }

    function addGeocoder(map) {
        function coordinatesGeocoder(query) {
            // Regex for lng and lat coords
            const matches = query.match(
                /^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
            );

            if (!matches) {
                return null;
            }

            // To search by coords
            function coordinateFeature(lng, lat) {
                return {
                    center: [lng, lat],
                    geometry: {
                        type: 'Point',
                        coordinates: [lng, lat]
                    },
                    place_name: 'Lat: ' + lat + ' Lng: ' + lng,
                    place_type: ['coordinate'],
                    properties: {},
                    type: 'Feature'
                }
            }

            const coord1 = Number(matches[1]);
            const coord2 = Number(matches[2]);
            const geocodes = [];

            if (coord2 < -90 || coord2 > 90) {
                geocodes.push(coordinateFeature(coord2, coord1));
            }
                 
            if (geocodes.length === 0) {
                geocodes.push(coordinateFeature(coord1, coord2));
                geocodes.push(coordinateFeature(coord2, coord1));
            }
                 
            return geocodes;
        }

        // Search location
        const geocoder = new MapboxGeocoder({
            accessToken: mapboxgl.accessToken,
            localGeocoder: coordinatesGeocoder,
            mapboxgl: mapboxgl,
            marker: {
                color: 'rgb(34, 102, 96)',
                scale: 1.5
            },
            placeholder: 'Search location or coordinates',
            reverseGeocode: true
        });

        const fullscreen = new mapboxgl.FullscreenControl();

        const geolocate = new mapboxgl.GeolocateControl({
            positionOptions: {
                enableHighAccuracy: true
            },
            trackUserLocation: true,
            showUserHeading: true
        });

        map.current.addControl(geocoder);
        map.current.addControl(fullscreen);
        map.current.addControl(geolocate);
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
        addGeocoder(map);

        // Clean up on unmount
        return () => map.remove();
    }

    useEffect(() => {
        // Ask user for location permission in the browser
        getLocation();
    }, []);

    return (
        <>
            {/* <div className="sidebar" >
                Longitude: {lng} | Latitude: {lat} | Zoom: {zoom}
            </div> */}
            <div ref={mapContainer} className="map-container" />
        </>
      );
}
 
export default MapboxMap;