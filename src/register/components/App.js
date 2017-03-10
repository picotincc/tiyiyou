import React, { Component } from 'react';
import Input from '../../base/components/Input';
import VerifyCode from '../../base/components/VerifyCode';
const IMG_URL = "/imgs";

export default class App extends Component {
    
    constructor (props) {
        super(props);
        this.checkPhone = this.checkPhone.bind(this);
    }

    state = { 
        phone: ""
    }

    checkPhone()
    {
        return true;
    }
    
    render() 
    {
        return (
            <div className="tyu-register-app">
                <div className="content">
                    <div className="top">
                        <img className="logo" src={IMG_URL + "/logo.png"} />
                        <span className="company">体亦优</span>
                    </div>
                    <div className="slogan">少儿运动健康管理中心</div>

                    <div className="input phone">
                        <div className="label">
                            <span className="text">帐号</span>
                        </div>
                        
                        <Input
                            placeholder="请输入手机号"
                        ></Input>
                    </div>

                    <div className="input code">
                        <div className="label">
                            <span className="text">验证码</span>
                        </div>
                        
                        <Input
                            customClass="code-input"
                            placeholder="请输入验证码"
                        ></Input>

                        <VerifyCode checkPhone={this.checkPhone} />
                    </div>

                    <div className="register-btn">
                        <span>注册</span>
                    </div>
                </div>
            </div>
        );
    }
}
