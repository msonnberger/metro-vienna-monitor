import React, { useState, useEffect } from 'react';
import Display from './Display';
import useInterval from '../hooks/useInterval';

//data
const lines = ['U1', 'U2', 'U3', 'U4', 'U6'];

const stations = {
  U1: {
    Leopoldau: [4185, 4190],
    Großfeldsiedlung: [4184, 4189],
    'Aderklaaer Straße': [4183, 4188],
    Rennbahnweg: [4182, 4187],
    'Kagraner Platz': [4181, 4186],
    Kagran: [4127, 4102],
    'Alte Donau': [4125, 4104],
    'Kaisermühlen VIC': [4123, 4106],
    Donauinsel: [4121, 4108],
    Vorgartenstraße: [4119, 4110],
    Praterstern: [4117, 4112],
    Nestroyplatz: [4115, 4114],
    Schwedenplatz: [4113, 4116],
    Stephansplatz: [4111, 4118],
    Karlsplatz: [4109, 4120],
    Taubstummengasse: [4107, 4122],
    'Südtiroler Platz Hauptbahnhof': [4105, 4124],
    Keplerplatz: [4103, 4126],
    Reumannplatz: [4101, 4128],
    Troststraße: [4138, 4129],
    'Altes Landgut': [4137, 4130],
    Alaudagasse: [4136, 4131],
    Neulaa: [4135, 4132],
    Oberlaa: [4134, 4133],
  },
};

const Monitor = () => {
  const [line, setLine] = useState('U1');
  const [station, setStation] = useState(Object.keys(stations['U1'])[0]);
  const [departures, setDepartures] = useState(null);

  //useInterval(() => getNewDepartures(), 15000);
  useEffect(() => getNewDepartures(), [station]);

  const handleStationChange = (ev) => {
    setStation(ev.target.value);
  };

  const getNewDepartures = () => {
    const [stopId1, stopId2] = stations[line][station];
    const url = `/api/data?stopId1=${stopId1}&stopId2=${stopId2}`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => setDepartures(json));
  };

  return (
    <>
      <select value={line} onChange={(ev) => setLine(ev.target.value)}>
        {lines &&
          lines.map((line) => (
            <option key={line} value={line}>
              {line}
            </option>
          ))}
      </select>
      <select value={station} onChange={handleStationChange}>
        {Object.keys(stations[line]).map((stop) => (
          <option key={stop} value={stop}>
            {stop}
          </option>
        ))}
      </select>

      {departures && <Display data={departures} />}
    </>
  );
};

export default Monitor;
