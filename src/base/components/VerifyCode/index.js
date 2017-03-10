import React, { Component } from 'react';

import './index.less';


export default class VerifyCode extends Component {

    constructor (props) {
        super(props);

        this.handleClick = this.handleClick.bind(this);
    }

    static defaultProps = {
        onCodeSend: () => {}
    }

    state = {
        disabled: false,
        text: "发送验证码",
        timer: 60
    }

    componentDidMount()
    {
        this.sendCodeBtn = this.refs["sendCodeBtn"];
    }

    componentWillUnmount()
    {
        clearInterval(this.tm);
    }

    handleClick()
    {
        const disabled = this.state.disabled;

        if (!disabled && this.props.checkPhone())
        {
            this.sendCodeBtn.classList.add("disabled");
            this.setState({
                disabled: true,
                text: "重新发送(" + 59 + ")",
                timer: 59
            });
            var self = this;
            this.tm = setInterval(() => {
                var tt = self.state.timer - 1;
                if(tt<=0)
                {
                    self.setState({
                        disabled: false,
                        text: "发送验证码",
                        timer: 60
                    });
                    this.sendCodeBtn.classList.remove("disabled");
                    clearInterval(this.tm);
                    return;
                }
                self.setState({
                    text: "重新发送(" + tt + ")",
                    timer: tt
                });
            }, 1000);
        }
    }

    render()
    {
        return (
            <div
                ref="sendCodeBtn"
                className="verify-code"
                onClick={this.handleClick}
                disabled={this.state.disabled}
            >
                {this.state.text}
            </div>
        );
    }
}
