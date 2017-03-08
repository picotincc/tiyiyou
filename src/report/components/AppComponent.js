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
    this.topicMap = [ 'main', 'demensionality', 'instance', 'assessment' ];
  }
  state = {
    topicType: 'main',
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
      case 'main': return (<MainComponent />);
      case 'demensionality': return (<DimensionalityComponent />);
      case 'instance': return (<InstanceComponent />);
      case 'assessment': return (<AssessmentComponent />);
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
