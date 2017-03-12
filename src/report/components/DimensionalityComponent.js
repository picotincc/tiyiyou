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
      selector: '.radar-map'
    }
  }

  serializeData(value) {
    const mapData = this.state.setting.titles.map(item => {
      return value.categories[item].score / value.categories[item].total_score;
    });

    const mean = mapData.reduce((prev, curr) => (prev + curr), 0) / mapData.length;
    const meanMapData = this.state.setting.titles.map(item => mean);

    this.setState({
      data: {
        mapData,
        meanMapData,
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
      const setting = {
        dimensionalityCount: 7,
        dimensionalitySize: 5,
        titles: ['手眼协调', '灵敏', '平衡', '手部协调', '爆发力', '动作协调', '耐力'],
        selector: '.radar-map',
        fontSize: parseInt(document.documentElement.style.fontSize.split('p')[0])
      };
      const radarMap = new RadarMap({ setting });
      radarMap.draw(this.state.data.mapData, 1, { fillColor: 'rgba(245,166,35,0.24)', strokeColor: '#F5A623'});
      radarMap.draw(this.state.data.meanMapData, 2, { fillColor: 'rgba(101,201,78,0.16)', strokeColor: '#65C94E'});
    });
  }

  componentDidMount() {
    Service.getInstance().fetchCategoryInfo(this.props.id).then(result => {
      this.serializeData(result);
    });
  }

  createLowContent(data) {
    const titles = data.map(item => item.dimenName);
    titles.unshift('纬度');
    const projects = data.map(item => item.subjects);
    projects.unshift('项目');

    const $titles = titles.map(item => {
      return (<p key={'title' + item} className='title'>{item}</p>);
    });
    const $projects = projects.map(item => {
      return (<p key={'project' + item} className='project'>{item}</p>);
    });

    return (<div className='content'>
      <div className='item content-left'>{$titles}</div>
      <div className='item content-right'>{$projects}</div>
    </div>);
  }

  render() {
    if (!this.state.data) {
      return (<div />);
    }
    return (<div className="tyu-dimensionality">
    <img src='/imgs/纬度装饰1@3x.png' className='fixed-dece-left' />
    <img src='/imgs/纬度装饰2@3x.png' className='fixed-dece-right' />
      <div className='map-content'>
        <div className='header'>
          <img src='/imgs/标题左.png'/>
          <span className='big-font'>纬度</span>
          <img src='/imgs/标题右.png'/>
        </div>
        <div className='annotation little-font'>
          <div className='annotation-item'>
            <span className='icon yellow' />
            <span>维度总结</span>
          </div>
          <div className='annotation-item'>
            <span className='icon green' />
            <span>平均值</span>
          </div>
        </div>
        <div className='radar-map' />
      </div>
      <div className='low-content'>
        <div className='header'>
          <img src='/imgs/标题左.png'/>
          <span className='big-font'>低纬度分数</span>
          <img src='/imgs/标题右.png'/>
        </div>
        {this.createLowContent(this.state.data.lowData)}
      </div>
    </div>);
  }
}
