import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { usePetContext, usePetUpdateContext } from "../contexts/PostContext.jsx";

const center = {
  lat: 34.052,
  lng: -118.244
};
// let arrOfLocationsinDiagonal = [center]
// for(let i = 0 ; i < 10; i++){
//   let temp = {
//     name: `location ${i}`,
//     location: {
//       lat: (arrOfLocationsinDiagonal[i].lat + 0.020),
//       lng: (arrOfLocationsinDiagonal[i].lng + 0.010)
//     }
//   }
//   arrOfLocationsinDiagonal.push(temp)
// }

const mapStyle = {
  height: '50vh',
  width: '100%',
}

function MyComponent(props) {
  const petArr = usePetContext();
  console.log(petArr);


  const [selected, setSelected] = useState({});

  const onSelect = item => {
    setSelected(item);
  }

  return (
    <LoadScript
      googleMapsApiKey= 'AIzaSyBHLCkdnOimaN74IGqKOJrFAXslOygEJqI'
    >
      <GoogleMap
        center={center}
        zoom={10}
        mapContainerStyle={mapStyle}
      >
        { 
          petArr.map(item => {
            // let location = {lat: item.lat, lng: item.lng};
            item.location = {lat: parseFloat(item.lat), lng: parseFloat(item.lng)};
            return (
              <Marker key={item.name} position={item.location} onClick={() => onSelect(item)} />
            )
          })
        } 
        {/* {
          selected.location &&
          (
            <InfoWindow position={selected.location} clickable={true} onCloseClick={() => setSelected({})}>
              
            </InfoWindow>
          )
        } */}
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MyComponent)
