//Import necessaries packages
import React, { useRef, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Container,
  IconButton,
  Input,
  Typography,
} from '@mui/material';
import { FaLocationArrow, FaTimes } from 'react-icons/fa';
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
  DirectionsRenderer,
} from '@react-google-maps/api';

const center = { lat: 9.939093, lng: 78.121719 };

const Destination: React.FC = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: import.meta.env.GOOGLE_MAP_API_KEY,
    libraries: ['places'],
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);
  const [directionsResponse, setDirectionsResponse] = useState<google.maps.DirectionsResult | null>(null);
  const [distance, setDistance] = useState('');
  const [duration, setDuration] = useState('');

  const originRef = useRef<HTMLInputElement>(null);
  const destinationRef = useRef<HTMLInputElement>(null);

  if (!isLoaded) {
    return <Typography>Loading...</Typography>;
  }

  const calculateRoute = async () => {
    if (!originRef.current?.value || !destinationRef.current?.value) {
      return;
    }
    const directionsService = new google.maps.DirectionsService();
    const results = await directionsService.route({
      origin: originRef.current.value,
      destination: destinationRef.current.value,
      travelMode: google.maps.TravelMode.DRIVING,
    });
    setDirectionsResponse(results);
    setDistance(results.routes[0]?.legs[0]?.distance?.text ?? 'N/A');
    setDuration(results.routes[0]?.legs[0]?.duration?.text ?? 'N/A');
  };

  const clearRoute = () => {
    setDirectionsResponse(null);
    setDistance('');
    setDuration('');
    if (originRef.current) originRef.current.value = '';
    if (destinationRef.current) destinationRef.current.value = '';
  };

  return (
    <Box paddingTop={10} position="relative" display="flex" flexDirection="column" alignItems="center" height="100vh" width="100vw">
      <Box paddingTop={10} position="absolute" left={0} top={0} height="100%" width="100%">
        <GoogleMap
          center={center}
          zoom={15}
          mapContainerStyle={{ width: '100%', height: '100%' }}
          options={{
            zoomControl: false,
            streetViewControl: false,
            mapTypeControl: false,
            fullscreenControl: false,
          }}
          onLoad={map => setMap(map)}
        >
          <Marker position={center} />
          {directionsResponse && (
            <DirectionsRenderer directions={directionsResponse} />
          )}
        </GoogleMap>
      </Box>
      <Container
        style={{
          width:20,
          padding: 16,
          borderRadius: 8,
          margin: 16,
          backgroundColor: 'white',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          zIndex: 1,
          minWidth: '300px',
        }}
      >
        <Box display="flex" flexDirection="column" gap={2}>
          <Autocomplete>
            <Input type="text" placeholder="Origin" inputRef={originRef} fullWidth />
          </Autocomplete>
          <Autocomplete>
            <Input type="text" placeholder="Destination" inputRef={destinationRef} fullWidth />
          </Autocomplete>
          <ButtonGroup>
            <Button color="primary" variant="contained" onClick={calculateRoute}>
              Calculate Route
            </Button>
            <IconButton aria-label="clear route" onClick={clearRoute}>
              <FaTimes />
            </IconButton>
          </ButtonGroup>
          <Box display="flex" justifyContent="space-between" marginTop={2}>
            <Typography>Distance: {distance}</Typography>
            <Typography>Duration: {duration}</Typography>
            <IconButton aria-label="center map" onClick={() => {
              if (map) {
                map.panTo(center);
                map.setZoom(15);
              }
            }}>
              <FaLocationArrow />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default Destination;
