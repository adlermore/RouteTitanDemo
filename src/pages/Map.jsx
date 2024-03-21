import React, { useContext, useEffect, useRef } from 'react';
import maplibregl from 'maplibre-gl';
import JsonContext from '../JsonContext';
import '../assets/scss/Map/_map.scss';

const Map = () => {
  
  const mapContainer = useRef(null);
  const map = useRef(null);
  const markers = useContext(JsonContext).stopListData ? Object.values(useContext(JsonContext).stopListData) : [];

  useEffect(() => {
    if (!markers || markers.length === 0) return;

    map.current = new maplibregl.Map({
      container: mapContainer.current,
      style: 'https://tiles.stadiamaps.com/styles/osm_bright.json',
      center: [markers[0].lng, markers[0].lat],
      zoom: 13 
    });

    map.current.on('style.load', () => {
      markers.forEach((marker, index) => {
        const defaultMarkerElement = document.createElement('div');
      
        if(marker.isCompleted){
          defaultMarkerElement.className = 'default-marker completed';
        }else{
          defaultMarkerElement.className = 'default-marker';
        }
        new maplibregl.Marker(defaultMarkerElement)
          .setLngLat([marker.lng, marker.lat])
          .addTo(map.current);

        if (index < markers.length - 1) {
          const coordinates = [
            [marker.lng, marker.lat],
            [markers[index + 1].lng, markers[index + 1].lat]
          ];

          map.current.addLayer({
            id: `line-${index}`,
            type: 'line',
            source: {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'LineString',
                  coordinates: coordinates
                }
              }
            },
            layout: {
              'line-join': 'round',
              'line-cap': 'round'
            },
            paint: {
              'line-color': '#1329FE',
              'line-width': 2
            }
          });
        }
      });
    });

    return () => map.current.remove();
  }, [markers]);

  return <div className='homepage map_container' ref={mapContainer} style={{ width: '100%', height: '500px', position: 'relative' }} />;
};

export default Map;

