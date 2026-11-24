'use client'

import { useEffect, useState } from 'react'
import { Animate } from '@/components/common/animate'
import { MapPin, Globe, Monitor, Smartphone, RefreshCw, AlertCircle, CheckCircle2, ExternalLink, Crosshair } from 'lucide-react'

interface IpTestData {
  ip: string
  ipinfo: Record<string, unknown>
  headers: Record<string, string | null>
}

interface GpsCoords {
  lat: number
  lng: number
  accuracy: number
}

function haversine(lat1: number, lng1: number, lat2: number, lng2: number) {
  const R = 6371
  const dLat = (lat2 - lat1) * Math.PI / 180
  const dLng = (lng2 - lng1) * Math.PI / 180
  const a = Math.sin(dLat / 2) ** 2 +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng / 2) ** 2
  return R * 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
}

export default function IpTestPage() {
  const [data, setData] = useState<IpTestData | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState('')
  const [gps, setGps] = useState<GpsCoords | null>(null)
  const [gpsLoading, setGpsLoading] = useState(false)
  const [gpsError, setGpsError] = useState('')

  async function fetchLocation() {
    setLoading(true)
    setError('')
    try {
      const ipRes = await fetch('https://api.ipify.org?format=json')
      const { ip: publicIp } = await ipRes.json()

      const res = await fetch(`/api/ip-test?ip=${publicIp}`)
      if (!res.ok) throw new Error(`HTTP ${res.status}`)
      const json = await res.json()
      setData(json)
    } catch (e) {
      setError(e instanceof Error ? e.message : 'Failed to fetch location')
    } finally {
      setLoading(false)
    }
  }

  function getGps() {
    if (!navigator.geolocation) {
      setGpsError('Geolocation not supported by this browser')
      return
    }
    setGpsLoading(true)
    setGpsError('')
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setGps({ lat: pos.coords.latitude, lng: pos.coords.longitude, accuracy: pos.coords.accuracy })
        setGpsLoading(false)
      },
      (err) => {
        setGpsError(err.message)
        setGpsLoading(false)
      },
      { enableHighAccuracy: true },
    )
  }

  useEffect(() => { fetchLocation() }, [])

  const i = data?.ipinfo || {}
  const ipinfoOk = data?.ipinfo && !('error' in (data.ipinfo as object))
  const locStr = typeof i.loc === 'string' ? i.loc : ''
  const [ipLat, ipLng] = locStr ? locStr.split(',').map(Number) : [0, 0]
  const hasIpCoords = ipLat && ipLng

  const distance = gps && hasIpCoords
    ? haversine(ipLat, ipLng, gps.lat, gps.lng).toFixed(1)
    : null

  return (
    <main className="min-h-screen bg-[#f5f5f5]">
      <div className="max-w-3xl mx-auto px-4 py-20">

        <Animate className="text-center mb-12">
          <h1 className="text-4xl font-bold text-[#111212] mb-3">IP Location Test</h1>
          <p className="text-[#929296]">
            IP-based location vs your actual GPS location — compare the difference
          </p>
        </Animate>

        {/* IP-based location */}
        <Animate delay={100} className="mb-6">
          <div className="bg-white rounded-xl border border-[#e5e5e5] overflow-hidden">
            <div className="bg-[#111212] px-6 py-4 flex items-center gap-2">
              <Globe className="w-5 h-5 text-white" />
              <h2 className="text-white font-semibold text-lg">IP Location (ipinfo.io)</h2>
            </div>
            <div className="p-6 space-y-4">
              {loading ? (
                <div className="flex items-center gap-3 text-[#929296]">
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Fetching location...
                </div>
              ) : error ? (
                <div className="flex items-center gap-2 text-red-500">
                  <AlertCircle className="w-5 h-5" />
                  {error}
                </div>
              ) : (
                <div className="space-y-4">
                  {([
                    ['IP Address', data?.ip],
                    ['City', i.city],
                    ['Region', i.region],
                    ['Country', i.country],
                    ['Latitude', ipLat || '—'],
                    ['Longitude', ipLng || '—'],
                    ['ISP', i.org],
                    ['Timezone', i.timezone],
                    ['Postal', i.postal],
                  ] as [string, unknown][]).map(([label, val]) => (
                    <div key={label} className="flex items-baseline justify-between border-b border-[#f0f0f0] pb-2">
                      <span className="text-sm text-[#929296] uppercase tracking-wider">{label}</span>
                      <span className="text-sm font-medium text-[#111212]">{String(val ?? '—')}</span>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Animate>

        {/* GPS location */}
        <Animate delay={150} className="mb-6">
          <div className="bg-white rounded-xl border border-[#e5e5e5] overflow-hidden">
            <div className="bg-[#111212] px-6 py-4 flex items-center gap-2">
              <Crosshair className="w-5 h-5 text-white" />
              <h2 className="text-white font-semibold text-lg">GPS Location (Browser)</h2>
              {gps && <CheckCircle2 className="w-4 h-4 text-green-400 ml-auto" />}
            </div>
            <div className="p-6 space-y-4">
              {!gps && !gpsLoading && !gpsError && (
                <div className="text-center py-4">
                  <p className="text-sm text-[#929296] mb-4">
                    IP location is approximate (ISP-level). Click below to get your exact GPS location.
                  </p>
                  <button
                    onClick={getGps}
                    className="inline-flex items-center gap-2 bg-[#111212] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#2a2a2a] transition-colors"
                  >
                    <Crosshair className="w-4 h-4" />
                    Get Exact Location
                  </button>
                </div>
              )}
              {gpsLoading && (
                <div className="flex items-center gap-3 text-[#929296]">
                  <RefreshCw className="w-5 h-5 animate-spin" />
                  Getting GPS location...
                </div>
              )}
              {gpsError && (
                <div className="flex items-center gap-2 text-red-500">
                  <AlertCircle className="w-5 h-5" />
                  {gpsError}
                  <button
                    onClick={getGps}
                    className="ml-auto text-sm underline hover:no-underline"
                  >
                    Retry
                  </button>
                </div>
              )}
              {gps && (
                <div className="space-y-4">
                  {([
                    ['Latitude', gps.lat],
                    ['Longitude', gps.lng],
                    ['Accuracy', `±${gps.accuracy.toFixed(0)} meters`],
                  ] as [string, unknown][]).map(([label, val]) => (
                    <div key={label} className="flex items-baseline justify-between border-b border-[#f0f0f0] pb-2">
                      <span className="text-sm text-[#929296] uppercase tracking-wider">{label}</span>
                      <span className="text-sm font-medium text-[#111212]">{String(val)}</span>
                    </div>
                  ))}
                  <a
                    href={`https://www.google.com/maps?q=${gps.lat},${gps.lng}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 mt-2 bg-[#111212] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-[#2a2a2a] transition-colors"
                  >
                    <MapPin className="w-4 h-4" />
                    Open in Google Maps
                    <ExternalLink className="w-3.5 h-3.5" />
                  </a>
                </div>
              )}
            </div>
          </div>
        </Animate>

        {/* Comparison */}
        {gps && hasIpCoords && (
          <Animate delay={200} className="mb-6">
            <div className="bg-white rounded-xl border border-[#e5e5e5] overflow-hidden">
              <div className="bg-[#111212] px-6 py-4 flex items-center gap-2">
                <Monitor className="w-5 h-5 text-white" />
                <h2 className="text-white font-semibold text-lg">Comparison</h2>
              </div>
              <div className="p-6 space-y-4">
                <div className="flex items-baseline justify-between border-b border-[#f0f0f0] pb-2">
                  <span className="text-sm text-[#929296] uppercase tracking-wider">Distance</span>
                  <span className="text-sm font-semibold text-[#111212]">{distance} km</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-[#f0f0f0] pb-2">
                  <span className="text-sm text-[#929296] uppercase tracking-wider">IP Location</span>
                  <span className="text-sm font-medium text-[#111212]">{ipLat}, {ipLng}</span>
                </div>
                <div className="flex items-baseline justify-between border-b border-[#f0f0f0] pb-2">
                  <span className="text-sm text-[#929296] uppercase tracking-wider">GPS Location</span>
                  <span className="text-sm font-medium text-[#111212]">{gps.lat}, {gps.lng}</span>
                </div>
              </div>
            </div>
          </Animate>
        )}

        <Animate delay={300} className="text-center space-x-4">
          <button
            onClick={fetchLocation}
            disabled={loading}
            className="inline-flex items-center gap-2 bg-[#111212] text-white px-6 py-3 rounded-full font-medium hover:bg-[#2a2a2a] transition-colors disabled:opacity-50"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
            Refresh IP Location
          </button>
        </Animate>

      </div>
    </main>
  )
}
