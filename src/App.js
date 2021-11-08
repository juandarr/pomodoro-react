import './App.css';
import './bootstrap.min.css';
import './bootstrap-icons.css';
import React from 'react';


/**
 * TODO: There is a problem with the up arrow images. The culprit is found in the img section
 * of the respective up-down buttons, for both kind of events (break and session). 
 * When defining an image embedded in a button, it is selected as the event.target when clicking over the button. 
 * Weird behaviors
 * DONE: The problem are not the images or event.target, but the test definitions
 */

const events = { 0: "session", 1: "break" };

//Title component
const Title = (props) => (<div id="title">
  <h1 className="pomodoro-tc2 stroke-thick"><em className="pomodoro-tc1">my</em>{props.name}</h1>
</div>);

class EventLength extends React.Component {

  render() {
    const event = this.props.event;
    const color = this.props.color;
    return (<div id={event + "-control"} className="d-flex flex-column align-items-center">
      <h2 className={'stroke-thin event-label ' + color}>{event[0].toUpperCase() + event.slice(1)} <em>length</em></h2>
      <div id={event + "-buttons"} className="d-flex justify-content-evenly align-items-center event-buttons">
        <button className="d-flex justify-content-center align-items-center btn-link"
          id={event + "-increment"} data-bs-toggle="tooltip" data-bs-placement="right"
          title={event[0].toUpperCase() + event.slice(1) + " time up"} onClick={this.props.eventTimeController} disabled={this.props.playState} value='+'>
          <img src="resources/arrow-up.svg" alt={event + " time up"} />
        </button>
        <div id={event + "-length"} className={"d-flex justify-content-center event-length stroke-thin " + color}>{this.props.timeLength}</div>
        <button className="d-flex justify-content-center align-items-center btn-link"
          id={event + "-decrement"} data-bs-toggle="tooltip" data-bs-placement="right"
          title={event[0].toUpperCase() + event.slice(1) + " time down"} onClick={this.props.eventTimeController} disabled={this.props.playState} value='-'>
          <img src="resources/arrow-down.svg" alt={event + " time down"} />
        </button>
      </div></div>);
  }
}

class EventsController extends React.Component {
  render() {
    return (<div id="controllers" className="d-flex justify-content-evenly">
      <EventLength event="break" color="break-tc" timeLength={this.props.breakLength} eventTimeController={this.props.eventTimeController} playState={this.props.playState} />
      <EventLength event="session" color="session-tc" timeLength={this.props.sessionLength} eventTimeController={this.props.eventTimeController} playState={this.props.playState} />
    </div>);
  }
}

class TimerDisplay extends React.Component {

  timeRender(ar) {
    return (<div className={'stroke-thin ' + (this.props.eventIndex === 0 ? "session-tc" : "break-tc")} id="time-left">{(ar[0] < 10 ? ("0" + ar[0]) : ar[0]) + ":" + (ar[1] < 10 ? ("0" + ar[1]) : ar[1])}</div>);
  }

  render() {
    const event = this.props.events[this.props.eventIndex];
    return (<div id="timer" className="d-flex flex-column align-items-center justify-content-center">
      <div className={'stroke-thin ' + (this.props.eventIndex === 0 ? "session-tc" : "break-tc")} id="timer-label">{event[0].toUpperCase() + event.slice(1)}</div>
      {this.timeRender(this.props.timeLeft)}
    </div>);
  }
}
TimerDisplay.defaultProps = { events: events };

const Alarm = (props) => (<audio id="beep" src={props.alarmFile} className="alarm-timer"></audio>);


class TimerController extends React.Component {

  render() {
    return (<div id="timer-controls" className="d-flex flex-column justify-content-evenly">
      <button className="d-flex justify-content-center align-items-center btn-link" data-bs-toggle="tooltip" data-bs-placement="right" id="start_stop"
        title={(this.props.playState ? "Pause" : "Start") + " timer"} onClick={this.props.timerPlayPause}><img src={"resources/" + (this.props.playState ? "pause" : "play") + ".svg"} alt="play-pause button" /></button>
      <button className="d-flex justify-content-center align-items-center btn-link" data-bs-toggle="tooltip" data-bs-placement="right" id="reset"
        title="Reset timer" onClick={this.props.timerReset}><img src="resources/reset.svg" alt="reset button" /></button>
      <Alarm alarmFile="resources/bell-tower.mp3" />
    </div>);
  }
}

class Timer extends React.Component {
  render() {
    return (<div id="timer-container" className="d-flex justify-content-evenly">
      <TimerDisplay eventIndex={this.props.eventIndex} timeLeft={this.props.timeLeft} />
      <TimerController playState={this.props.playState} timerReset={this.props.timerReset} timerPlayPause={this.props.timerPlayPause} />
    </div>);
  }
}

class Pomodoro extends React.Component {

  constructor(props) {
    super(props);
    this.state = this.props.defaultState;
    this.eventTimeController = this.eventTimeController.bind(this);
    this.timerReset = this.timerReset.bind(this);
    this.timerPlayPause = this.timerPlayPause.bind(this);
    this.timer = this.timer.bind(this);
  }

  componentDidMount() {
    this.sound = document.getElementById('beep');
  }

  componentDidUpdate() {
    //Stop the timer when the pause button is pressed
    if (!this.state.playState) {
      clearInterval(this.state.timerId);
    }
    //Start new event in case the flag newEvent has been set to true
    if (this.state.newEvent) {

      setTimeout(() => {
        this.setState((state) => {
          const newIndex = (state.eventIndex + 1) % 2;
          let newTimeLeft;
          if (this.props.events[newIndex] === 'break') {
            newTimeLeft = [state.breakLength, 0];
          } else if (this.props.events[newIndex] === 'session') {
            newTimeLeft = [state.sessionLength, 0];
          }
          return { eventIndex: newIndex, timeLeft: newTimeLeft, newEvent: false };
        });
        this.timer();
      }, 1000);
    }
  }

  timer() {
    const timerId = setInterval(() => {
      this.setState((state) => {
        if (state.timeLeft[1] === 0 && state.timeLeft[0] > 0) {
          return { timeLeft: [state.timeLeft[0] - 1, 59] };
        } else if (state.timeLeft[1] === 1 && state.timeLeft[0] === 0) {
          this.sound.play();
          clearInterval(this.state.timerId)
          return { timeLeft: [0, 0], newEvent: true };
        } else if (state.timeLeft[1] > 0) {
          return { timeLeft: [state.timeLeft[0], state.timeLeft[1] - 1] };
        }
      });
    }, 1000);
    this.setState({ timerId: timerId });
  }


  timerReset() {
    this.sound.pause();
    this.sound.currentTime = 0;
    clearInterval(this.state.timerId);
    this.setState(this.props.defaultState);
  }

  timerPlayPause() {
    const newPlayState = !this.state.playState;
    if (newPlayState) { this.timer(); };
    this.setState({ playState: newPlayState });
  }

  eventTimeController(event) {
    const valueEvent = event.target.parentElement.value;
    const lengthEvent = event.target.parentElement.id.split('-')[0] === 'break' ? 'breakLength' : 'sessionLength';
    const currentEvent = this.props.events[this.state.eventIndex] + 'Length';
    this.setState((state) => {
      const newState = {};
      let newLength;
      if (valueEvent === '+') {
        newLength = state[lengthEvent] <= 59 ? (state[lengthEvent] + 1) : state[lengthEvent];
      } else {
        newLength = state[lengthEvent] > 1 ? (state[lengthEvent] - 1) : state[lengthEvent];
      }
      newState[lengthEvent] = newLength;
      if (lengthEvent === currentEvent) {
        newState['timeLeft'] = [newLength, 0];
      }
      return newState;
    });
  }

  render() {
    return (<div id="pomodoro" className="d-flex flex-column align-items-center justify-content-evenly colorSet-seriousMood">
      <Title name="Pomodoro" />
      <EventsController breakLength={this.state.breakLength} sessionLength={this.state.sessionLength} eventTimeController={this.eventTimeController} playState={this.state.playState} />
      <Timer timeLeft={this.state.timeLeft} playState={this.state.playState} eventIndex={this.state.eventIndex} timerReset={this.timerReset} timerPlayPause={this.timerPlayPause} />
    </div>);
  }
}

Pomodoro.defaultProps = { defaultState: { breakLength: 5, sessionLength: 25, eventIndex: 0, timeLeft: [25, 0], playState: false, newEvent: false, timerId: '' }, events: events };

function App() {
  return (
    <div className="App">
      <Pomodoro />
    </div>
  );
}

export default App;