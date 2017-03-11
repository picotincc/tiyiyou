import React, { Component, PropTypes } from 'react';
import cn from 'classnames';

export default class FooterNavComponent extends Component {
  static propTypes = {
    topic: PropTypes.oneOf([ 'main', 'dimensionality', 'instance', 'assessment' ]).isRequired,
    handleTopicChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    topic: null,
    handleTopicChange: null,
  }

  constructor(props) {
    super(props);
    this.topics = {
      main: {
        className: 'index',
        title: '主页',
      },
      dimensionality: {
        className: 'rhombus',
        title: '维度',
      },
      instance: {
        className: 'triangle',
        title: '实例',
      },
      assessment: {
        className: 'message',
        title: '评价',
      }
    };
  }

  createContent() {

    const topics = [ 'main', 'dimensionality', 'instance', 'assessment' ].map(item => {
      const imgSrc = this.props.topic === item ? `/imgs/${item}selected.png` : `/imgs/${item}.png`;
      return (<li key={item} className="nav-item" onClick={() => this.props.handleTopicChange(item)}>
        <img src={imgSrc} />
        <div className={cn('item-title', 'little-font', {active: this.props.topic === item})}>{this.topics[item].title}</div>
      </li>);
    });
    return (<ul className="nav-list">{topics}</ul>)
  }

  render() {
    const content = this.createContent();
    return (<div className="tyu-footer-nav">{content}</div>);
  }
}
