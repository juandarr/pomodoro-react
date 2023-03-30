import './App.css';
import './bootstrap.min.css';
import React from 'react';
import 'bootstrap-icons/font/bootstrap-icons.css';

//Resources
//Color themes currently available in the app
const colorThemes = ['totalDark', 'passionVibes', 'seriousMood'];
//Sound alarms currently available in the app
const alarmSounds = [{ name: 'Zelda bell', fileName: 'zelda-bell.mp3' }, { name: 'Tin-ton', fileName: 'tin-ton.mp3' },
{ name: 'Tin', fileName: 'tin.mp3' }, { name: 'Plane arrival', fileName: 'plane-arrival.mp3' }, { name: 'Old train', fileName: 'old-train.mp3' },
{ name: 'Happy break', fileName: 'happy-break.mp3' }, { name: 'Glass', fileName: 'glass.mp3' }, { name: 'Drum bass', fileName: 'drum-bass.mp3' },
{ name: 'Drum', fileName: 'drum.mp3' }, { name: 'Bell', fileName: 'bell.mp3' }];


const events = { "0": "session", "1": "break" };

type UpArrowIconProps = {
  down: string,
  color: string
}

type buttonProps = {
  color: string
}

//Main action buttons
const UpArrowIcon = (props: UpArrowIconProps) => (<svg className={"iconColor " + props.down} xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill={props.color}><g><rect fill="none" height="24" width="24" /></g><g><g><polygon points="6,17.59 7.41,19 12,14.42 16.59,19 18,17.59 12,11.59" /><polygon points="6,11 7.41,12.41 12,7.83 16.59,12.41 18,11 12,5" /></g></g></svg>);

const PlayIcon = (props: buttonProps) => (<svg className={"iconColor"} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={props.color}><path d="M0 0h24v24H0V0z" fill="none" /><path d="M10 16.5l6-4.5-6-4.5zM12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-4.41 0-8-3.59-8-8s3.59-8 8-8 8 3.59 8 8-3.59 8-8 8z" /></svg>);

const PauseIcon = (props: buttonProps) => (<svg className={"iconColor"} xmlns="http://www.w3.org/2000/svg" height="24px" viewBox="0 0 24 24" width="24px" fill={props.color}><path d="M0 0h24v24H0V0z" fill="none" /><path d="M13 8h2v8h-2zM9 8h2v8H9zm3 14c5.52 0 10-4.48 10-10S17.52 2 12 2 2 6.48 2 12s4.48 10 10 10zm0-18c4.41 0 8 3.59 8 8s-3.59 8-8 8-8-3.59-8-8 3.59-8 8-8z" /></svg>);

const ResetIcon = (props: buttonProps) => (<svg className={"iconColor"} xmlns="http://www.w3.org/2000/svg" enableBackground="new 0 0 24 24" height="24px" viewBox="0 0 24 24" width="24px" fill={props.color}><g><path d="M0,0h24v24H0V0z" fill="none" /></g><g><g><path d="M12,5V2L8,6l4,4V7c3.31,0,6,2.69,6,6c0,2.97-2.17,5.43-5,5.91v2.02c3.95-0.49,7-3.85,7-7.93C20,8.58,16.42,5,12,5z" /><path d="M6,13c0-1.65,0.67-3.15,1.76-4.24L6.34,7.34C4.9,8.79,4,10.79,4,13c0,4.08,3.05,7.44,7,7.93v-2.02 C8.17,18.43,6,15.97,6,13z" /></g></g></svg>);

type TitleProps = {
  name: string
}

//Title component
const Title = (props: TitleProps) => (<div id="title">
  <h1 className="pomodoro-tc2 stroke-thick"><em className="pomodoro-tc1">my</em>{props.name}</h1>
</div>);

type EventLengthProps = {
  event: string,
  color: string,
  timeLength: number,
  playState: boolean,
  settingsOpen: boolean,
  eventTimeController: (event: any) => void, 
}

class EventLength extends React.Component<EventLengthProps> {

  render() {
    const event = this.props.event;
    const color = this.props.color;
    return (<div id={event + "-control"} className="d-flex flex-column align-items-center">
      <h2 id={event + "-label"} className={'stroke-thin event-label ' + color}>{event[0].toUpperCase() + event.slice(1)} <em>length</em></h2>
      <div id={event + "-buttons"} className="d-flex justify-content-evenly align-items-center event-buttons">
        <button className="d-flex justify-content-center align-items-center btn-link"
          id={event + "-increment"} data-bs-toggle="tooltip" data-bs-placement="right"
          title={event[0].toUpperCase() + event.slice(1) + " time up"} onClick={this.props.eventTimeController} disabled={this.props.playState || this.props.settingsOpen} value='+'>
          <UpArrowIcon color="#000000" down=""/>
          {/*<img src="resources/arrow-up.svg" alt={event + " time up"} />*/}
        </button>
        <div id={event + "-length"} className={"d-flex justify-content-center event-length stroke-thin " + color}>{this.props.timeLength}</div>
        <button className="d-flex justify-content-center align-items-center btn-link"
          id={event + "-decrement"} data-bs-toggle="tooltip" data-bs-placement="right"
          title={event[0].toUpperCase() + event.slice(1) + " time down"} onClick={this.props.eventTimeController} disabled={this.props.playState || this.props.settingsOpen} value='-'>
          {/*<img src="resources/arrow-down.svg" alt={event + " time down"} />*/}
          <UpArrowIcon color="#000000" down="down" />
        </button>
      </div></div>);
  }
}

type EventsControllerProps = {
  sessionLength: number,
  breakLength: number,
  playState: boolean,
  settingsOpen: boolean,
  eventTimeController: (event: any) => void, 
}

class EventsController extends React.Component<EventsControllerProps> {
  render() {
    return (<div id="controllers" className="d-flex justify-content-evenly">
      <EventLength event="session" color="session-tc" timeLength={this.props.sessionLength} eventTimeController={this.props.eventTimeController} playState={this.props.playState} settingsOpen={this.props.settingsOpen} />
      <EventLength event="break" color="break-tc" timeLength={this.props.breakLength} eventTimeController={this.props.eventTimeController} playState={this.props.playState} settingsOpen={this.props.settingsOpen} />
    </div>);
  }
}

type TimerDisplayProps = typeof TimerDisplay.defaultProps & {
  eventIndex: number,
  timeLeft: number[]
}

type MapStrStr = {
  [key: string]: string;
}

class TimerDisplay extends React.Component<TimerDisplayProps> {
  static defaultProps = { events: events as MapStrStr};

  timeRender(ar: number[]) {
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

type AlarmProps = {
  id: string,
  alarmSound: string
}

const Alarm = (props: AlarmProps) => (<audio id={props.id} preload="metadata" src={props.alarmSound} className="alarm-timer"></audio>);


type TimerControllerProps = {
  playState: boolean,
  settingsOpen: boolean,
  timerPlayPause: () => void,
  timerReset:() => void,
  alarmSession: string,
  alarmBreak: string
}

class TimerController extends React.Component<TimerControllerProps> {

  render() {
    return (<div id="timer-controls" className="d-flex flex-column justify-content-evenly">
      <button className="d-flex justify-content-center align-items-center btn-link" data-bs-toggle="tooltip" data-bs-placement="right" id="start_stop"
        title={(this.props.playState ? "Pause" : "Start") + " timer"} onClick={this.props.timerPlayPause} disabled={this.props.settingsOpen}>{this.props.playState ? (<PauseIcon color="#000000" />) : (<PlayIcon color="#000000" />)}</button>
      <button className="d-flex justify-content-center align-items-center btn-link" data-bs-toggle="tooltip" data-bs-placement="right" id="reset"
        title="Reset timer" onClick={this.props.timerReset} disabled={this.props.settingsOpen}><ResetIcon color="#000000" /></button>
      <Alarm id="beep" alarmSound={"resources/sounds/" + this.props.alarmSession} />
      <Alarm id="beepBreak" alarmSound={"resources/sounds/" + this.props.alarmBreak} />
    </div>);
  }
}

type TimerProps = {
  eventIndex: number,
  timeLeft: number[],
  playState: boolean,
  settingsOpen: boolean,
  timerReset: () => void,
  timerPlayPause: () => void,
  alarmSession: string,
  alarmBreak: string
}

class Timer extends React.Component<TimerProps> {
  render() {
    return (<div id="timer-container" className="d-flex justify-content-evenly">
      <TimerDisplay eventIndex={this.props.eventIndex} timeLeft={this.props.timeLeft} />
      <TimerController playState={this.props.playState} timerReset={this.props.timerReset} timerPlayPause={this.props.timerPlayPause}
        settingsOpen={this.props.settingsOpen} alarmSession={this.props.alarmSession} alarmBreak={this.props.alarmBreak} />
    </div>);
  }
}

type PomodoroProps = typeof Pomodoro.defaultProps; 

type PomodoroStates = typeof Pomodoro.defaultProps.defaultState;
  
class Pomodoro extends React.Component<PomodoroProps, PomodoroStates> {

  static defaultProps = { defaultState: { breakLength: 5, sessionLength: 25, eventIndex: 0, 
      timeLeft: [25, 0], playState: false, newEvent: false, timerId: 0, settingsOpen: false, 
      analyticsOpen: false, colorSet: 'totalDark', alarmSession: 'zelda-bell.mp3', 
      alarmBreak: 'zelda-bell.mp3', breakCount: 0, sessionCount: 0 }, events: events as MapStrStr, 
      colorThemes: colorThemes, alarmSounds: alarmSounds };
  
  private soundSession: HTMLAudioElement  = new Audio();
  private soundBreak: HTMLAudioElement = new Audio();

  constructor(props: PomodoroProps) {
    super(props);
    this.state = this.props.defaultState;
    this.eventTimeController = this.eventTimeController.bind(this);
    this.timerReset = this.timerReset.bind(this);
    this.timerPlayPause = this.timerPlayPause.bind(this);
    this.timer = this.timer.bind(this);
    this.toggleSettings = this.toggleSettings.bind(this);
    this.selectTheme = this.selectTheme.bind(this);
    this.selectAlarm = this.selectAlarm.bind(this);
  }

  componentDidMount() {
    this.soundSession = document.getElementById('beep') as HTMLAudioElement;
    this.soundBreak = document.getElementById('beepBreak') as HTMLAudioElement;
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
          const newIndex: number = (state.eventIndex + 1) % 2;
          let tmpCounter;
          const updateState = { eventIndex: newIndex, newEvent: false, sessionCount: state.sessionCount,
          breakCount: state.breakCount, timeLeft: state.timeLeft};
          let newTimeLeft = state.timeLeft;
          if (this.props.events[newIndex] === 'break') {
            newTimeLeft = [state.breakLength, 0];
            tmpCounter = state.sessionCount + 1;
            updateState['sessionCount'] = tmpCounter;
          } else if (this.props.events[newIndex] === 'session') {
            newTimeLeft = [state.sessionLength, 0];
            tmpCounter = state.breakCount + 1;
            updateState['breakCount'] = tmpCounter;
          }
          updateState['timeLeft'] = newTimeLeft;
          return updateState;
        });
        this.timer();
      }, 1000);
    }
  }

  timer() {
    const timerId = setInterval(() => {
      this.setState((state) => {
        const updateState = { newEvent: state.newEvent, timeLeft: state.timeLeft};
        if (state.timeLeft[1] === 0 && state.timeLeft[0] > 0) {
          updateState['timeLeft'] = [state.timeLeft[0] - 1, 59];
        } else if (state.timeLeft[1] === 1 && state.timeLeft[0] === 0) {
          if (this.props.events[this.state.eventIndex] === 'session') {
            this.soundSession.play();
          } else {
            this.soundBreak.play();
          }

          clearInterval(this.state.timerId);
          updateState['timeLeft'] = [0,0];
          updateState['newEvent'] = true;
        } else if (state.timeLeft[1] > 0) {
          updateState['timeLeft'] = [state.timeLeft[0], state.timeLeft[1] - 1];
        }
        return updateState;
      });
    }, 1000);
    this.setState({ timerId: timerId });
  }


  timerReset() {

    if (this.props.events[this.state.eventIndex] === 'session') {
      this.soundSession.pause();
      this.soundSession.currentTime = 0;
    } else {
      this.soundBreak.pause();
      this.soundBreak.currentTime = 0;
    }

    clearInterval(this.state.timerId);
    const tmpState = { ...this.props.defaultState };
    //Preserve previous defined configurations
    tmpState.sessionCount = this.state.sessionCount;
    tmpState.breakCount = this.state.breakCount;
    tmpState.colorSet = this.state.colorSet;
    tmpState.alarmBreak = this.state.alarmBreak;
    tmpState.alarmSession = this.state.alarmSession;
    tmpState.sessionCount = this.state.sessionCount;
    tmpState.breakCount = this.state.breakCount;


    this.setState(tmpState);
  }

  timerPlayPause() {
    const newPlayState = !this.state.playState;
    if (newPlayState) { this.timer(); };
    this.setState({ playState: newPlayState });
  }

  eventTimeController(event:any) {
    const valueEvent = event.target.value;
    const lengthEvent = event.target.id.split('-')[0] === 'break' ? 'breakLength' : 'sessionLength';
    const currentEvent = this.props.events[this.state.eventIndex] + 'Length';
    this.setState((state) => {
      let newState = {'timeLeft': state.timeLeft, 'sessionLength': state.sessionLength, 
        'breakLength':state.breakLength};
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

  toggleSettings(event:any) {
    const tmp = event.target;
    const settings: HTMLElement = document.getElementById('tab-view') as HTMLElement;
    if (settings.style.visibility === 'hidden') {
      settings.style.visibility = 'visible';
      tmp.style.setProperty("border-top-left-radius", '0px', 'important');
      tmp.classList.add('settingsTheme');
      this.setState({ settingsOpen: true });
    } else {
      settings.style.visibility = 'hidden';
      tmp.style.setProperty("border-top-left-radius", '0.9vmin', 'important');
      tmp.classList.remove('settingsTheme');
      this.setState({ settingsOpen: false });
    }
  }

  selectTheme(event:any) {
    this.setState({ colorSet: event.target.value });
  }

  selectAlarm(event: any) {
    const eventType = event.target.parentNode.id;
    const value = event.target.value;
    console.log(eventType, value);
    if (eventType === 'sessionAlarm') {

      this.setState((state, props) => {
        setTimeout(() => { this.soundSession.play(); }, 100);
        return { alarmSession: value };
      });
      console.log('Sending session!');
    } else if (eventType === "breakAlarm") {
      this.setState((state, props) => {
        setTimeout(() => { this.soundBreak.play(); }, 100);
        return { alarmBreak: value };
      });
      console.log('Sending break!');
    }

  }

  render() {
    return (<div className="d-flex justify-content-between">
      <div id="pomodoro" className={"d-flex justify-content-evenly colorSet-" + this.state.colorSet}>
        <div id="pomodoro-event-counter" className="d-flex flex-column justify-content-center align-items-center">
          <div className="d-flex justify-content-start align-items-center session-count stroke-ultra-thin"><i className="bi bi-person-workspace i-event-counter"></i><div className="counter">{this.state.sessionCount}</div></div>
          <div className="d-flex justify-content-start align-items-center break-count stroke-ultra-thin"><i className="bi bi-emoji-sunglasses i-event-counter"></i><div className="counter">{this.state.breakCount}</div></div>
        </div>
        <div id="pomodoro-view" className="d-flex flex-column align-items-center justify-content-evenly">
          <Title name="Pomodoro" />
          <EventsController breakLength={this.state.breakLength} sessionLength={this.state.sessionLength} eventTimeController={this.eventTimeController} playState={this.state.playState} settingsOpen={this.state.settingsOpen} />
          <Timer timeLeft={this.state.timeLeft} settingsOpen={this.state.settingsOpen} alarmSession={this.state.alarmSession} alarmBreak={this.state.alarmBreak}
            playState={this.state.playState} eventIndex={this.state.eventIndex} timerReset={this.timerReset} timerPlayPause={this.timerPlayPause} />
        </div>
        <div id="pomodoro-menu" className="btn-group-vertical" role="group" aria-label="First group">
          <button onClick={this.toggleSettings} className="d-flex justify-content-center align-items-center btn-link tab btn-tab-start" ><i className="bi bi-gear-wide-connected i-settings"></i></button>
          <button className="d-flex justify-content-center align-items-center btn-link tab btn-tab-end"><i className="bi bi-graph-up i-settings"></i></button>
        </div>
        <div id="tab-view" style={{ visibility: 'hidden' }} className="d-flex flex-column justify-content-start align-items-center">
          <h2 className="stroke-thick settings-title">Settings</h2>
          <div id="features">
            <div id="colorTheme" className="feature d-flex justify-content-between align-items-center">
              <div className="stroke-thin pomodoro-tc2 feature-text">Color theme</div>
              <select name="colorThemes" id="theme" onChange={this.selectTheme}>
                {this.props.colorThemes.map((input, index) => (<option value={input} key={index}>{input}</option>))}
              </select>
            </div>
            <div id="sessionAlarm" className="feature d-flex justify-content-between align-items-center">
              <div className="stroke-thin session-tc feature-text">Session alarm</div>
              <select name="sessionSound" id="sessionSounds" onChange={this.selectAlarm}>
                {this.props.alarmSounds.map((input, index) => (<option value={input.fileName} key={index}>{input.name}</option>))}
              </select>
            </div>
            <div id="breakAlarm" className="feature d-flex justify-content-between align-items-center">
              <div className="stroke-thin break-tc feature-text">Break alarm</div>
              <select name="breakSound" id="breakSounds" onChange={this.selectAlarm}>
                {this.props.alarmSounds.map((input, index) => (<option value={input.fileName} key={index}>{input.name}</option>))}
              </select>
            </div>
          </div>
        </div>
      </div>
    </div >);
  }
}

function App() {
  return (
    <div className="App d-flex justify-content-between">
      <Pomodoro />
    </div>
  );
}

export default App;