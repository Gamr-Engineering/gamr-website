import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { Users, Trophy, Globe, Zap, MapPin } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// Fix for default Leaflet markers in React
import markerIcon from "leaflet/dist/images/marker-icon.png";
import markerShadow from "leaflet/dist/images/marker-shadow.png";

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface HubData {
  city: string;
  country: string;
  type: "Gaming Hub" | "Tournament" | "Community" | "University" | "Esports Team";
  name: string;
  players: number;
  events: number;
  coordinates: [number, number];
  topGames: string[];
}

const ecosystemData: HubData[] = [
  {
    city: "Lagos",
    country: "Nigeria",
    type: "Gaming Hub",
    name: "Carven Gaming Arena",
    players: 1250,
    events: 48,
    coordinates: [6.5244, 3.3792],
    topGames: ["EA Sports FC", "CODM", "PUBG Mobile"],
  },
  {
    city: "Nairobi",
    country: "Kenya",
    type: "University",
    name: "Strathmore Esports Club",
    players: 450,
    events: 12,
    coordinates: [-1.2921, 36.8219],
    topGames: ["VALORANT", "Apex Legends", "Tekken 8"],
  },
  {
    city: "Johannesburg",
    country: "South Africa",
    type: "Tournament",
    name: "Telkom VS Gaming Hub",
    players: 3200,
    events: 156,
    coordinates: [-26.2041, 28.0473],
    topGames: ["League of Legends", "CS2", "Rocket League"],
  },
  {
    city: "Cairo",
    country: "Egypt",
    type: "Esports Team",
    name: "RA'AD Headquarters",
    players: 850,
    events: 24,
    coordinates: [30.0444, 31.2357],
    topGames: ["VALORANT", "Wild Rift", "Fortnite"],
  },
  {
    city: "Accra",
    country: "Ghana",
    type: "Community",
    name: "GiS Community Center",
    players: 600,
    events: 15,
    coordinates: [5.6037, -0.187],
    topGames: ["Street Fighter 6", "Mortal Kombat 1", "EA Sports FC"],
  },
];

const MapFlyTo = ({ coords }: { coords: [number, number] }) => {
  const map = useMap();
  useEffect(() => {
    map.flyTo(coords, 10, {
      duration: 1.5,
    });
  }, [coords, map]);
  return null;
};

const EcosystemMap = () => {
  const [selectedHub, setSelectedHub] = useState<HubData | null>(null);

  return (
    <div className="relative w-full h-[600px] bg-zinc-900 rounded-[3rem] border border-zinc-800 overflow-hidden shadow-2xl">
      <MapContainer
        center={[5, 20]}
        zoom={3}
        style={{ height: "100%", width: "100%", background: "#09090b" }}
        className="z-10"
      >
        <TileLayer
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
        />
        
        {ecosystemData.map((hub, idx) => (
          <Marker 
            key={idx} 
            position={hub.coordinates}
            eventHandlers={{
              click: () => setSelectedHub(hub),
            }}
          >
            <Popup className="custom-popup">
              <div className="p-2">
                <h4 className="font-black text-black">{hub.name}</h4>
                <p className="text-xs text-zinc-600 uppercase font-bold">{hub.city}, {hub.country}</p>
              </div>
            </Popup>
          </Marker>
        ))}

        {selectedHub && <MapFlyTo coords={selectedHub.coordinates} />}
      </MapContainer>

      {/* Intelligence Overlay */}
      <AnimatePresence>
        {selectedHub && (
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: 50 }}
            className="absolute top-8 right-8 w-96 bg-black/80 backdrop-blur-2xl border border-white/10 p-10 rounded-[2.5rem] shadow-2xl z-20 pointer-events-auto"
          >
            <button 
              onClick={() => setSelectedHub(null)}
              className="absolute top-6 right-6 text-zinc-500 hover:text-white transition-colors"
            >
              ✕
            </button>
            
            <div className="flex items-center gap-3 mb-6">
               <div className="p-3 bg-blue-600 rounded-2xl shadow-[0_0_20px_rgba(37,99,235,0.4)]">
                  <MapPin className="w-5 h-5 text-white" />
               </div>
               <div>
                  <h3 className="text-2xl font-black text-white leading-none">{selectedHub.city}</h3>
                  <p className="text-[10px] text-blue-400 font-bold uppercase tracking-widest mt-1">{selectedHub.type}</p>
               </div>
            </div>

            <div className="space-y-6 mb-8">
               <div className="flex justify-between items-center p-4 bg-zinc-900/50 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3 text-zinc-400">
                     <Users className="w-4 h-4" />
                     <span className="text-xs font-bold uppercase">Community Size</span>
                  </div>
                  <span className="text-xl font-black text-white">{selectedHub.players.toLocaleString()}</span>
               </div>
               
               <div className="flex justify-between items-center p-4 bg-zinc-900/50 rounded-2xl border border-white/5">
                  <div className="flex items-center gap-3 text-zinc-400">
                     <Trophy className="w-4 h-4" />
                     <span className="text-xs font-bold uppercase">Annual Events</span>
                  </div>
                  <span className="text-xl font-black text-white">{selectedHub.events}</span>
               </div>
            </div>

            <div className="mb-8">
               <h4 className="text-[10px] text-zinc-500 font-black uppercase tracking-widest mb-4">Dominant Titles</h4>
               <div className="flex flex-wrap gap-2">
                  {selectedHub.topGames.map(game => (
                    <span key={game} className="px-3 py-1.5 bg-white/5 border border-white/10 rounded-full text-[10px] font-black text-zinc-300 uppercase">
                      {game}
                    </span>
                  ))}
               </div>
            </div>

            <button className="w-full py-4 bg-white text-black rounded-2xl font-black uppercase tracking-widest text-xs hover:bg-zinc-200 transition-colors flex items-center justify-center gap-2">
               EXPLORE CITY INTEL <Globe className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="absolute bottom-10 left-10 z-20 pointer-events-none">
         <h4 className="text-xl font-black text-white flex items-center gap-3">
            <div className="w-3 h-3 rounded-full bg-blue-500 animate-pulse" />
            Live Ecosystem Map
         </h4>
         <p className="text-xs text-zinc-500 font-medium">Interactive Geo-Spatial Intelligence Layer</p>
      </div>

      <style dangerouslySetInnerHTML={{ __html: `
        .leaflet-container {
          background: #09090b !important;
        }
        .leaflet-tile-container {
          filter: invert(100%) hue-rotate(180deg) brightness(95%) contrast(90%);
        }
        .custom-popup .leaflet-popup-content-wrapper {
          background: white;
          border-radius: 12px;
          padding: 0;
        }
        .custom-popup .leaflet-popup-tip {
          background: white;
        }
      `}} />
    </div>
  );
};

export default EcosystemMap;
