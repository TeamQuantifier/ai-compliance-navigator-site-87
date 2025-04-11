
import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

// Partner locations with coordinates [longitude, latitude]
const partnerLocations = [
  { id: 1, name: "London", coords: [-0.1276, 51.5072], region: "Europe" },
  { id: 2, name: "Paris", coords: [2.3522, 48.8566], region: "Europe" },
  { id: 3, name: "Berlin", coords: [13.4050, 52.5200], region: "Europe" },
  { id: 4, name: "Madrid", coords: [-3.7038, 40.4168], region: "Europe" },
  { id: 5, name: "Rome", coords: [12.4964, 41.9028], region: "Europe" },
  { id: 6, name: "New York", coords: [-74.0060, 40.7128], region: "North America" },
  { id: 7, name: "San Francisco", coords: [-122.4194, 37.7749], region: "North America" },
  { id: 8, name: "Chicago", coords: [-87.6298, 41.8781], region: "North America" },
  { id: 9, name: "Mexico City", coords: [-99.1332, 19.4326], region: "North America" },
  { id: 10, name: "São Paulo", coords: [-46.6333, -23.5505], region: "South America" },
  { id: 11, name: "Rio de Janeiro", coords: [-43.1729, -22.9068], region: "South America" },
];

const PartnerMap = () => {
  const mapRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    // This is a simplified map visualization without actual mapping libraries
    const drawMap = () => {
      if (!mapRef.current) return;
      
      const mapContainer = mapRef.current;
      mapContainer.innerHTML = '';
      
      // Create the base map container
      const mapVisual = document.createElement('div');
      mapVisual.className = 'relative w-full h-full bg-slate-100 overflow-hidden';
      mapVisual.style.backgroundImage = 'url("https://images.unsplash.com/photo-1589519160732-57fc6fef352b?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80")';
      mapVisual.style.backgroundSize = 'cover';
      mapVisual.style.backgroundPosition = 'center';
      
      // Add an overlay
      const overlay = document.createElement('div');
      overlay.className = 'absolute inset-0 bg-slate-900/20';
      mapVisual.appendChild(overlay);
      
      // Add region labels
      const regions = ["Europe", "North America", "South America"];
      regions.forEach((region, index) => {
        const regionLabel = document.createElement('div');
        regionLabel.className = 'absolute text-white font-bold text-xl bg-compliance-900/50 px-3 py-1 rounded-full';
        
        // Position labels in different areas
        switch(region) {
          case "Europe":
            regionLabel.style.top = '30%';
            regionLabel.style.left = '55%';
            break;
          case "North America":
            regionLabel.style.top = '35%';
            regionLabel.style.left = '25%';
            break;
          case "South America":
            regionLabel.style.top = '70%';
            regionLabel.style.left = '30%';
            break;
        }
        
        regionLabel.textContent = region;
        mapVisual.appendChild(regionLabel);
      });
      
      // Add partner location markers
      partnerLocations.forEach(location => {
        const marker = document.createElement('div');
        marker.className = 'absolute';
        
        // Convert geographic coordinates to relative positions on the map
        // This is a simplified approach for visualization
        // Real implementations would use proper mapping libraries
        const left = ((location.coords[0] + 180) / 360) * 100;
        const top = (1 - ((location.coords[1] + 90) / 180)) * 100;
        
        marker.style.left = `${left}%`;
        marker.style.top = `${top}%`;
        
        marker.innerHTML = `
          <div class="relative group">
            <div class="text-innovation-600 animate-pulse">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
            </div>
            <div class="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-2 py-1 px-2 bg-white text-compliance-900 text-xs font-medium rounded shadow-lg opacity-0 group-hover:opacity-100 transition-opacity z-10 whitespace-nowrap">
              ${location.name}
            </div>
          </div>
        `;
        
        mapVisual.appendChild(marker);
      });
      
      // Add the map visualization to the container
      mapContainer.appendChild(mapVisual);
      
      // Add a legend
      const legend = document.createElement('div');
      legend.className = 'absolute bottom-4 right-4 bg-white/80 backdrop-blur-sm p-3 rounded-lg text-sm';
      legend.innerHTML = `
        <div class="flex items-center gap-2 mb-1">
          <span class="text-innovation-600">
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-map-pin"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"></path><circle cx="12" cy="10" r="3"></circle></svg>
          </span>
          <span class="text-slate-800">Partner Location</span>
        </div>
        <div class="text-xs text-slate-600">Hover over markers to see location</div>
      `;
      mapVisual.appendChild(legend);
    };
    
    drawMap();
    
    // Redraw on resize
    window.addEventListener('resize', drawMap);
    return () => {
      window.removeEventListener('resize', drawMap);
    };
  }, []);
  
  return (
    <div className="w-full h-full flex flex-col">
      <div ref={mapRef} className="flex-grow"></div>
    </div>
  );
};

export default PartnerMap;
