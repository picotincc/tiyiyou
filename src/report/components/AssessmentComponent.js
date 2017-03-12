import React, { Component, PropTypes } from 'react';
import cn from 'classnames';
import Service from '../service/Service';

export default class AssessmentComponent extends Component {
  static propTypes = {
    id: PropTypes.number.isRequired,
  }

  static defaultProps = {
    id: null,
  }

  state = {
    data: null,
    limit: ['偏弱', '一般', '优秀'],
    colorMap: ['red', 'green', 'yellow'],
  }

  serializeData(value) {
    const data = value.map(item => {
      return {
        title: `${item.title}:`,
        level: this.state.limit[item.score],
        color: this.state.colorMap[item.score],
        desc: [item.review].concat(item.advices)
      };
    });
    this.setState({data});
  }

  componentDidMount() {
    Service.getInstance().fetchSubjectInfo(this.props.id).then((result) => {
        this.serializeData(result);
    });
  }

  createContentItem(data) {
    const descs = data.desc.map((item, index) => (<p key={index}>{item}</p>));
    return (<div key={data.title} className='content'>
      <div className='header'>
        <div className='title'>{data.title}</div>
        <div className={cn('level', data.color, 'small-font')}>{data.level}</div>
      </div>
      <div className='content-list'>
        {descs}
      </div>
    </div>);
  }

  render() {
    if (!this.state.data) {
      return (<div />);
    }
    const contents = this.state.data.map(item => this.createContentItem(item));
    return (<div className="tyu-assessment">
      <img src='/imgs/测试项目评估装饰@3x.png' className='fixed-dece' />
      <div className='header'>
        <img src='/imgs/标题左.png'/>
        <span className='big-font'>生活实例</span>
        <img src='/imgs/标题右.png'/>
      </div>
      <div className='contents'>
        {contents}
      </div>
    </div>);
  }
}
