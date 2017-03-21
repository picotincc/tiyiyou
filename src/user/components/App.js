import React, { Component } from 'react';
import Input from '../../base/components/Input';
import DateInput from '../../base/components/DateInput';
import ServiceClient from '../../base/service/ServiceClient';

import Select from '../../base/components/Select';
import VerifyCode from '../../base/components/VerifyCode';
const IMG_URL = "/imgs";

export default class App extends Component {

    constructor (props) {
        super(props);

        this.handleKidNameChange = this.handleKidNameChange.bind(this);
        this.handleKidClassSelect = this.handleKidClassSelect.bind(this);
        this.handleKidClassChange = this.handleKidClassChange.bind(this);
        this.handleKidClassBlur = this.handleKidClassBlur.bind(this);
        this.handleBirthDatePicker = this.handleBirthDatePicker.bind(this);
        this.handleSchoolDayPicker = this.handleSchoolDayPicker.bind(this);
        this.handleKidSchoolSelect = this.handleKidSchoolSelect.bind(this);
        this.handleAddKid = this.handleAddKid.bind(this);
    }

    state = {
        kidName: "",
        kidClasses: [],
        selectedKidClass: {
            id: -1,
            name: ""
        },
        kidSchools: [],
        selectedKidSchool: "",
        birthday: [],
        schoolday: []
    }

    componentDidMount()
    {
        //获取所有幼儿园
        ServiceClient.getKidSchools().then(res => {
            this.setState({
                kidSchools: res
            })
        });

    }

    handleKidSchoolSelect(value)
    {
        const school = this.state.kidSchools.find(item => item.name === value);
        let kidClasses = [];
        ServiceClient.getKidClasses(school.id).then(res => {
            this.setState({
                selectedKidSchool: school,
                kidClasses: res
            })
        });
    }

    handleKidClassSelect(value)
    {
        const kidClass = this.state.kidClasses.find(item => item.name === value);
        this.setState({
            selectedKidClass: kidClass
        });
    }

    handleKidClassChange(value)
    {
        const kidClass = this.state.kidClasses.find(item => item.name === value);
        if(kidClass)
        {
            this.setState({
                selectedKidClass: kidClass
            });
        }
        else
        {
            const t = { id: -1, name: value };
            this.setState({
                selectedKidClass: t
            });
        }
    }

    handleKidNameChange(value)
    {
        this.setState({
            kidName: value
        });
    }

    handleKidClassBlur()
    {
        const kidClass = this.state.selectedKidClass;
        if (kidClass.id === -1)
        {
            const kClass = this.state.kidClasses.find(item => item.name === "value");
            this.setState({
                selectedKidClass: kidClass
            });
        }
    }

    handleAddKid()
    {
        const { kidName, selectedKidClass, birthday, schoolday } = this.state;
        const paras = {
            kidName,
            classId: selectedKidClass.id,
            birthday: birthday.join(","),
            schoolday: schoolday.join(",")
        }
        ServiceClient.addKid(paras).then(res => {
            if(res.code == 0)
            {
                location.href = "/list.html";
            }
            else
            {
                alert(res.errorMsg);
            }
        });
    }





    handleBirthDatePicker()
    {
        const birthday = this.state.birthday;
        weui.datePicker({
            start: 2000,
            end: 2020,
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
            end: 2020,
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
                            combobox={false}
                            value={this.state.selectedKidSchool.name}
                            dataSource={this.state.kidSchools.map(item => item.name)}
                            onSelect={this.handleKidSchoolSelect}
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

                        <Select
                            placeholder="请选择班级"
                            combobox={true}
                            value={this.state.selectedKidClass.name}
                            dataSource={this.state.kidClasses.map(item => item.name)}
                            onSelect={this.handleKidClassSelect}
                            onChange={this.handleKidClassChange}
                            onBlur={this.handleKidClassBlur}
                        />

                    </div>

                    <div className="add-btn" onClick={this.handleAddKid}>
                        <span>确认添加</span>
                    </div>

                </div>
            </div>
        );
    }
}
