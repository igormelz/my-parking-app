import { MapHeader } from "@/components/Map/MapHeader";
import { useGeolocation } from "@/hooks/useGeolocation";
import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Map, { Source, Layer, type MapRef, Marker } from 'react-map-gl/maplibre';
import 'maplibre-gl/dist/maplibre-gl.css';
import parking from '../assets/circle-parking.png';

interface Position {
    lat: number;
    lon: number;
}

type TabType = "explore" | "favorites" | "saved";

export function ExplorePage() {
    const [activeTab, setActiveTab] = useState<TabType>("explore");
    const navigate = useNavigate();
    const { latitude, longitude, loading, error } = useGeolocation();
    const [viewState, setViewState] = useState({
        longitude: longitude || 30.345,
        latitude: latitude || 59.939,
        zoom: 12
    });
    const [, setShowSearchModal] = useState(false);
    const mapRef = useRef<MapRef>(null);
    const [pos, setPos] = useState<Position | null>(null);

    useEffect(() => {
        if (loading) return;
        if (error) return;
        if (longitude && latitude) {
            setPos({ lat: latitude, lon: longitude });
            //mapRef.current?.jumpTo({ center: [longitude, latitude], zoom: 14 });
        }
    }, [loading, error, longitude, latitude]);

    useEffect(() => {
        if (!mapRef.current) return;
        const map = mapRef.current.getMap();

        // Load image from public directory
        map.loadImage(parking)
            .then((res) => map.addImage('parking-icon', res.data))
            .catch((error) => console.error('Error loading parking icon:', error));
    }, []);


    return (
        <div
            style={{
                height: "100vh",
                display: "flex",
                flexDirection: "column",
                backgroundColor: "var(--tg-color-bg)",
            }}
        >
            <MapHeader
                activeTab={activeTab}
                setActiveTab={setActiveTab}
                onProfileClick={() => navigate("/profile")}
                onSearchClick={() => setShowSearchModal(true)}
            />
            <div className="flex-1 relative">
                <Map
                    {...viewState}
                    onMove={evt => setViewState(evt.viewState)}
                    //onLoad={onMapLoad}
                    style={{ width: '100%', height: '100%' }}
                    mapStyle="https://basemaps.cartocdn.com/gl/positron-gl-style/style.json"
                    ref={mapRef}
                    maxBounds={[29.5, 59.7, 31.0, 60.2]} // spb
                    cooperativeGestures={true}
                >
                    <Source
                        id="spb1"
                        type="vector"
                        url={import.meta.env.VITE_LAYER_LABEL_URL}
                    />
                    <Source
                        id="spb2"
                        type="vector"
                        url={import.meta.env.VITE_LAYER_PARKINGS_URL}
                    />
                    <Layer
                        id="parkings-line"
                        type="line"
                        source="spb2"
                        source-layer='parkings'
                        paint={{
                            "line-color": "#419cf1ff",
                            "line-width": 5,
                            'line-opacity': 0.6,
                        }}
                        filter={["==", "$type", "LineString"]}
                    />
                    {/* кружочек */}
                    <Layer
                        id="parkings-labels-circle"
                        type="circle"
                        source="spb1"
                        source-layer='labels'
                        paint={{
                            'circle-color': '#419cf1ff',
                            'circle-radius': 20,
                            'circle-opacity': 0.8,
                        }}
                        filter={["==", "$type", "Point"]}
                    />
                    <Layer
                        id="parkings-labels"
                        type="symbol"
                        source="spb1"
                        source-layer='labels'
                        layout={{
                            'text-field': [
                                "number-format",
                                ["/", ["get", "price"], 100],
                                { "min-fraction-digits": 0, "max-fraction-digits": 0 }
                            ],
                            'text-size': 13,
                            'text-allow-overlap': true,
                        }}
                        paint={{
                            'text-color': '#ffffff'
                        }}
                        filter={["==", "$type", "Point"]}
                    />
                    {pos && (
                        <Marker latitude={pos.lat} longitude={pos.lon} anchor="center">
                            <div style={{
                                width: 18, height: 18, borderRadius: 9,
                                background: "#007aff", border: "2px solid white"
                            }} />
                        </Marker>
                    )}
            </Map>
        </div>
        </div >
    );
} 