import React, { Component, PropTypes } from 'react';
import Service from '../service/Service';

export default class InstanceComponent extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
  }

  static defaultProps = {
    id: null,
  }

  state = {
    data: null
  }

  serializeData(value) {
    const titles = ['手眼协调', '灵敏', '平衡', '手部协调', '爆发力', '动作协调', '耐力'];
    const data = titles.reduce((prev, curr) => {
      if (value[curr]) {
        prev.push({
          title: curr,
          desc: value[curr].example
        });
      }
      return prev;
    }, [])
    this.setState({ data });
  }

  componentDidMount() {
    Service.getInstance().fetchCategoryInfo(this.props.id).then(result => {
      this.serializeData(result.low_categories);
    });
  }

  createContent(data) {
    return (<div key={data.title + Math.random().toString()} className='item'>
      <p className='title'>{data.title}</p>
      <p className='content'>{data.desc}</p>
    </div>);
  }

  render() {
    if (!this.state.data) {
      return (<div />);
    }
    const contents = this.state.data.map(item => this.createContent(item));

    return (<div className="tyu-instance">
      <img src='/imgs/实例装饰@3x.png' className='fixed-dece' />
      <div className='header'>
        <img src='/imgs/标题左.png'/>
        <span className='big-font'>生活实例</span>
        <img src='/imgs/标题右.png'/>
      </div>
      <div className='content'>
        {contents}
      </div>
    </div>);
  }
}
