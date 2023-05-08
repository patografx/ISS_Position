import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'tachyons';
import "./Map.css";
import "leaflet/dist/leaflet.css"
import L from 'leaflet';
import loading from "../assets/icons8-loading-circle.png";
import satellite from "../assets/satellite.png"



const Map = ({ latitude, longitude, altitude, timestamp, position }) => {

    const customIcon = L.icon({
        iconUrl: satellite,
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        popupAnchor: [0, -41]
    });

    const [isExpanded, setIsExpanded] = useState(true);


    function toggleExpanded() {
        const mainDataElement = document.getElementById("mainData");
        const hideButtonElement = document.getElementById("hideButton");
        if (mainDataElement && hideButtonElement) {
          mainDataElement.classList.toggle("hidden");
          hideButtonElement.classList.toggle("hidden");
          setIsExpanded(!isExpanded);
        }
      }
      

    return (
        <div>
            <div className="flex vh-100">
                <div id="mainData" className="absolute h-100 flex flex-wrap flex-column justify-center bg-black z-999 overflow-hidden">
                    <div className="pa3 pt0 tl">
                        <h1 className="">ISS Position</h1>
                        <h2 className="fw1">Get real time data of the International Space Station</h2>
                    </div>
                    <div className="pa3 justify-between items-center flex-wrap">
                        <h3 className="fw1 tl">{latitude}</h3>
                        <h3 className="fw1 tl">{longitude}</h3>
                        <h3 className="fw1 tl">{altitude}</h3>
                        <h3 className="fw1 tl">{timestamp}</h3>
                        <div className="flex tl mainTitle">
                            <button className="mapButton pa2 br3 pointer b--none outline-0 flex justify-center items-center " onClick={() => window.location.reload()}>
                                <img className="satellite" src="https://img.icons8.com/external-topaz-kerismaker/48/null/external-ISS-space-topaz-kerismaker.png" alt="satellite" />
                            </button>
                        </div>
                    </div>
                    <div className="pa3 justify-between items-end flex-wrap absolute bottom-0">
                        <a id="icon8" className="no-underline link white" href="https://icons8.com/icon/uRvqauJrCCGj/iss" target="blank">icons by Icons8</a>
                    </div>
                </div>
                <div className="hideButton flex items-center">
                <button id="hideButton" className="pa2 pointer b--none outline-0 z-9999" onClick={toggleExpanded}>
                        {isExpanded ? "<" : ">"}
                    </button>
                </div>
                <div className="overflow-hidden">
                    <div className="leafletMap absolute bottom-0 top-0 left-0 right-0">
                        {!position ? (
                            <div className="flex items-center">
                                <img className="loadingbar" src={loading} alt="Loading" />
                            </div>
                        ) : (
                            <div className="leafletMap absolute bottom-0 top-0 left-0 right-0">
                                {position ? (
                                    <MapContainer center={position} zoom={3} scrollWheelZoom={true} style={{ height: '100%', width: '100%' }}>

                                        <TileLayer
                                            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                                        />
                                        <Marker position={position} icon={customIcon}>
                                            <Popup>Hello, I am the ISS!</Popup>
                                        </Marker>
                                    </MapContainer>

                                ) : (
                                    ""
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Map;

