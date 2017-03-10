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
      titles: ['手眼协调', '灵敏', ' 平衡', '手部协调', '爆发力', '动作协调'],
      selector: '.tyu-dimensionality',
    };
    const data = [20, 30, 40, 50, 70, 70];
    this.radarMap = new RadarMap({ setting });
    this.radarMap.draw(data, 1, { color: 'rgb(101, 201, 78)'});
    this.radarMap.draw([50, 10, 40, 90, 40, 70], 2, {});
  }

  render() {
    return (<div className="tyu-dimensionality"></div>);
  }
}
