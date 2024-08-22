import type { FormItemProps } from 'antd/es/form';
import type { FC } from 'react';

import { Checkbox, DatePicker, Form, Input, InputNumber, Radio, Select, Switch } from 'antd';
import React, { useMemo } from 'react';

export type ControlTypes = 'input' | 'input-number' | 'switch' | 'date-picker' | 'checkbox' | 'radio' | 'select';

type GetRCPropsType<T> = T extends (props: infer R) => any ? R : T extends React.ComponentClass<infer R> ? R : any;

type InnerProps = {
  input: GetRCPropsType<typeof Input>;
  'input-number': GetRCPropsType<typeof InputNumber>;
  switch: GetRCPropsType<typeof Switch>;
  'date-picker': GetRCPropsType<typeof DatePicker>;
  checkbox: GetRCPropsType<typeof Checkbox>;
  radio: GetRCPropsType<typeof Radio>;
  select: GetRCPropsType<typeof Select>;
};

export interface MyFormItemProps<T extends ControlTypes = ControlTypes> extends Omit<FormItemProps, 'required'> {
  type?: T;
  options?: {
    label: string;
    value: any;
    disabled?: boolean;
  }[];
  innerProps?: InnerProps[T];
  required?: string | boolean;
}

export class ControlMap {
  props: MyFormItemProps;

  constructor(props: MyFormItemProps) {
    this.props = props;
  }

  get innerProps() {
    return this.props.innerProps as object;
  }

  input() {
    return <Input {...this.innerProps} />;
  }

  'input-number'() {
    return <InputNumber {...this.innerProps} />;
  }

  switch() {
    return <Switch {...this.innerProps} />;
  }

  'date-picker'() {
    return <DatePicker {...this.innerProps} />;
  }

  checkbox() {
    if (this.props.options) {
      return <Checkbox.Group options={this.props.options} {...this.innerProps} />;
    }

    return <Checkbox.Group {...this.innerProps}>{this.props.children}</Checkbox.Group>;
  }

  radio() {
    if (this.props.options) {
      return <Radio.Group options={this.props.options} {...this.innerProps} />;
    }

    return <Radio.Group {...this.innerProps}>{this.props.children}</Radio.Group>;
  }

  select() {
    if (this.props.options) {
      return <Select options={this.props.options} {...this.innerProps} />;
    }

    return <Select {...this.innerProps}>{this.props.children}</Select>;
  }
}

const MyformItem: FC<MyFormItemProps> = props => {
  const { type, required, rules: userRules, ...restProps } = props;

  const rules = useMemo(() => {
    if (userRules) return userRules;

    if (required) {
      if (typeof required === 'boolean') {
        return [{ required: true, message: `请输入${props.label}` }];
      } else if (typeof required === 'string') {
        return [{ required: true, message: required }];
      }
    }
  }, [required, userRules, props.label]);

  const controlMap = new ControlMap(props);

  return (
    <Form.Item {...restProps} rules={rules}>
      {type ? controlMap[type]() : props.children}
    </Form.Item>
  );
};

export default MyformItem;
