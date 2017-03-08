import React, { Component } from 'react';

import { Select } from 'antd';

import './index.less';
const Option = Select.Option;

export default class CustomSelect extends Component {

    constructor (props) {
        super(props);

        this.handleSelect = this.handleSelect.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }

    static defaultProps = {
        placeholder: "",
        dataSource: [],
        onSelect: () => {},
        onChange: () => {}
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

    render()
    {
        const { placeholder, dataSource } = this.props;
        return (
            <Select
                showSearch
                placeholder={placeholder}
                optionFilterProp="children"
                combobox
                dropdownClassName="tyu-custom-select"
                onSelect={this.handleSelect}
                onChange={this.handleChange}
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
