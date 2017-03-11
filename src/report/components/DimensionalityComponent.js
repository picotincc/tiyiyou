import React, { Component, PropTypes } from 'react';
import RadarMap from '../D3view/RadarMap';
import Service from '../service/Service';

export default class DimensionalityComponent extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
  }

  static defaultProps = {
    id: null,
  }

  state = {
    data: null,
    setting: {
      dimensionalityCount: 7,
      dimensionalitySize: 5,
      titles: ['手眼协调', '灵敏', '平衡', '手部协调', '爆发力', '动作协调', '耐力'],
      selector: '.tyu-dimensionality',
    },
  }

  serializeData(value) {
    this.setState({
      data: {
        mapData: this.state.setting.titles.map(item => {
          return value.categories[item].score / value.categories[item].total_score;
        }),
        lowData: this.state.setting.titles.reduce((prev, curr) => {
          if (value.low_categories[curr]) {
            prev.push({
              dimenName: curr,
              subjects: value.low_categories[curr].subjects.join('、')
            });
          }
          return prev;
        }, [])
      }
    }, () => {
      const radarMap = new RadarMap({ setting: this.state.setting });
      radarMap.draw(this.state.data.mapData, 1, { color: 'rgb(101, 201, 78)'});
    });
  }

  componentDidMount() {
    Service.getInstance().fetchCategoryInfo(this.props.id).then(result => {
      this.serializeData(result);
    });
  }

  render() {
    if (!this.state.data) {
      return (<div />);
    }
    return (<div className="tyu-dimensionality"></div>);
  }
}
