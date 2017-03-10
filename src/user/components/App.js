import React, { Component } from 'react';
import Input from '../../base/components/Input';
import DateInput from '../../base/components/DateInput';

import Select from '../../base/components/Select';
import VerifyCode from '../../base/components/VerifyCode';
const IMG_URL = "/imgs";

export default class App extends Component {
    
    constructor (props) {
        super(props);

        this.handleKidNameChange = this.handleKidNameChange.bind(this);
        this.handleKidClassChange = this.handleKidClassChange.bind(this);
        this.handleBirthDatePicker = this.handleBirthDatePicker.bind(this);
        this.handleSchoolDayPicker = this.handleSchoolDayPicker.bind(this);
    }

    state = { 
        kidName: "",
        kidClass: "",
        birthday: [],
        schoolday: []
    }

    componentDidMount()
    {
        // weui.datePicker({
        //     start: 1990,
        //     end: 2000,
        //     defaultValue: [1991, 6, 9],
        //     onChange: function(result){
        //         console.log(result);
        //     },
        //     onConfirm: function(result){
        //         console.log(result);
        //     },
        //     id: 'datePicker'
        // });
    }

    handleKidNameChange(value)
    {
        this.setState({
            kidName: value
        });
    }

    handleKidClassChange(value)
    {
        this.setState({
            kidClass: value
        });
    }



    handleBirthDatePicker()
    {
        const birthday = this.state.birthday;
        weui.datePicker({
            start: 2000,
            end: 2017,
            defaultValue: birthday,
            onConfirm: (result) => {
                const birthday = result.toString().split(",").map(item => parseInt(item));
                this.setState({
                    birthday
                });
            },
            id: 'birth-datePicker'
        });
    }

    handleSchoolDayPicker()
    {
        const schoolday = this.state.schoolday;
        weui.datePicker({
            start: 2000,
            end: 2017,
            defaultValue: schoolday,
            onConfirm: (result) => {
                const schoolday = result.toString().split(",").map(item => parseInt(item));
                this.setState({
                    schoolday
                });
            },
            id: 'school-datePicker'
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
                            value={this.state.kidName}
                            onChange={this.handleKidNameChange}
                        />
                    </div>

                    <div className="input">
                        <div className="label">
                            <span className="text">出生日期</span>
                        </div>

                         <DateInput 
                            placeholder="请选择出生日期"
                            value={this.state.birthday}
                            onFocus={this.handleBirthDatePicker}
                         />     
                    </div>

                    <div className="input">
                        <div className="label">
                            <span className="text">所在幼儿园</span>
                        </div>
                        
                        <Select
                            placeholder="请选择幼儿园"
                        />
                    </div>

                    <div className="input">
                        <div className="label">
                            <span className="text">入学时间</span>
                        </div>

                        <DateInput 
                            placeholder="请选择入学时间"
                            value={this.state.schoolday}
                            onFocus={this.handleSchoolDayPicker}
                         />
                    
                    </div>

                    <div className="input">
                        <div className="label">
                            <span className="text">所在班级</span>
                        </div>
                        
                        <Input
                            placeholder="请输入班级"
                            value={this.state.kidClass}
                            onChange={this.handleKidClassChange}
                        />
                    </div>

                    <div className="add-btn">
                        <span>确认添加</span>
                    </div>

                </div>
            </div>
        );
    }
}
