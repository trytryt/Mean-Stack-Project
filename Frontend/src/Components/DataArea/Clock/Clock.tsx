import React, { Component } from 'react';
import './Clock.css'; 

interface ClockState {
  time: Date;
}

class Clock extends Component<{}, ClockState> {
  private intervalID: NodeJS.Timeout;

  constructor(props: {}) {
    super(props);
    this.state = {
      time: new Date(),
    };
    this.intervalID = setInterval(() => this.tick(), 1000) as NodeJS.Timeout;
  }

  componentWillUnmount() {
    clearInterval(this.intervalID);
  }

  tick() {
    this.setState({
      time: new Date(),
    });
  }

  render() {
    const { time } = this.state;
    const hours = time.getHours();
    const minutes = time.getMinutes();
    const seconds = time.getSeconds();

    return (
      <div className="clock">
        <div
          className="hour-hand"
          style={{
            transform: `rotate(${hours * 30 + minutes * 0.5}deg)`,
          }}
        />
        <div
          className="minute-hand"
          style={{
            transform: `rotate(${minutes * 6 + seconds * 0.1}deg)`,
          }}
        />
        <div
          className="second-hand"
          style={{
            transform: `rotate(${seconds * 6}deg)`,
          }}
        />
      </div>
    );
  }
}

export default Clock;
