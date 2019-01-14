import React, { PureComponent, Fragment } from 'react';
import { connect } from 'dva';
import {
  Table,
  Card,
  Form,
  Divider
} from 'antd';
import PageHeaderWrapper from '@/components/PageHeaderWrapper';
import Link from 'umi/link';

import styles from './TableList.less';


/* eslint react/no-multi-comp:0 */
@connect(({orders, loading }) => ({
  data: orders.data,
  loading: loading.models.orders,
}))
class Orders extends PureComponent {

  columns = [
    {
      title: 'Code',
      width: 100,
      dataIndex: 'code',
      render: (text, record)=>(
        <Link to={`orders/${record.id}`}>{text}</Link>
      )
    },
    {
      title: 'Plant',
      width: 100,
      dataIndex: 'plantText',
    },
    {
      title: 'Shipping Warehouse',
      width: 150,
      dataIndex: 'shippingWarehouseText',
    },
    {
      title: 'Order Warehouse',
      width: 150,
      dataIndex: 'orderWarehouseText',
    },
    {
      title: 'Customer',
      width: 100,
      dataIndex: 'customerText',
    },
    {
      title: 'Name',
      width: 100,
      dataIndex: 'customerName',
    },
    {
      title: 'PO',
      width: 100,
      dataIndex: 'customerRequisition',
    },
    {
      title: 'Date Required',
      width: 100,
      dataIndex: 'requiredDate',
    },
    {
      title: 'Date Time Required',
      width: 100,
      dataIndex: 'dateTimeRequired',
    },
    {
      title: 'Currency',
      width: 100,
      dataIndex: 'currency',
    },
    {
      title: 'Status',
      width: 100,
      dataIndex: 'status',
    },
    {
      title: 'Action',
      width: 100,
      render: (text, record) => (
        <Fragment>
          <a>config</a>
          <Divider type="vertical" />
          <a href="">notice</a>
        </Fragment>
      ),
    },
  ];

  componentDidMount() {
    const { dispatch } = this.props;
    dispatch({
      type: 'orders/fetch',
    });
  }

  render() {
    const {
      data:{
        list
      },
      loading,
    } = this.props;

    return (
      <PageHeaderWrapper title="查询表格">
        <Card>
          <Table
            rowKey="id"
            size="small"
            scroll={{x:1300}}
            loading={loading}
            columns={this.columns}
            dataSource={list}
          />
        </Card>
      </PageHeaderWrapper>
    );
  }
}

export default Orders;
