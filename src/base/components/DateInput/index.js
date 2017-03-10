import React, { Component } from 'react';

import './index.less';

export default class DateInput extends Component {

    constructor (props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    static defaultProps = {
        customClass: "",
        placeholder: "",
        value: [],
        onChange: () => {},
        onBlur: () => {}
    }

    state = {
        
    }

    componentDidMount()
    {

    }

    handleChange(e)
    {
        const value = e.target.value.trim();

        if(value !== "")
        {
            this.input.classList.add("hasContent");
        }
        else
        {
            this.input.classList.remove("hasContent");
        }

        this.props.onChange(value);
    }

    handleBlur(e)
    {
        this.input.classList.remove("hasContent");
    }

    formatDate(value)
    {
        let dateStr = "";
        if(value.length > 0)
        {
             dateStr = value[0] + "年" + value[1] + "月" + value[2] + "日";
        }
        return dateStr;
    }

    render()
    {
        const { customClass, placeholder, value } = this.props;

        const date = this.formatDate(value);
        return (
            <input
                type="text"
                className={"tyu-custom-date-input " + customClass}
                placeholder={placeholder}
                readOnly
                ref={(input) => {this.input = input}}
                value={date}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                onFocus={this.props.onFocus}
            ></input>
        );
    }
}
