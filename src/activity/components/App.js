import React, { Component } from 'react';
import { Select } from 'antd';
import Modal from 'boron/DropModal';
import AvtivityService from '../../base/service/ActivityService';
const Option = Select.Option;
const img_url = "/assets/imgs/";

export default class App extends Component {

    constructor (props) {
        super(props);

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleBabyNameChange = this.handleBabyNameChange.bind(this);
        this.handleContactChange = this.handleContactChange.bind(this);
        this.handleKinderGartenChange = this.handleKinderGartenChange.bind(this);
        this.handleJoinNumSelect = this.handleJoinNumSelect.bind(this);
    }

    static defaultProps = {

    }

    static propTypes = {

    }

    state = {
        babyName: "",
        contact: "",
        kindergarten: "",
        joinNum: 1,
        kinderGartenDataSource: [
            {name:"1111"},
            {name:"1321"},
            {name:"11431211"}
        ],
        joinNumDataSource: [
            1, 2, 3, 4, 5
        ]
    }

    componentDidMount()
    {
        AvtivityService.getKinderGardens().then(schools => {
            this.setState({
                kinderGartenDataSource: schools
            })
        });
    }

    handleKinderGartenChange(value)
    {
        const school = value.trim();
        if (school !== "")
        {
            this.setState({
                kindergarten: school
            });
        }
    }

    handleJoinNumSelect(value)
    {
        this.setState({
            joinNum: parseInt(value)
        });
    }



    handleContactChange(event)
    {
        const contact = event.target.value.trim();
        if(contact !== "")
        {
            this.contact.classList.add("hasContent");
        }
        else
        {
            this.contact.classList.remove("hasContent");
        }

        this.setState({
            contact
        });
    }

    handleBabyNameChange(event)
    {
        const babyName = event.target.value.trim();
        if(babyName !== "")
        {
            this.babyName.classList.add("hasContent");
        }
        else
        {
            this.babyName.classList.remove("hasContent");
        }

        this.setState({
            babyName
        });
    }

    handleInputBlur(element)
    {
        element.classList.remove("hasContent");
    }

    handleConfirm()
    {
        const state = this.state;
        const paras = {
            name: "小勇士拓展训练+寓乐湾乐高科技课",
            kid_name: state.babyName,
            school_name: state.kindergarten,
            parent_phone: state.contact,
            parent_num: state.joinNum
        };
        AvtivityService.joinActivity(paras).then(res => {
            this.showModal();
        });
    }

    showModal(){
        this.refs.modal.show();
    }

    hideModal(){
        this.refs.modal.hide();
    }

    render()
    {
        const modalStyle = {
            width: (256/37.5) + "rem"
        };
        return (
            <div className="tyy-activity-app">
                <img className="top" src={img_url + "/top.png"} />
                <div className="title">
                    <img className="title-side" src={img_url + "/rec.png"} />
                    <span className="text">参与报名</span>
                    <img className="title-side" src={img_url + "/rec.png"} />
                </div>
                <div className="content">
                    <div className="activity">
                        <div className="label">
                            <span className="text">活动名称</span>
                        </div>
                        <span className="activity-name">小勇士拓展训练+寓乐湾乐高科技课</span>
                    </div>
                    <div className="name">
                        <div className="label">
                            <span className="text">宝宝姓名</span>
                        </div>
                        <input
                            type="text"
                            className="activity-input"
                            placeholder="请输入姓名"
                            ref={(input) => {this.babyName = input}}
                            value={this.state.babyName}
                            onChange={this.handleBabyNameChange}
                            onBlur={() => this.handleInputBlur(this.babyName)}
                        ></input>
                    </div>
                    <div className="kindergarten">
                        <div className="label">
                            <span className="text">所在幼儿园</span>
                        </div>
                        <Select
                            showSearch
                            placeholder="请选择幼儿园"
                            optionFilterProp="children"
                            dropdownClassName="select-dropdown"
                            onSelect={this.handleKinderGartenSelect}
                            onChange={this.handleKinderGartenChange}
                            filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {this.state.kinderGartenDataSource.map((item, i) => {
                                return (
                                    <Option key={i} value={item.name}>{item.name}</Option>
                                );
                            })}
                        </Select>
                    </div>
                    <div className="contact">
                        <div className="label">
                            <span className="text">家长联系方式</span>
                        </div>
                        <input
                            type="text"
                            className="activity-input"
                            placeholder="请输入联系方式"
                            ref={(input) => {this.contact = input}}
                            value={this.state.contact}
                            onChange={this.handleContactChange}
                            onBlur={() => this.handleInputBlur(this.contact)}
                        ></input>
                    </div>
                    <div className="join-nums">
                        <div className="label">
                            <span className="text">参与家长数量</span>
                        </div>
                        <Select
                            showSearch
                            placeholder="请选择数量"
                            optionFilterProp="children"
                            dropdownClassName="select-dropdown"
                            onSelect={this.handleJoinNumSelect}
                            filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
                        >
                            {this.state.joinNumDataSource.map((item, i) => {
                                return (
                                    <Option key={i} value={item + ""}>{item}</Option>
                                );
                            })}
                        </Select>
                    </div>
                </div>
                <div className="confirm" onClick={this.handleConfirm}>
                    <span className="btn">确认报名</span>
                </div>
                <img className="code" src={ img_url + "/code.png"} />
                <div className="code-tips">
                    扫描二维码关注我们
                </div>
                <img className="path-1" src={ img_url + "/path1.png"} />
                <img className="path-2" src={ img_url + "/path2.png"} />
                <img className="path-3" src={ img_url + "/path3.png"} />
                <Modal ref="modal" className="custom-modal" modalStyle={modalStyle}>
                    <div className="modal-container">
                        <img className="modal-close" src={ img_url + "/close.png"} onClick={this.hideModal}/>
                        <div className="bar">
                        </div>
                        <img className="modal-success" src={ img_url + "/success.png"} />
                        <div className="info">报名成功</div>
                    </div>

                </Modal>
            </div>
        );
    }
}
