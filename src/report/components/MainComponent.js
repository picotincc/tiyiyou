import React, { Component, PropTypes } from 'react';
import 'jquery-circle-progress';

export default class MainComponent extends Component {

  componentDidMount() {
    $('#tyu-radial-process').circleProgress({
      value: 0.75,
      size: 200,
      fill: {
        gradient: ["rgb(102, 201, 79)", "rgb(245, 167, 41)"]
      },
      thickness: 10,
      lineCap: 'round',
      emptyFill: 'rgb(252, 234, 201)',
      reverse: true
    });
  }

  render() {
    return (<div className="tyu-main">
      <div id='tyu-radial-process' className="radial-process">
        <div className="title">
          <p>正常</p>
          <p>86</p>
        </div>
      </div>
    </div>);
  }
}
