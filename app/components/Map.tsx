'use client'

import { useEffect, useRef } from 'react'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icon
delete (L.Icon.Default.prototype as any)._getIconUrl
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
})

interface MapProps {
  selectedLocation: { lat: number; lng: number; name: string } | null
}

function MapUpdater({ selectedLocation }: MapProps) {
  const map = useMap()

  useEffect(() => {
    if (selectedLocation) {
      map.flyTo([selectedLocation.lat, selectedLocation.lng], 12, {
        duration: 2
      })
    }
  }, [selectedLocation, map])

  return null
}

export default function Map({ selectedLocation }: MapProps) {
  const mapRef = useRef<any>(null)

  return (
    <MapContainer
      center={[20, 0]}
      zoom={2}
      style={{ width: '100%', height: '100%' }}
      ref={mapRef}
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {selectedLocation && (
        <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
          <Popup>
            <strong>{selectedLocation.name}</strong>
          </Popup>
        </Marker>
      )}
      <MapUpdater selectedLocation={selectedLocation} />
    </MapContainer>
  )
}
