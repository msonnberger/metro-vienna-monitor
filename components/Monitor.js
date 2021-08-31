import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import Display from './Display';
import useInterval from '../hooks/useInterval';

//data
const lines = ['U1', 'U2', 'U3', 'U4', 'U6'];

const lineData = {
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
  U2: {
    Schottentor: [4203, 4212],
    Schottenring: [4201, 4214],
    Taborstraße: [4261, 4262],
    Praterstern: [4260, 4263],
    'Messe Prater': [4259, 4264],
    Krieau: [4258, 4265],
    Stadion: [4257, 4266],
    Donaumarina: [4255, 4268],
    Donaustadtbrücke: [4256, 4267],
    Stadlau: [4254, 4269],
    Hardeggasse: [4253, 4270],
    Donauspital: [4252, 4271],
    Aspernstraße: [4251, 4272],
    Hausfeldstraße: [4279, 4274],
    'Aspern Nord': [4278, 4275],
    Seestadt: [4277, 4276],
  },
  U3: {
    Ottakring: [4436, 4931], // 4436 from Hütteldorf because Ottakring (4430) is broken
    Kendlerstraße: [4929, 4932],
    'Hütteldorfer Straße': [4928, 4933],
    Johnstraße: [4925, 4926],
    Westbahnhof: [4920, 4921],
    Zieglergasse: [4919, 4922],
    Neubaugasse: [4918, 4923],
    Volkstheater: [4908, 4909],
    Herrengasse: [4907, 4910],
    Stephansplatz: [4906, 4911],
    Stubentor: [4905, 4912],
    Landstraße: [4904, 4913],
    Rochusgasse: [4903, 4914],
    'Kardinal-Nagl-Platz': [4902, 4915],
    Schlachthausgasse: [4901, 4916],
    Erdberg: [4900, 4917],
    Gasometer: [4941, 4934],
    Zippererstraße: [4940, 4935],
    Enkplatz: [4939, 4936],
    Simmering: [4938, 4937],
  },
  U4: {
    Hütteldorf: [4436, 4401],
    'Ober St. Veit': [4434, 4403],
    'Unter St. Veit': [4432, 4405],
    Braunschweiggasse: [4430, 4407],
    Hietzing: [4428, 4409],
    Schönbrunn: [4426, 4411],
    'Meidling Hauptstraße': [4424, 4413],
    Längenfeldgasse: [4438, 4437],
    Margaretengürtel: [4422, 4415],
    Pilgramgasse: [4420, 4417],
    Kettenbrückengasse: [4418, 4419],
    Karlsplatz: [4416, 4421],
    Stadtpark: [4414, 4423],
    Landstraße: [4412, 4425],
    Schwedenplatz: [4410, 4427],
    Schottenring: [4408, 4429],
    'Roßauer Lände': [4406, 4431],
    Friedensbrücke: [4404, 4433],
    Spittelau: [4440, 4439],
    Heiligenstadt: [4402, 4435],
  },
  U6: {
    Floridsdorf: [4645, 4646],
    'Neue Donau': [4644, 4647],
    Handelskai: [4643, 4648],
    'Dresdner Straße': [4642, 4649],
    Jägerstraße: [4641, 4650],
    Spittelau: [4627, 4651],
    'Nußdorfer Straße': [4626, 4603],
    'Währinger Straße Volksoper': [4625, 4604],
    'Michelbeuern AKH': [4624, 4605],
    'Alser Straße': [4623, 4606],
    'Josefstädter Straße': [4622, 4607],
    Thaliastraße: [4621, 4608],
    'Burggasse Stadthalle': [4620, 4609],
    Westbahnhof: [4619, 4610],
    'Gumpendorfer Straße': [4618, 4611],
    Längenfeldgasse: [4617, 4612],
    Niederhofstraße: [4616, 4613],
    'Bahnhof Meidling': [4615, 4614],
    Tscherttegasse: [4640, 4629],
    'Am Schöpfwerk': [4639, 4630],
    Alterlaa: [4638, 4631],
    'Erlaaer Straße': [4637, 4632],
    Perfektastraße: [4636, 4633],
    Siebenhirten: [4635, 4634],
  },
};

const StyledForm = styled.form`
  display: flex;
  gap: 5px;

  select {
    font-family: 'Helvetica';
    font-weight: bold;
    font-size: 20px;
    border: 5px solid black;
    background-color: #333;
    color: #fcf799;
    padding: 0.5em;
    border-radius: 10px;
  }
`;

const Heading = styled.h1`
  font-family: 'Helvetica', sans-serif;
  margin-top: -100px;
  margin-bottom: 100px;
  font-size: 42px;
`;

const Monitor = () => {
  const [line, setLine] = useState('U1');
  const [station, setStation] = useState(Object.keys(lineData['U1'])[0]);
  const [departures, setDepartures] = useState(null);

  useInterval(() => getNewDepartures(), 15000);
  useEffect(() => getNewDepartures(), [station]);

  const getNewDepartures = () => {
    const stopId1 = lineData[line][station][0];
    const stopId2 = lineData[line][station][1];
    const url = `api/data?stopId1=${stopId1}&stopId2=${stopId2}`;
    fetch(url)
      .then((res) => res.json())
      .then((json) => setDepartures(json));
  };

  const handleLineChange = (ev) => {
    setLine(ev.target.value);
    setStation(Object.keys(lineData[ev.target.value])[0]);
  };

  return (
    <>
      <Heading>Vienna Metro Monitor</Heading>
      <StyledForm>
        <select value={line} onChange={handleLineChange}>
          {lines &&
            lines.map((line) => (
              <option key={line} value={line}>
                {line}
              </option>
            ))}
        </select>
        <select value={station} onChange={(ev) => setStation(ev.target.value)}>
          {Object.keys(lineData[line]).map((stop) => (
            <option key={stop} value={stop}>
              {stop}
            </option>
          ))}
        </select>
      </StyledForm>
      {departures && <Display data={departures} />}
    </>
  );
};

export default Monitor;
