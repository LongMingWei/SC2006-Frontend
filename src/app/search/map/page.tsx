'use client';

import React, { useEffect, useState, useRef } from 'react';
import { APIProvider, Map, useMap, AdvancedMarker, MapCameraChangedEvent } from '@vis.gl/react-google-maps';
import { MarkerClusterer } from '@googlemaps/markerclusterer';
import type { Marker } from '@googlemaps/markerclusterer';
import { useRouter } from 'next/navigation';

type Caretaker = {
  id: number;
  name: string;
  location: google.maps.LatLngLiteral;
  avatar: string;
  starRating: number;
  services: string[];
  availability: string;
  rates: string;
};

const caretakers: Caretaker[] = [
  {
    id: 1,
    name: 'Caretaker 1',
    location: { lat: -33.8567844, lng: 151.213108 },
    avatar: '/dog.png',
    starRating: 4.5,
    services: ['Walking', 'Sitting'],
    availability: 'Weekdays',
    rates: '$30/hour',
  },
  {
    id: 2,
    name: 'Caretaker 2',
    location: { lat: -33.8472767, lng: 151.2188164 },
    avatar: '/dog.png',
    starRating: 4.0,
    services: ['Walking'],
    availability: 'Weekends',
    rates: '$25/hour',
  },
  {
    id: 3,
    name: 'Caretaker 3',
    location: { lat: -33.8209738, lng: 151.2563253 },
    avatar: '/dog.png',
    starRating: 4.7,
    services: ['Walking', 'Sitting'],
    availability: 'Weekdays and Weekends',
    rates: '$50/hour',
  },
];

export default function Mapper() {
    useEffect(() => {
      console.log('API Key:', process.env.NEXT_PUBLIC_MAPS_API_KEY);
    }, []);
  
    return (
      <APIProvider apiKey={process.env.NEXT_PUBLIC_MAPS_API_KEY || ''} onLoad={() => console.log('Maps API has loaded.')}>
        <Map
          defaultZoom={13}
          defaultCenter={{ lat: -33.860664, lng: 151.208138 }}
          onCameraChanged={(ev: MapCameraChangedEvent) =>
            console.log('camera changed:', ev.detail.center, 'zoom:', ev.detail.zoom)
          }
          mapId='da37f3254c6a6d1c'
          style={{ width: '100%', height: '100vh' }}
        >
          <CaretakerMarkers caretakers={caretakers} />
        </Map>
      </APIProvider>
    );
  }
  
  const CaretakerMarkers = (props: { caretakers: Caretaker[] }) => {
    const map = useMap();
    const router = useRouter();
    const [markers, setMarkers] = useState<{ [key: string]: Marker }>({});
    const clusterer = useRef<MarkerClusterer | null>(null);
  
    useEffect(() => {
      if (map && !clusterer.current) {
        clusterer.current = new MarkerClusterer({ map });
      }
  
      const newMarkers: { [key: string]: Marker } = {};
      props.caretakers.forEach((caretaker) => {
        const marker = new google.maps.Marker({
          position: caretaker.location,
          map,
          title: caretaker.name,
        });
  
        const infoWindow = new google.maps.InfoWindow({
          content: `
            <div style="display: flex; align-items: center;">
              <img src="${caretaker.avatar}" alt="${caretaker.name}" style="width: 50px; height: 50px; border-radius: 50%; margin-right: 10px;" />
              <div>
                <h3>${caretaker.name}</h3>
                <p>⭐ ${caretaker.starRating}</p>
                <p>Services: ${caretaker.services.join(', ')}</p>
                <p>Availability: ${caretaker.availability}</p>
                <p>Rates: ${caretaker.rates}</p>
              </div>
            </div>
          `,
        });
  
        infoWindow.open(map, marker); // Open info window when the map is launched
  
        marker.addListener('click', () => {
          infoWindow.open(map, marker);
          setTimeout(() => {
            router.push(`/search/caretaker/${caretaker.id}`);
          }); 
        });
  
        newMarkers[caretaker.id] = marker;
        clusterer.current?.addMarker(marker);
      });
  
      setMarkers(newMarkers);
  
      return () => {
        Object.values(newMarkers).forEach((marker) => marker.setMap(null));
        clusterer.current?.clearMarkers();
      };
    }, [map, props.caretakers]);
  
    return null;
  };