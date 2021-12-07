import React, { useState } from 'react';
import styled, { keyframes } from 'styled-components';
import Clock from 'react-clock';
import 'react-clock/dist/Clock.css';
import useInterval from '../hooks/useInterval';

const blinking = keyframes`
  0%, 100% {
    transform: scale(2) translate(0px, 8px);
  }

  50% {
    transform: scale(2) translate(-10px, 8px);
  }
`;

const Wrapper = styled.div`
  margin-top: 100px;
  display: grid;
  grid-template-columns: 260px 1fr;
  grid-template-rows: 1fr 1fr;
  row-gap: 35px;
  column-gap: 5px;

  .monitor {
    font-family: 'Tourney', sans-serif;
    font-weight: 900;
    letter-spacing: 1px;
    display: flex;
    flex-direction: column;
    justify-content: space-around;
    width: 430px;
    background-color: rgb(40, 40, 40);
    color: #fcf799;
    padding: 0.7em 1.3em;
    padding-left: 0.5em;
    border-radius: 15px;
    box-shadow: 0 0 0 15px #000;
    position: relative;

    p {
      margin: 0;
      display: flex;
      width: 100%;
      font-size: 24px;
      font-weight: bold;
    }

    span:last-child {
      margin-left: auto;
    }

    .zero {
      transform: scale(2) translateY(8px);
      font-family: sans-serif;
      animation: ${blinking} 2s infinite step-start;
    }

    .platform-label,
    .platform-num {
      font-family: 'Roboto Condensed';
      letter-spacing: -1.5px;
      width: 60px;
      text-align: center;
      margin-right: 15px;
      font-size: 22px;
    }

    .platform-num {
      font-size: 34px;
      line-height: 20px;
      font-weight: 300;
    }

    &::before {
      content: '';
      width: 2px;
      height: 97px;
      background-color: #fcf799;
      left: 72px;
      position: absolute;
    }
  }

  .clock {
    background-color: rgb(40, 40, 40);
    border-radius: 15px;
    box-shadow: 0 0 0 15px #000;
    grid-row: span 2;
  }

  .react-clock__face {
    border: none;
    margin: 8px;
  }

  .react-clock__hand__body,
  .react-clock__mark__body {
    background-color: #f0fd5b;
  }
`;

const Display = ({ data }) => {
  const [time, setTime] = useState(new Date());

  useInterval(() => setTime(new Date()), 1000);

  const platform1 = data[0].platform || '';
  const platform2 = data[1].platform || '';

  let towards1 = data[0].towards || ['', ''];
  let towards2 = data[1].towards || ['', ''];

  const countdowns1 = data[0].countdown || '';
  const countdowns2 = data[1].countdown || '';

  return (
    <Wrapper>
      <Clock
        className="clock"
        value={time}
        hourMarksLength={22}
        hourMarksWidth={7}
        minuteMarksWidth={4}
        minuteMarksLength={9}
        hourHandWidth={9}
        hourHandLength={60}
        minuteHandWidth={5}
        minuteHandLength={88}
        size={230}
        renderSecondHand={false}
      />

      <div className="monitor">
        <p>
          <span className="platform-label">Gleis</span>
          <span>{towards1[0]}</span>
          {countdowns1[0] == 0 ? <span className="zero">*</span> : <span>{countdowns1[0]}</span>}
        </p>
        <p>
          <span className="platform-num">{platform1}</span>
          <span>{towards1[1]}</span>
          {countdowns1[1] == 0 ? <span className="zero">*</span> : <span>{countdowns1[1]}</span>}
        </p>
      </div>
      <div className="monitor">
        <p>
          <span className="platform-label">Gleis</span>
          <span>{towards2[0]}</span>
          {countdowns2[0] == 0 ? <span className="zero">*</span> : <span>{countdowns2[0]}</span>}
        </p>
        <p>
          <span className="platform-num">{platform2}</span>
          <span>{towards2[1]}</span>
          {countdowns2[1] == 0 ? <span className="zero">*</span> : <span>{countdowns2[1]}</span>}
        </p>
      </div>
    </Wrapper>
  );
};

export default Display;
