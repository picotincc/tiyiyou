import React, { Component } from 'react';
import Input from '../../base/components/Input';
import Select from '../../base/components/Select';
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

    componentDidMount()
    {
        weui.datePicker({
            start: 1990,
            end: 2000,
            defaultValue: [1991, 6, 9],
            onChange: function(result){
                console.log(result);
            },
            onConfirm: function(result){
                console.log(result);
            },
            id: 'datePicker'
        });
    }



    
    render() 
    {
        return (
            <div className="tyu-user-app">
                <div className="content">
                    <div className="top">
                        <img className="logo" src={IMG_URL + "/logo.png"} />
                        <span className="company">体亦优</span>
                    </div>
                    <div className="slogan">少儿运动健康管理中心</div>

                    <div className="input">
                        <div className="label">
                            <span className="text">宝宝姓名</span>
                        </div>
                        
                        <Input
                            placeholder="请输入姓名"
                        ></Input>
                    </div>

                    <div className="input">
                        <div className="label">
                            <span className="text">出生日期</span>
                        </div>
                        
                        <Input
                            placeholder="请选择出生日期"
                        ></Input>
                    </div>

                    <div className="input">
                        <div className="label">
                            <span className="text">所在幼儿园</span>
                        </div>
                        
                        <Select
                            placeholder="请选择幼儿园"
                        ></Select>
                    </div>

                    <div className="input">
                        <div className="label">
                            <span className="text">入学时间</span>
                        </div>
                        
                        <Input
                            placeholder="请选择入学时间"
                        ></Input>
                    </div>

                    <div className="input">
                        <div className="label">
                            <span className="text">所在班级</span>
                        </div>
                        
                        <Input
                            placeholder="请输入班级"
                        ></Input>
                    </div>

                    <div className="add-btn">
                        <span>确认添加</span>
                    </div>

                    <div id="datePicker"></div>
                </div>
            </div>
        );
    }
}
