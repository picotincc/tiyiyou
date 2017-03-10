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
        onChange: () => {},
        onBlur: () => {}
    }

    state = {
        value: ""
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
            this.props.onChange(value);
        }
        else
        {
            this.input.classList.remove("hasContent");
        }

        this.setState({
            value
        })
    }

    handleBlur(e)
    {
        this.input.classList.remove("hasContent");
    }

    render()
    {
        const { customClass, placeholder } = this.props;
        return (
            <input
                type="text"
                className={"tyu-custom-input " + customClass}
                placeholder={placeholder}
                ref={(input) => {this.input = input}}
                value={this.state.babyName}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
            ></input>
        );
    }
}
