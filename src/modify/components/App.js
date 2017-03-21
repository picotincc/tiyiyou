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
        this.handleBirthDatePicker = this.handleBirthDatePicker.bind(this);
        this.handleSchoolDayPicker = this.handleSchoolDayPicker.bind(this);
        this.handleKidSchoolSelect = this.handleKidSchoolSelect.bind(this);
        this.handleModifyKid = this.handleModifyKid.bind(this);
    }

    state = {
        userinfo: {},
        kidName: "",
        kidClasses: [],
        selectedKidClass: {},
        kidSchools: [],
        selectedKidSchool: "",
        birthday: [],
        schoolday: []
    }

    componentDidMount()
    {
        let id = null;
        if (window) {
          const params = window.location.search.slice(1).split('&');

          if (params.length > 0) {
            const paramMap = params.reduce((prev, curr) => {
              const array = curr.split('=');
              prev[array[0]] = array[1];
              return prev;
            }, {});

            if (paramMap.id.length > 0) {
              id = paramMap.id;
            }
          }
        }
        ServiceClient.getKidSchools().then(kidSchools => {
            ServiceClient.searchStudentById(id).then(res => {
                console.log(res);
                const student = res.data.report_student;
                const birthday = this.formatDate(student.birthday);
                const schoolday = this.formatDate(student.schoolday);
                const selectedKidSchool = kidSchools.find(item => item.name === student.school_name);
                const selectedKidClass = {
                    id: student.class_id,
                    name: student.class_name
                }
                ServiceClient.getKidClasses(selectedKidSchool.id).then(res => {
                    this.setState({
                        userinfo: student,
                        kidName: student.name,
                        kidClasses: res,
                        selectedKidClass,
                        kidSchools,
                        selectedKidSchool,
                        birthday,
                        schoolday
                    });
                });
            });
        });


    }

    formatDate(dateStr)
    {
        const date = new Date(dateStr);
        return [date.getFullYear(), date.getMonth() + 1, date.getDate()];
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

    handleModifyKid()
    {
        const { userinfo, kidName, selectedKidClass, birthday, schoolday } = this.state;
        const paras = {
            id: userinfo.id,
            kidName,
            classId: selectedKidClass.id,
            birthday: birthday.join(","),
            schoolday: schoolday.join(",")
        }
        ServiceClient.updateKid(paras).then(res => {
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
            <div className="tyu-modify-app">
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
                        />

                    </div>

                    <div className="add-btn" onClick={this.handleModifyKid}>
                        <span>确认修改</span>
                    </div>

                </div>
            </div>
        );
    }
}
