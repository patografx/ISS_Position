import React, { Component } from "react";
import Map from "../component/Map";
import { throttle } from 'lodash';
import 'tachyons';



class App extends Component {
  constructor() {
    super();
    this.state = {
      latitude: null,
      longitude: null,
      altitude: null,
      timestamp: null,
      position: null,
    };
  }

  componentDidMount() {
    this.fetchISSData = throttle(this.fetchISSData, 2000); // Throttle
    this.fetchISSData();
  }

  fetchISSData = async () => {
    try {
      const response = await fetch('https://api.wheretheiss.at/v1/satellites/25544');
      const data = await response.json();
      const { latitude, longitude, altitude, timestamp } = data;
      const position = [latitude, longitude];
      this.setState({ latitude, longitude, altitude, timestamp, position });

    } catch (error) {
      console.error('Error fetching data: ', error);
    }
  }


  // async componentDidMount() {
  //   try {
  //     const response = await fetch('http://api.open-notify.org/iss-now.json');
  //     const data = await response.json();
  //     const { iss_position: { latitude, longitude }, timestamp } = data;
  //     const position = [latitude, longitude];
  //     this.setState({ latitude, longitude, timestamp, position });

  //   } catch (error) {
  //     console.error('Error fetching data: ', error);
  //   }
  // }


  render() {
    this.fetchISSData();
    const { latitude, longitude, altitude, timestamp, position } = this.state;

    return (
      <>
        <div>
          <div>
            <Map
              latitude={`latitude: ${latitude}`}
              longitude={`longitude: ${longitude}`}
              timestamp={`timestamp: ${timestamp}`}
              altitude={`altitude: ${altitude}`}
              position={position}
            />

          </div>
        </div>
      </>
    );
  }
}

export default App;