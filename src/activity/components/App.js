import React, { Component } from 'react';
import Modal from 'boron/DropModal';
import AvtivityService from '../../base/service/ActivityService';
import Input from '../../base/components/Input';
import Select from '../../base/components/Select';

const Option = Select.Option;
const img_url = "/imgs/";

export default class App extends Component {

    constructor (props) {
        super(props);

        this.showModal = this.showModal.bind(this);
        this.hideModal = this.hideModal.bind(this);
        this.handleConfirm = this.handleConfirm.bind(this);
        this.handleBabyNameChange = this.handleBabyNameChange.bind(this);
        this.handleContactChange = this.handleContactChange.bind(this);
        this.handleKinderGartenChange = this.handleKinderGartenChange.bind(this);
        this.handleKinderGartenSelect = this.handleKinderGartenSelect.bind(this);
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

    handleKinderGartenSelect(value)
    {
        this.setState({
            kindergarten: value
        });
    }

    handleJoinNumSelect(value)
    {
        this.setState({
            joinNum: parseInt(value)
        });
    }



    handleContactChange(value)
    {
        this.setState({
            contact: value
        });
    }

    handleBabyNameChange(value)
    {
        this.setState({
            babyName: value
        });
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

                        <Input
                            placeholder="请输入姓名"
                            onChange={this.handleBabyNameChange}
                        ></Input>
                    </div>
                    <div className="kindergarten">
                        <div className="label">
                            <span className="text">所在幼儿园</span>
                        </div>

                        <Select
                            placeholder="请选择幼儿园"
                            dataSource={this.state.kinderGartenDataSource.map(item => item.name)}
                            onSelect={this.handleKinderGartenSelect}
                            onChange={this.handleKinderGartenChange}
                        ></Select>
                    </div>
                    <div className="contact">
                        <div className="label">
                            <span className="text">家长联系方式</span>
                        </div>

                        <Input
                            placeholder="请输入联系方式"
                            onChange={this.handleContactChange}
                        ></Input>
                    </div>
                    <div className="join-nums">
                        <div className="label">
                            <span className="text">参与家长数量</span>
                        </div>
                        <Select
                            placeholder="请选择数量"
                            dataSource={this.state.joinNumDataSource.map(item => item + "")}
                            onSelect={this.handleJoinNumSelect}
                        ></Select>

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
