import React, { useState, useContext, useRef } from 'react';
import { createBrowserHistory } from 'history';
import { useParams } from 'react-router';
import { AppStateContext } from '../../contexts/AppStateContext';
import Loader from '../generic/Loader';
import { Link } from 'react-router-dom';
import PetProfileCard from '../generic/PetProfileCard';
import { AuthContext } from '../../contexts/AuthContext';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

let history = createBrowserHistory();

const PetProfile = () => {
    const { id } = useParams();
    const { pets, users, loader } = useContext(AppStateContext);
    const { token } = useContext(AuthContext);

    // mapbox map
    const mapContainer = useRef(null);

    const map = useRef(null);
    const [zoom, setZoom] = useState(9);
  
    function renderMap(pet) {
      if (map.current) return;
      map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: 'mapbox://styles/l1ll4n3m/clqkvquob00mw01o939rncxn5',
          center: [pet.longitude, pet.latitude],
          zoom: zoom
      });
     
      const marker = new mapboxgl.Marker({
        color: 'rgb(34, 102, 96)',
        draggable: false,
        scale: 1.5
      })
      .setLngLat([pet.longitude, pet.latitude])
      .addTo(map.current);
  
      const fullscreen = new mapboxgl.FullscreenControl();
  
      map.current.addControl(marker);
      map.current.addControl(fullscreen);
    }
  



    let DEBUG = false;

    function getPetAndUserData(id, petArr, userArr) {
        if (token && userArr.length > 0) {
            for (let i = 0; i < petArr.length; i++) {
                for (let j = 0; j < userArr.length; j++) {
                    if (id == petArr[i].id) {
                        if (petArr[i].userid == userArr[j].id) {
                            
                            return <PetProfileCard pet={petArr[i]} user={userArr[j]} renderMap={renderMap} mapContainer={mapContainer} />;
                        }
                    }
                }
            }
        } else {
            for (let i = 0; i < petArr.length; i++) {
                if (id == petArr[i].id) {
                    return <PetProfileCard pet={petArr[i]} renderMap={renderMap} mapContainer={mapContainer} />;
                }
            }
        }
    }

    history.replace(`/petprofile/${id}`);

    if (loader) {
        return (
            <Loader />
        );
    }

    return (  
        <>
        <main className='petMain'>
            <section>
                {getPetAndUserData(id, pets, users)}
                <div className='backButtonContainer'>
                    <div className='backButtonBox'>
                        <Link to={'/lostandfound'}>
                            <button className='backButton'>Back to the Pet List</button>
                        </Link>
                    </div>
                </div>
            </section>
        </main>
        </>
    );
}
 
export default PetProfile;