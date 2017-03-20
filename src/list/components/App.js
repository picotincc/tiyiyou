import React, { Component } from 'react';
import ServiceClient from '../../base/service/ServiceClient';

const IMG_URL = "/imgs";

export default class App extends Component {

    constructor (props) {
        super(props);

    }

    state = {
        kids: [
            {id:1, name:"管登荣"},
            {id:2, name:"顾必成"}
        ]
    }

    componentDidMount()
    {
        ServiceClient.searchStudentByOpenID().then(res => {
            const students = res.data.students;
            this.setState({
                kids: students
            });
        });
    }

    linkToReport(id)
    {
        location.href = "/report.html?id=" + id;
    }

    linkToModify(id)
    {
        location.href = "/modify.html?id=" + id;
    }

    linkToAddKid()
    {
        location.href = "/user.html";
    }

    render()
    {
        return (
            <div className="tyu-list-app">
                <div className="content">
                    <div className="top">
                        <img className="logo" src={IMG_URL + "/logo.png"} />
                        <span className="company">体亦优</span>
                    </div>
                    <div className="slogan">少儿运动健康管理中心</div>

                    <div className="list-title">已经绑定的宝宝：</div>

                    <ul className="kid-list">
                        {this.state.kids.map(item => {
                            return (
                                <li className="kid-item" key={item.id}>
                                    <span className="name">{item.name}</span>
                                    <span className="report" onClick={() => this.linkToReport(item.id)}>体测报告</span>
                                    <span className="modify" onClick={() => this.linkToModify(item.id)}>修改信息</span>
                                </li>
                            );
                        })}
                    </ul>

                    <div className="add-btn" onClick={this.linkToAddKid}>
                        <span>添加宝宝</span>
                    </div>

                </div>
            </div>
        );
    }
}
