import React, { useEffect, useRef, useState } from 'react';
import { petDate, isInputEmpty } from '../HelperFunctions.js';
import PetUserData from './PetUserData.js';
import mapboxgl from '!mapbox-gl'; // eslint-disable-line import/no-webpack-loader-syntax
import { ReactComponent as LocationMark } from '../../assets/icons/locationmark.svg';

mapboxgl.accessToken = process.env.REACT_APP_MAPBOX_API_KEY;

const PetProfileCard = (props) => {
  const { pet, user } = props;



  const mapContainer = useRef(null);
  const map = useRef(null);
  const [zoom, setZoom] = useState(9);

  function renderMap(pet) {
    console.log(pet)

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

  useEffect(() => {
    renderMap(pet);
}, []);
  
  let DEBUG = false;

  return (
    <div className='petProfileContainer'>
      <div className='petProfileCard'>
        <div className='petProfileCardInner'>
          <div className='petProfilePictureContainer'>
            <img
              className='petProfilePicture'
              alt='img'
              src={`data:image/jpg;base64,${pet.img}`}
            />
          </div>
          <div className='petProfileTextBox'>
                <table className='table'>
                  <tbody>
                    <tr>
                      <td className='tableCell'>
                        <div className='petStatus'>{pet.petstatus}</div>
                      </td>
                      <td className='tableCell'></td>
                    </tr>
                    <tr>
                      <td colSpan='2' className='petSpecies'>
                        {pet.species}
                      </td>
                    </tr>
                    <tr className='petMainInfo'>
                      {petDate(pet.petstatus, pet.since, pet.until, 'tableCell')}
                    </tr>
                    <tr className='petOptionalInfo'>
                      {isInputEmpty('Location', pet.petlocation, 'tableCell')}
                    </tr>
                  </tbody>
                </table>
                <div style={{width: '100%'}}>
                  <div ref={mapContainer} className="map-container" />
                </div>
                <table>
                  <tbody>
                    <tr className='petOptionalInfo'>
                      {isInputEmpty('Size', pet.petsize, 'tableCell')}
                    </tr>
                    <tr className='petOptionalInfo'>
                      {isInputEmpty('Sex', pet.sex, 'tableCell')}
                    </tr>
                    <tr className='petOptionalInfo'>
                      {isInputEmpty('Breed', pet.breed, 'tableCell')}
                    </tr>
                    <tr className='petOptionalInfo'>
                      {isInputEmpty('Color', pet.color, 'tableCell')}
                    </tr>
                    <tr className='petOptionalInfo'>
                      {isInputEmpty('Age', pet.age, 'tableCell')}
                    </tr>
                    <tr className='petOptionalInfo'>
                      {isInputEmpty(
                        'Unique feature',
                        pet.uniquefeature,
                        'tableCell'
                      )}
                    </tr>
                    <tr className='petOptionalInfo'>
                      {isInputEmpty(
                        'Description',
                        pet.postdescription,
                        'tableCell'
                      )}
                    </tr>
                  {!user ? <></> : <PetUserData user={user} />}
                  </tbody>
                </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PetProfileCard;
