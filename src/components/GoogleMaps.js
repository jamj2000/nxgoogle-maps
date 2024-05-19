'use client';

import { useEffect, useRef } from 'react';
import { Loader } from '@googlemaps/js-api-loader';


export default function GoogleMaps() {
	const mapRef = useRef(null);

	useEffect(() => {
		const initializeMap = async () => {
			const loader = new Loader({
				apiKey: process.env.NEXT_PUBLIC_MAPS_API_KEY,
				version: "quarterly",
				libraries: ["places"]
			});

			const { Map } = await loader.importLibrary('maps');

			const locationInMap = {
				lat: 37.57869021751064,
				lng: -4.6471375471961025
			};

			// MARKER
			const { AdvancedMarkerElement: Marker } = await loader.importLibrary("marker")

			const options = {
				center: locationInMap,
				zoom: 10,
				mapId: 'DEMO_MAP_ID',
			};

			const map = new Map(mapRef.current, options);

			// add the marker in the map
			const marker = new Marker({
				map: map,
				position: locationInMap,
			});
		};

		initializeMap();
	}, []);

	return <div className="h-[600px]" ref={mapRef} />;
}