import React, { Component, PropTypes } from 'react';
import 'jquery-circle-progress';
import cn from 'classnames';
import Modal from 'boron/DropModal';

export default class MainComponent extends Component {

  constructor(props) {
    super(props);
    this.userInfo = {
      username: '赵浩然',
      kindergarten: '南京市雨花台区景明佳园幼儿园',
      score: 86,
      scoreType: '正常',
      rankInGrade: 55.4,
      rankInClass: 64.29,
    };
    this.standardInfo = {
      titles: ['商数', '百分位', '类别'],
      data: [
        ['95以上', '3.4', '健将'],
        ['90-94', '12.4', '达人'],
        ['80-89', '68.4', '正常'],
        ['70-79', '78.5', '中下'],
        ['60-69', '90.1', '偏弱'],
        ['60以下', '100', '较低']
      ]
    }
    this.selectedStandardIndex = 2;
  }

  componentDidMount() {
    $('#tyu-radial-process').circleProgress({
      value: this.userInfo.score / 100,
      size: 200,
      fill: {
        gradient: ["rgb(102, 201, 79)", "rgb(245, 167, 41)"]
      },
      thickness: 9,
      lineCap: 'round',
      emptyFill: 'rgb(252, 234, 201)',
      reverse: true
    });
  }

  handleModelOpen = () => {
    this.refs.modal.show();
  }

  createModalContent(data) {
    const titles = data.titles.map(item => {
      return (<td key={item} className='small-font'>{item}</td>);
    });

    const trs = data.data.map((item, index) => {
      const tds = item.map(td => {
        return (<td key={td} className={cn('small-font light', { selected: index === this.selectedStandardIndex})}>{td}</td>);
      });
      return (<tr key={index}>{tds}</tr>)
    });

    return (<table className='standard-table'>
      <thead>
        <tr>{titles}</tr>
      </thead>
      <tbody>
        {trs}
      </tbody>
    </table>);
  }

  render() {
    const modalStyle = {
      width: '6rem',
      height: '7.2rem',
      'borderRadius': '.24rem',
    }
    const modalContent = this.createModalContent(this.standardInfo);

    return (<div className="tyu-main">
      <div className="header"><img src="/imgs/header.png" /></div>
      <div className="user-info">
        <div className="info-cata">
          <p>姓名：</p>
          <p>幼儿园：</p>
        </div>
        <div className="info-content">
          <p>{this.userInfo.username}</p>
          <p>{this.userInfo.kindergarten}</p>
        </div>
      </div>
      <div className='map-content'>
        <div id='tyu-radial-process' className="radial-process">
          <div className="title">
            <p className='big-font'>{this.userInfo.scoreType}</p>
            <p className='large-font'>{this.userInfo.score}</p>
          </div>
          <div className="rank-standard-model" onClick={this.handleModelOpen}>
            <img src="/imgs/notice@2x.png" /><span className='small-font '>评分标准</span>
          </div>
        </div>
      </div>
      <div className='rank'>
        <div className="grade-rank">
          <p className='small-font'>超过了全年级</p>
          <p className='big-font'>{this.userInfo.rankInGrade}%</p>
          <p className='small-font'>的宝贝</p>
        </div>
        <div className='rank-split'></div>
        <div className="class-rank">
          <p className='small-font'>超过了全班</p>
          <p className='big-font'>{this.userInfo.rankInClass}%</p>
          <p className='small-font'>的宝贝</p>
        </div>
      </div>
      <Modal ref="modal" className="custom-modal" modalStyle={modalStyle}>
        <div className="modal-content">
          <div className="header">
            <img src='/imgs/标题左.png'/>
            <span className='big-font'>评分标准</span>
            <img src='/imgs/标题右.png'/>
          </div>
          <div className='content'>{modalContent}</div>
        </div>
      </Modal>
    </div>);
  }
}
