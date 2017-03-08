import React from 'react';

export default function ErrorComponent(title, message) {
  return (<div className="tyu-error">
    <div className="title">{title.toString()}</div>
    <div className="message">{message.toString()}</div>
  </div>);
}
