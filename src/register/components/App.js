import React, { Component } from 'react';
import Input from '../../base/components/Input';
import VerifyCode from '../../base/components/VerifyCode';
import ServiceClient from '../../base/service/ServiceClient';
const IMG_URL = "/imgs";

export default class App extends Component {

    constructor (props) {
        super(props);
        this.checkPhone = this.checkPhone.bind(this);
        this.sendCode = this.sendCode.bind(this);
        this.handlePhoneChange = this.handlePhoneChange.bind(this);
        this.handleCodeChange = this.handleCodeChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);

        this.redirect();
    }

    state = {
        phone: "",
        code: ""
    }

    redirect()
    {
        ServiceClient.hasBindedPhone().then(res => {
            if (res.code == 0)
            {
                location.href = "./list.html";
            }
        });
    }

    checkPhone()
    {
        const phone = this.state.phone;
        if(!(/^1(3|4|5|7|8)\d{9}$/.test(phone))){
            return false;
        }
        return true;
    }

    sendCode()
    {
        const phone = this.state.phone;
        ServiceClient.sendCode(phone).then(res => {
            console.log(res);
        });
    }

    handlePhoneChange(value)
    {
        this.setState({
            phone: value
        });
    }

    handleCodeChange(value)
    {
        this.setState({
            code: value
        });
    }

    handleRegister()
    {
        const { phone, code } = this.state;
        ServiceClient.bindPhoneNumber(phone, code).then(res => {
            if(res.code == 0)
            {
                //注册成功，跳转至添加宝宝
                location.href = "./user.html";
            }
            else
            {
                //绑定手机失败
                alert(res.errMsg);
            }
        });
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
                            value={this.state.phone}
                            onChange={this.handlePhoneChange}
                        />
                    </div>

                    <div className="input code">
                        <div className="label">
                            <span className="text">验证码</span>
                        </div>

                        <Input
                            customClass="code-input"
                            placeholder="请输入验证码"
                            value={this.state.code}
                            onChange={this.handleCodeChange}
                        />

                        <VerifyCode
                            checkPhone={this.checkPhone}
                            onClick={this.sendCode}
                        />
                    </div>

                    <div className="register-btn" onClick={this.handleRegister}>
                        <span>注册</span>
                    </div>
                </div>
            </div>
        );
    }
}
