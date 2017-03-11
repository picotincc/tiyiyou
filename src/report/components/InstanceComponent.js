import React, { Component, PropTypes } from 'react';

export default class InstanceComponent extends Component {
  constructor(props) {
    super(props);
    this.data = [{
      title: '爆发力',
      desc: '爆发力是反映宝贝运动能力强弱的一项重要指标。在生活中很多运动项目需要爆发力，比如跳远，跑步，投掷等等，宝贝在玩追赶游戏时需要爆发力奔跑，走路遇到水坑时，需要爆发力奋力跃过。',
    }, {
      title: '动作协调',
      desc: '动作协调是宝贝运动能力的基础，具备优秀的动作协调能力可以让宝贝更快学习如何做复杂的动作；在遇到水坑和障碍物时，动作协调能力强的宝贝可以更轻易的跨越或避开；跳绳、跑步等运动技能都需要用到动作协调能力。',
    }]
  }

  createContent(data) {
    return (<div className='item'>
      <p className='title'>{data.title}</p>
      <p className='content'>{data.desc}</p>
    </div>);
  }

  render() {
    const contents = this.data.map(item => this.createContent(item));

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
