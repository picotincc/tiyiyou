import React, { Component, PropTypes } from 'react';
import Service from '../service/Service';

import AssessmentComponent from './AssessmentComponent';
import DimensionalityComponent from './DimensionalityComponent';
import ErrorComponent from './ErrorComponent';
import FooterNavComponent from './FooterNavComponent';
import InstanceComponent from './InstanceComponent';
import MainComponent from './MainComponent';

export default class AppComponent extends Component {
  constructor(props) {
    super(props);
    this.topicMap = [ 'main', 'dimensionality', 'instance', 'assessment' ];
  }
  state = {
    topicType: 'main',
    id: null,
    errorMessage: null,
  }

  handleTopicChange = (topicName) => {
    if (this.topicMap.includes(topicName) && this.state.topicName !== topicName) {
      this.setState({
          topicType: topicName,
      });
    }
  }

  createContent() {
    switch(this.state.topicType) {
      case 'main': return (<MainComponent id={this.state.id} />);
      case 'dimensionality': return (<DimensionalityComponent id={this.state.id} />);
      case 'instance': return (<InstanceComponent id={this.state.id} />);
      case 'assessment': return (<AssessmentComponent id={this.state.id} />);
      default: return (<ErrorComponent title="未发现该页面" message="请确认刷新"/>)
    }
  }

  componentDidMount() {
    Service.getInstance().fetchStudentId().then((res) => {
      // res [{id: xx}]
      if (Array.isArray(res) && res.length > 0) {
        this.setState({id: res[0].id, res: res});
      }
      else {
        this.setState({
          errorMessage: '您尚未绑定宝宝，请点击确认，跳转宝宝绑定页面，或者取消',
        });
      }
    }, (error) => {
      this.setState({
        errorMessage: '请检查网络请求失败' + error.toString()
      });
    });
  }

  render() {
    if (this.state.id === null) {
      return (<div className="tyu-app">
        <div className='section'>
          <ErrorComponent title='出错信息' message={this.state.errorMessage || ""} url='/user.html' />
        </div>
        <FooterNavComponent topic={this.state.topicType} handleTopicChange={this.handleTopicChange} />
      </div>);
    }
    const content = this.createContent();
    return (<div className="tyu-app">
      <div className='section'>{content}</div>
      <FooterNavComponent topic={this.state.topicType} handleTopicChange={this.handleTopicChange} />
    </div>);
  }
}
