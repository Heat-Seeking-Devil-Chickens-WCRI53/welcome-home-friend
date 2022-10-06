import React, { useState } from 'react';
import { GoogleMap, LoadScript, Marker, InfoWindow } from '@react-google-maps/api';
import { usePetContext, usePetUpdateContext } from "../contexts/PostContext.jsx";

const center = {
  lat: 34.052,
  lng: -118.244
};

const mapStyle = {
  height: '85%',
  width: '100%',
}

function MyComponent(props) {
  const petArr = usePetContext();



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
        {/* {
          savedLocations.map(item => {
            return (
              <Marker key={item.name} position={item.location} onClick={() => onSelect(item)} />
            )
          })
        } */}
        {
          selected.location &&
          (
            <InfoWindow position={selected.location} clickable={true} onCloseClick={() => setSelected({})}>
            </InfoWindow>
          )
        }
        <></>
      </GoogleMap>
    </LoadScript>
  )
}

export default React.memo(MyComponent)