import React from "react";
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


    return (
        <div>

            <div class="flex vh-100">
                <div class="flex-0 flex-grow-0 w-30 pa3 flex flex-column justify-center relative mainData">
                    <div className="flex pa3 tl mainTitle">
                        <button
                            className="pa3 br3 pointer b--none outline-0 flex justify-center items-center mapButton"
                            onClick={() => window.location.reload()}
                        >
                            <img className="satellite" src="https://img.icons8.com/external-topaz-kerismaker/48/null/external-ISS-space-topaz-kerismaker.png" alt="satellite" />
                        </button>
                        <h1 className="f1">ISS Position</h1>
                    </div>
                    <div className="pa3 pt0 tl">
                        <h2 className="f2 fw1">Get real time data of the International Space Station</h2>

                    </div>
                    <div className="pa3 justify-between items-center flex-wrap">
                        <h3 className="f3 fw1 tl">{latitude}</h3>
                        <h3 className="f3 fw1 tl">{longitude}</h3>
                        <h3 className="f3 fw1 tl">{altitude}</h3>
                        <h3 className="f3 fw1 tl">{timestamp}</h3>
                    </div>
                    <div className="pa3 justify-between items-end flex-wrap absolute bottom-0">
                        <a className="no-underline link white" href="https://icons8.com/icon/uRvqauJrCCGj/iss" target="blank">icons by Icons8</a>
                    </div>
                </div>
                <div className="flex justify-center flex-grow-0 flex-shrink-0 w-70-l w-100 pa3 relative overflow-hidden mainContent">

                    {!position ? (
                        <div className="flex items-center">
                            <img className="loadingbar" src={loading} alt="Loading" />
                        </div>
                    ) : (
                        <div class="leafletMap absolute bottom-0 top-0 left-0 right-0">
                            {position ? (
                                <MapContainer center={position} zoom={3} scrollWheelZoom={false} style={{ height: '100%', width: '100%' }}>
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


        </div >
    );
};

export default Map;

