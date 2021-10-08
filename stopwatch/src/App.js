import React, { Component } from 'react'
import './App.css';
import { nanoid } from 'nanoid';
//set a timer for the time to add by itself
var timer=null;
export default class App extends Component {

  state = {
    currentTime: 0,
    flag: 0,
    color: null,
    laps:[]
   
  }
  //create a function to transfer digit to a standard time format
  handleTimeFormat = t => {
    let h = parseInt(t/3600)>9?parseInt(t/3600):'0'+parseInt(t/3600)
    let m = parseInt(t % 3600 / 60) > 9 ? parseInt(t % 3600 / 60) : '0' + parseInt(t % 3600 / 60)
    let s = parseInt(t % 60) > 9 ? parseInt(t % 60) : '0' + parseInt(t % 60)
    return h+':'+m+':'+s
  }
  //create a function to handle start button
  handleStart = () => {
      //flag:0 means the timer has not starttd yet, click once to make it start
      if (this.state.flag === 0) {
      timer=setInterval(() => {
        this.setState({currentTime:this.state.currentTime+1})
      }, 1000)
        this.setState({flag:1})
      }
      //flag:1 means the timer is processing, click once to pause it
      else if (this.state.flag === 1) {
        clearInterval(timer)
        this.setState({flag:2})
      }
      //flag:2 means the timer has been paused, click once to resume it
      else {
        timer=setInterval(() => {
          this.setState({currentTime:this.state.currentTime+1})
        }, 1000)
          this.setState({flag:1})
    }
  }
  //create a function to handle reset button, click once will make flag become 0, reset timer and clear laps
  handleReset = ()=>{
    clearInterval(timer)
    this.setState({flag:0,currentTime:0,laps:[]})
  }
  //create a function to handle lap button, when timer has not been reset, click once to record a time, and add into laps
  handleLap = () => {
    if (this.state.flag !== 0) {
      this.setState({ laps: [...this.state.laps, this.handleTimeFormat(this.state.currentTime)] })
    }
  }
  //create a function to handle color change button, click to toggle between green and red color
  handleColor = ()=>{
    if (this.state.color=== 'red') {
      this.setState({color:'green'})
    } else {
      this.setState({color:'red'})
    }
  }
  render() {
    return (
      <div  className='main' style={{margin:'auto',width:400}}>
        <h1 className={this.state.color}>{this.handleTimeFormat(this.state.currentTime)}</h1>
        <div className="buttons">
          {/* change the content of button based on state flag */}
          <button onClick={this.handleStart} >{this.state.flag===0?'Start':this.state.flag===1?'Pause':'Resume'}</button>
          <button onClick={this.handleReset} >Reset</button>
          <button onClick={this.handleLap}>Lap</button>
          <button onClick={this.handleColor}>Change Color</button>
        </div>
        <ul>
        {/* use the array laps to create several li */}
          {
            // make array laps reverse to put the latest lap on top
            this.state.laps.reverse().map((lap, index, arr) => {
            return <li key={nanoid()}>lap {arr.length-index}:  {lap}</li>
          })}
        </ul>
      </div>
    )
  }
}
