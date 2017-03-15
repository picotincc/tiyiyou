import React, { Component, PropTypes } from 'react';
import Modal from 'boron/DropModal';

export default class ErrorComponent extends Component {
  static propTypes = {
    title: PropTypes.string.isRequired,
    message: PropTypes.string.isRequired,
    url: PropTypes.string.isRequired,
  }

  static defaultTypes = {
    title: null,
    message: null,
    url: null,
  }

  handleModelConfirm = () => {
    // this.refs.errorModal.show();
    window.location = './user.html';
  }

  componentDidMount() {
    this.refs.errorModal.show();
  }

  handleModelHide = () => {
    this.refs.errorModal.hide();
  }

  render() {
    const modalStyle = {
      width: '6rem',
      height: '7.2rem',
      'borderRadius': '.24rem',
    };
    return (<Modal ref="errorModal" className="tyu-error" modalStyle={modalStyle}>
      <div className="modal-content">
        <div className="header">
          <img src='/imgs/标题左.png'/>
          <span className='big-font'>{this.props.title}</span>
          <img src='/imgs/标题右.png'/>
        </div>
        <div className='message'>{this.props.message}</div>
        <div className='btns'>
          <a className='button red normal-font' onClick={this.handleModelHide}>取消</a>
          <a className='button green normal-font' onClick={this.handleModelConfirm}>确认</a>
        </div>
      </div>
    </Modal>);
  }
}
