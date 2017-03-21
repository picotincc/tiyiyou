import React, { Component } from 'react';

import { Select } from 'antd';

import './index.less';
const Option = Select.Option;

export default class CustomSelect extends Component {

    constructor (props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.handleBlur = this.handleBlur.bind(this);
    }

    static defaultProps = {
        placeholder: "",
        dataSource: [],
        value: "",
        onSelect: () => {},
        onChange: () => {},
        onBlur: () => {}
    }

    state = {

    }

    componentDidMount()
    {

    }

    handleSelect(value)
    {
        this.props.onSelect(value);
    }

    handleChange(value)
    {
        this.props.onChange(value);
    }

    handleBlur()
    {
        this.props.onBlur();
    }

    render()
    {
        const { placeholder, dataSource, combobox, value } = this.props;
        return (
            <Select
                showSearch
                placeholder={placeholder}
                combobox={combobox}
                value={value}
                optionFilterProp="children"
                dropdownClassName="tyu-custom-select"
                onSelect={this.handleSelect}
                onChange={this.handleChange}
                onBlur={this.handleBlur}
                filterOption={(input, option) => option.props.value.toLowerCase().indexOf(input.toLowerCase()) >= 0}
            >
                {dataSource.map((item, i) => {
                    return (
                        <Option key={i} value={item}>{item}</Option>
                    );
                })}
            </Select>
        );
    }
}
