import React, { Component, PropTypes } from 'react';
import RadarMap from '../D3view/RadarMap';

export default class DimensionalityComponent extends Component {

  constructor(props) {
    super(props);
  }

  componentDidMount() {
    const setting = {
      dimensionalityCount: 6,
      dimensionalitySize: 5,
      titles: ['灵敏', '平衡', '爆发力', '手部协调', '手眼协调', '动作协调'],
      selector: '.tyu-dimensionality',
    };
    const data = [20, 30, 40, 50, 70, 70];
    this.radarMap = new RadarMap({ setting });
    this.radarMap.draw(data, '.area0', {});
    this.radarMap.draw([50, 10, 40, 90, 40, 70], '.area0', {});
  }

  render() {
    return (<div className="tyu-dimensionality"></div>);
  }
}
