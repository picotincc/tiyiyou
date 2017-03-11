import React, { Component, PropTypes } from 'react';

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
    id: 100,
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

  render() {
    const content = this.createContent();
    return (<div className="tyu-app">
      <div className='section'>{content}</div>
      <FooterNavComponent topic={this.state.topicType} handleTopicChange={this.handleTopicChange} />
    </div>);
  }
}
