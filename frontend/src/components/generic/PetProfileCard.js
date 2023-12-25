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
    const arr = pet.petlocation.split(/[,]+/);
    // arr[0] = lng
    // arr[1] = lat

    if (map.current) return;
    map.current = new mapboxgl.Map({
        container: mapContainer.current,
        style: 'mapbox://styles/l1ll4n3m/clqkvquob00mw01o939rncxn5',
        center: [arr[0], arr[1]],
        zoom: zoom
    });

    // <LocationMark />
    map.current.on('load', () => {
      // Load an image from an external URL.
      map.current.loadImage(
      // Test cat image, only url of img is accepted :/
      'https://docs.mapbox.com/mapbox-gl-js/assets/cat.png',
      (error, image) => {
      if (error) throw error;
       
      // Add the image to the map style.
      map.current.addImage('cat', image);
       
      // Add a data source containing one point feature.
      map.current.addSource('point', {
        'type': 'geojson',
        'data': {
        'type': 'FeatureCollection',
        'features': [
            {
              'type': 'Feature',
              'geometry': {
                'type': 'Point',
                'coordinates': [arr[0], arr[1]]
              },
              'properties': {
                'title': pet.species
              }
            }
          ]
        }
      });
      
          map.current.addLayer({
            'id': 'points',
            'type': 'symbol',
            'source': 'point', // reference the data source
            'layout': {
              'icon-image': 'cat', // reference the image
              'icon-size': 0.25,
              'text-field': ['get', 'title'],
              'text-font': [
                'Open Sans Semibold',
                'Arial Unicode MS Bold'
              ],
              'text-offset': [0, 3],
              'text-anchor': 'top'
            }
          });
        }
      );
    });
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
