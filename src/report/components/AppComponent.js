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
      if (res) {
        this.setState({id: res[0].id});
      }
      else {
        this.setState({id: 100});
      }
    });
  }

  render() {
    if (this.state.id === null) {
      return (<div />);
    }
    const content = this.createContent();
    return (<div className="tyu-app">
      <div className='section'>{content}</div>
      <FooterNavComponent topic={this.state.topicType} handleTopicChange={this.handleTopicChange} />
    </div>);
  }
}
