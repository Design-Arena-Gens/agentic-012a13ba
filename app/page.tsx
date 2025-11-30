'use client'

import dynamic from 'next/dynamic'
import { useState } from 'react'

const MapComponent = dynamic(() => import('./components/Map'), {
  ssr: false,
})

export default function Home() {
  const [searchQuery, setSearchQuery] = useState('')
  const [selectedLocation, setSelectedLocation] = useState<{lat: number, lng: number, name: string} | null>(null)

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    // Simple location lookup
    const locations: {[key: string]: {lat: number, lng: number, name: string}} = {
      'paris': { lat: 48.8566, lng: 2.3522, name: 'Paris, France' },
      'tokyo': { lat: 35.6762, lng: 139.6503, name: 'Tokyo, Japan' },
      'new york': { lat: 40.7128, lng: -74.0060, name: 'New York, USA' },
      'london': { lat: 51.5074, lng: -0.1278, name: 'London, UK' },
      'sydney': { lat: -33.8688, lng: 151.2093, name: 'Sydney, Australia' },
      'dubai': { lat: 25.2048, lng: 55.2708, name: 'Dubai, UAE' },
      'rome': { lat: 41.9028, lng: 12.4964, name: 'Rome, Italy' },
      'moscow': { lat: 55.7558, lng: 37.6173, name: 'Moscow, Russia' },
      'beijing': { lat: 39.9042, lng: 116.4074, name: 'Beijing, China' },
      'cairo': { lat: 30.0444, lng: 31.2357, name: 'Cairo, Egypt' },
    }

    const query = searchQuery.toLowerCase().trim()
    const location = locations[query]

    if (location) {
      setSelectedLocation(location)
    } else {
      alert('Location not found. Try: Paris, Tokyo, New York, London, Sydney, Dubai, Rome, Moscow, Beijing, or Cairo')
    }
  }

  return (
    <div style={{
      minHeight: '100vh',
      padding: '2rem',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      gap: '2rem'
    }}>
      <div style={{
        textAlign: 'center',
        color: 'white',
        marginBottom: '1rem'
      }}>
        <h1 style={{
          fontSize: '3rem',
          fontWeight: 'bold',
          marginBottom: '0.5rem',
          textShadow: '0 2px 10px rgba(0,0,0,0.2)'
        }}>
          ChatPTAtlas
        </h1>
        <p style={{
          fontSize: '1.2rem',
          opacity: 0.9
        }}>
          Explore the world with interactive maps
        </p>
      </div>

      <form onSubmit={handleSearch} style={{
        display: 'flex',
        gap: '0.5rem',
        width: '100%',
        maxWidth: '600px'
      }}>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Search for a city (e.g., Paris, Tokyo, New York)..."
          style={{
            flex: 1,
            padding: '1rem 1.5rem',
            fontSize: '1rem',
            border: 'none',
            borderRadius: '50px',
            outline: 'none',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)'
          }}
        />
        <button
          type="submit"
          style={{
            padding: '1rem 2rem',
            fontSize: '1rem',
            fontWeight: 'bold',
            color: 'white',
            background: 'linear-gradient(135deg, #f093fb 0%, #f5576c 100%)',
            border: 'none',
            borderRadius: '50px',
            cursor: 'pointer',
            boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        >
          Search
        </button>
      </form>

      <div style={{
        width: '100%',
        maxWidth: '1200px',
        height: '600px',
        background: 'white',
        borderRadius: '12px',
        padding: '1rem',
        boxShadow: '0 20px 60px rgba(0,0,0,0.3)'
      }}>
        <MapComponent selectedLocation={selectedLocation} />
      </div>

      <div style={{
        color: 'white',
        textAlign: 'center',
        opacity: 0.8,
        fontSize: '0.9rem'
      }}>
        <p>Try searching: Paris • Tokyo • New York • London • Sydney • Dubai</p>
      </div>
    </div>
  )
}
