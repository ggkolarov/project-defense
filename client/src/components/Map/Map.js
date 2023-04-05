import React from 'react'
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';

export const Map = ({
    hike,
}) => {
    const containerStyle = {
        width: '100%',
        height: '400px'
    };

    const mapCoordinates = {
        lat: parseFloat(hike.latitude),
        lng: parseFloat(hike.longitude)
    };

    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyB-dG7PdBzhf0dQptVRJIUW5-CZvq372Ik"
    })

    const [map, setMap] = React.useState(null)

    const onLoad = React.useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(mapCoordinates);
        map.getCenter(bounds);

        setMap(map)
    }, []);

    const onUnmount = React.useCallback(function callback() {
        setMap(null);
    }, [])

    return isLoaded ? (
        <GoogleMap
            mapContainerStyle={containerStyle}
            center={{lat: 42.459587914885994, lng: 25.009347222235018}}
            zoom={7}
            onLoad={onLoad}
            onUnmount={onUnmount}
        >
            <Marker position={mapCoordinates} />
            <></>
        </GoogleMap>
    ) : <></>
};

//https://developers.google.com/maps/documentation/javascript/reference/map#Map.getCenter
//https://www.npmjs.com/package/@react-google-maps/api