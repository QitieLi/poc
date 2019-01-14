import React, { PureComponent } from 'react';
import { connect } from 'dva';
import { formatMessage, FormattedMessage } from 'umi/locale';
import {
  Form,
  Input,
  DatePicker,
  Select,
  Button,
  Card,
  InputNumber,
  Radio,
  Icon,
  Tooltip,
  Row,
  Col,
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import General from './components/General'
import OrderCharges from './components/OrderCharges'

const FormItem = Form.Item;
const { Option } = Select;
const { RangePicker } = DatePicker;
const { TextArea } = Input;

@connect(({order, loading})=>({
  data: order.data,
  orderCharges: order.orderCharges,
  loading: loading.models.order,
}))
@Form.create({
  onValuesChange(props, values) {
    props.dispatch({
      'type': 'order/save',
      payload: values
    })
  }
})
class Order extends PureComponent {

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'order/get',
      payload: 0
    });
    dispatch({
      type: 'order/fetchOrderCharges',
      payload: 0
    })
  }

  handleSubmit = ()=>{
    const {dispatch} = this.props
    dispatch({
      type: 'order/post',
      payload: {}
    })
  }

  render() {

    const {
      form,
      // form: { onValuesChange },
      orderCharges,
      dispatch,
    } = this.props;

    return (
      <PageHeaderWrapper
        title={<FormattedMessage id="app.forms.basic.title" />}
      >
        <Form layout='horizontal'>
          <Card bordered={false} title="General">
            <General {...this.props} />
          </Card>
          <Card bordered={false} title="Misc. Charges">
            <OrderCharges data={orderCharges} dispatch={dispatch} />
          </Card>
          <Button type="primary" onClick={this.handleSubmit}>
            <FormattedMessage id="form.save" />
          </Button>
        </Form>
      </PageHeaderWrapper>
    );
  }
}

export default Order
