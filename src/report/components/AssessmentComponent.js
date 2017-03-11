import React, { Component, PropTypes } from 'react';
import Service from '../service/Service';

export default class AssessmentComponent extends Component {
    constructor(props) {
      super(props);
      this.data = [
        {
          tagName: '动作协调',
          data: [{
            title: '单脚跳:',
            level: '优秀',
            desc: [
              '您的宝贝单脚站项目得分是优秀，说明宝贝单脚站平衡能力很优秀哦，可以按照我们建议的方式继续提高哦~',
              '1、家长保护宝贝单脚屈膝站坚持8秒，屈膝可以降低重心，更容易平衡身体。',
              '2、家伙在让宝贝手臂侧平举单脚站，家长站在宝贝的侧后方扶住宝贝肘的位置，帮助宝贝单脚坚持超过10秒的时间，然后换脚练习。锻炼宝贝的单脚支撑能力及培养宝贝的平衡感。',
            ],
          }, {
            title: '脚尖站:',
            level: '一般',
            desc: [
              '您的宝贝脚尖站项目得分是优秀，说明宝贝单脚站平衡能力很优秀哦，可以按照我们建议的方式继续提高哦~',
              '1、家长保护宝贝提脚后跟不落地，喊口令“一二一”进行练习（脚踝弯曲程度不同），发展宝贝的脚踝力量。',
              '2、家伙在让宝贝原地双脚交替做抬脚尖、垫脚尖等动作，发展宝贝的脚踝力量。',
            ]
          }]
        }
      ]
    }

    componentDidMount() {

    }

    createContentItem(data) {
      const descs = data.desc.map(item => (<p>{item}</p>));
      return (<div className='content'>
        <div className='header'>
          <div className='title'>{data.title}</div>
          <div className='level'>{data.level}</div>
        </div>
        <div className='content-list'>
          {descs}
        </div>
      </div>);
    }

    createContent(data) {
      const items = data.data.map(item => this.createContentItem(item));
      return (<div className='tag'>
        <p className='tag-name'>{data.tagName}</p>
        <div className='contents'>
          {items}
        </div>
      </div>);
    }

    render() {
        const contents = this.data.map(item => this.createContent(item));
        return (<div className="tyu-assessment">
          <img src='/imgs/测试项目评估装饰@3x.png' className='fixed-dece' />
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
