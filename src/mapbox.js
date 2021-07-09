import React,{useState} from 'react';
import ReactMapboxGl from "react-mapbox-gl";
import DrawControl from "react-mapbox-gl-draw";
import "@mapbox/mapbox-gl-draw/dist/mapbox-gl-draw.css";

const Map = ReactMapboxGl({
  accessToken: process.env.REACT_APP_MAPBOX_TOKEN
});

const Hoodmap = () => {
  const [coordinates, setCoordinates] = useState([]);
  const onDrawCreate = ({ features }) => {
    console.log('CREATE:: ', features);
    setCoordinates([...features[0].geometry.coordinates[0]]);
  };

  const onDrawUpdate = ({ features }) => {
    console.log('UPDATE:: ', features);
  };

  return (
    <div>
      <h2>Gimme Them Coordinates!</h2>
      <Map
        style="mapbox://styles/mapbox/streets-v11" // eslint-disable-line
        containerStyle={{
          height: "600px",
          width: "100vw"
        }}
        center={[-105.0844, 40.5353]}
      >
        <DrawControl onDrawCreate={onDrawCreate} onDrawUpdate={onDrawUpdate} />
      </Map>
      <div>{coordinates.map(c => <div style={{margin: '12px', textAlign: 'left'}}>LAT: {c[0]}, LONG: {c[1]}</div>)}</div>
    </div>
  );
}

export default Hoodmap;