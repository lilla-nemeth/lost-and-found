import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

export function setCoords(setter, value) {
    setter(value);
}

export function changeCoordsByUser(map, setLng, setLat, setZoom) {
    map.current.on('move', () => {
        setLng(map.current.getCenter().lng.toFixed(4));
        setLat(map.current.getCenter().lat.toFixed(4));
        setZoom(map.current.getZoom().toFixed(2));
    });
}

export function addNavigationButtons(map) {
    const nav = new mapboxgl.NavigationControl();
    map.current.addControl(nav, 'bottom-right');
}

export function addMaker(createProfile, map, lng, lat) {
    new mapboxgl.Marker({ 
        color: 'rgb(34, 102, 96)',
        scale: 1.5,
        draggable: false,
        // draggable: createProfile ? true : false,
    })
    .setLngLat([lng, lat])
    .addTo(map.current);
}

export function addFullscreenControl(map) {
    const fullscreen = new mapboxgl.FullscreenControl();
    map.current.addControl(fullscreen);
}

export function addGeolocateControl(map) {
    const geolocate = new mapboxgl.GeolocateControl({
        positionOptions: {
            enableHighAccuracy: true
        },
        trackUserLocation: true,
        showUserHeading: true
    });
    map.current.addControl(geolocate);
}

export function addGeocoder(map) {
    function coordinatesGeocoder(query) {
        // Regex for lng and lat coords
        const matches = query.match(
            /^[ ]*(?:Lat: )?(-?\d+\.?\d*)[, ]+(?:Lng: )?(-?\d+\.?\d*)[ ]*$/i
        );

        if (!matches) {
            return null;
        }

        // Reverse geocoding, converting geographic coordinates into a text description
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

    map.current.addControl(geocoder);
}
