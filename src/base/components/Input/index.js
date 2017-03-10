import React, { Component } from 'react';

import './index.less';

export default class Input extends Component {

    constructor (props) {
        super(props);

        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    static defaultProps = {
        customClass: "",
        placeholder: "",
        value: "",
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

    render()
    {
        const { customClass, placeholder, value } = this.props;
        return (
            <input
                type="text"
                className={"tyu-custom-input " + customClass}
                placeholder={placeholder}
                ref={(input) => {this.input = input}}
                value={value}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                onFocus={this.props.onFocus}
            ></input>
        );
    }
}
