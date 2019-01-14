import React from 'react';
import { Col, Input, Row, Form } from 'antd';

const FormItem = Form.Item;

const formItemLayout = {
  labelCol: { span: 7 },
  wrapperCol: { span: 14 },
}

export default ({form:{getFieldDecorator}, data}) => (
  <Row>
    <Col span={8}>
      <FormItem label="Order Type" {...formItemLayout}>
        {getFieldDecorator('orderType', {
          rules: [
            {
              required: true,
            }
          ],
          initialValue: data.orderType
        })(<Input size="small" />)}
      </FormItem>
      <FormItem label="Estimate No." {...formItemLayout}>
        {getFieldDecorator('estimationNo', {
          rules: [
            {
              required: true,
            }
          ],
          initialValue: data.estimationNo
        })(<Input size="small" />)}
      </FormItem>
      <FormItem label="Customer" {...formItemLayout}>
        {getFieldDecorator('customerName', {
          rules: [
            {
              required: true,
            }
          ],
          initialValue: data.customerName
        })(<Input size="small" />)}
      </FormItem>
      <FormItem label="Contact" {...formItemLayout}>
        {getFieldDecorator('contactNotes', {
          rules: [
            {
              required: true,
            }
          ],
          initialValue: data.contactNotes
        })(<Input size="small" />)}
      </FormItem>
      <FormItem label="Placed" {...formItemLayout}>
        {getFieldDecorator('placedBy', {
          rules: [
            {
              required: true,
            }
          ],
          initialValue: data.placedBy
        })(<Input size="small" />)}
      </FormItem>
      <FormItem label="Class" {...formItemLayout}>
        {getFieldDecorator('class', {
          rules: [
            {
              required: true,
            }
          ],
          initialValue: "C"
        })(<Input size="small" disabled />)}
      </FormItem>
      <FormItem label="Subclass" {...formItemLayout}>
        {getFieldDecorator('subClass', {
          rules: [
            {
              required: true,
            }
          ],
          initialValue: ""
        })(<Input size="small" disabled />)}
      </FormItem>
      <FormItem label="PO" {...formItemLayout}>
        {getFieldDecorator('customerRequisition', {
          rules: [
            {
              // required: true,
            }
          ],
          initialValue: data.customerRequisition
        })(<Input size="small" disabled />)}
      </FormItem>
      <FormItem label="Requisition NO" {...formItemLayout}>
        {getFieldDecorator('requisitionNO', {
          rules: [
            {
              // required: true,
            }
          ],
          initialValue: data.customerRequisition
        })(<Input size="small" disabled />)}
      </FormItem>
      <FormItem label="Date Required" {...formItemLayout}>
        {getFieldDecorator('requiredDate', {
          rules: [
            {
              // required: true,
            }
          ],
          initialValue: data.requiredDate
        })(<Input size="small" />)}
      </FormItem>
      <FormItem label="Ext Expire" {...formItemLayout}>
        {getFieldDecorator('extExpire', {
          rules: [
            {
              // required: true,
            }
          ],
          initialValue: data.requiredDate
        })(<Input size="small" />)}
      </FormItem>
      <FormItem label="Follow Up / By" {...formItemLayout}>
        {getFieldDecorator('follow', {
          rules: [
            {
              // required: true,
            }
          ],
          initialValue: ""
        })(<Input size="small" />)}
      </FormItem>
      <FormItem label="Order Taker" {...formItemLayout}>
        {getFieldDecorator('orderTaker', {
          rules: [
            {
              // required: true,
            }
          ],
          initialValue: "99999-admin"
        })(<Input size="small" disabled />)}
      </FormItem>
      <FormItem label="Project No" {...formItemLayout}>
        {getFieldDecorator('projectNo', {
          rules: [
            {
              // required: true,
            }
          ],
          initialValue: ""
        })(<Input size="small" disabled />)}
      </FormItem>
      <FormItem label="Project Code" {...formItemLayout}>
        {getFieldDecorator('projectCode', {
          rules: [
            {
              // required: true,
            }
          ],
          initialValue: ""
        })(<Input size="small" disabled />)}
      </FormItem>
    </Col>
    <Col span={8}>
      <FormItem label="code" {...formItemLayout}>
        {getFieldDecorator('code', {
          rules: [
            {
              required: true,
            }
          ],
          initialValue: data.code
        })(<Input size="small" />)}
      </FormItem>

    </Col>
    <Col span={8}>
      <FormItem label="code" {...formItemLayout}>
        {getFieldDecorator('code', {
          rules: [
            {
              required: true,
            }
          ],
          initialValue: data.code
        })(<Input size="small" />)}
      </FormItem>
    </Col>
  </Row>
)



