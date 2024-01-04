import React, { useState, useContext, useRef } from 'react';
import { createBrowserHistory } from 'history';
import { useParams } from 'react-router';
import { AppStateContext } from '../../contexts/AppStateContext';
import Loader from '../generic/Loader';
import { Link } from 'react-router-dom';
import PetProfileCard from '../generic/PetProfileCard';
import { AuthContext } from '../../contexts/AuthContext';

import { addMarker, addFullscreenControl } from '../MapHelpers';

import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

let history = createBrowserHistory();

const PetProfile = () => {
    const { id } = useParams();
    const { pets, users, loader } = useContext(AppStateContext);
    const { token } = useContext(AuthContext);
    const mapContainer = useRef(null);
    const map = useRef(null);
    const [zoom, setZoom] = useState(9);

    let DEBUG = false;
  
    function renderMap(pet) {
      if (map.current) return;
      map.current = new mapboxgl.Map({
          accessToken: mapboxgl.accessToken,
          container: mapContainer.current,
          style: 'mapbox://styles/l1ll4n3m/clqkvquob00mw01o939rncxn5',
          center: [pet.longitude, pet.latitude],
          zoom: zoom
      });
     
      addMarker(map, pet.longitude, pet.latitude);
      addFullscreenControl(map);
    }

    function getPetAndUserData(id, petsArr, usersArr) {
        if (token && usersArr.length > 0) {
            for (let i = 0; i < petsArr.length; i++) {
                for (let j = 0; j < usersArr.length; j++) {
                    if (id == petsArr[i].id) {
                        if (petsArr[i].userid == usersArr[j].id) {
                            return (
                                <PetProfileCard 
                                    pet={petsArr[i]} 
                                    user={usersArr[j]} 
                                    renderMap={renderMap} 
                                    mapContainer={mapContainer} 
                                />
                            );
                        }
                    }
                }
            }
        } else {
            for (let i = 0; i < petsArr.length; i++) {
                if (id == petsArr[i].id) {
                    return (
                        <PetProfileCard 
                            pet={petsArr[i]} 
                            renderMap={renderMap} 
                            mapContainer={mapContainer} 
                        />
                    );
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