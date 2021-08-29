import React, { useEffect, useState } from 'react';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import useInterval from '../hooks/useInterval';

const Display = ({ data }) => {
  const [time, setTime] = useState(new Date());

  useInterval(() => setTime(new Date()), 1000);

  const line1 = data[0].line || '';
  const line2 = data[1].line || '';

  const towards1 = data[0].towards || '';
  const towards2 = data[1].towards || '';

  const countdowns1 = data[0].countdown || '';
  const countdowns2 = data[1].countdown || '';

  return (
    <>
      <Clock value={time} renderSecondHand={true} />
      <p>
        <span>{line1}</span>
        <span>{towards1}</span>
        <span>{countdowns1[0]}</span>
      </p>
      <p>
        <span>{line1}</span>
        <span>{towards1}</span>
        <span>{countdowns1[1]}</span>
      </p>
      <p>
        <span>{line2}</span>
        <span>{towards2}</span>
        <span>{countdowns2[0]}</span>
      </p>
      <p>
        <span>{line2}</span>
        <span>{towards2}</span>
        <span>{countdowns2[1]}</span>
      </p>
    </>
  );
};

export default Display;
