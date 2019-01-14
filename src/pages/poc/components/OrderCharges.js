import React from 'react'
import {Input} from 'antd'
import EditableTable from '@/components/EditableTable'

export default (props)=>{

  const columns = [{
    title: 'Code',
    dataIndex: 'lineSourceName',
    editable: true,
    editor: <Input size='small' />
  },{
    title: 'Draft Invoice Amount',
    dataIndex: 'inInvoicingAmount',
    editable: true,
    editor: <Input size='small' />
  },{
    title: 'Description(EN)',
    dataIndex: 'descriptionEn',
  },{
    title: 'Charge',
    dataIndex: 'amount',
    render: (value)=>(`$${value}`)
  },{
    title: 'Invoiced Amount',
    dataIndex: 'invoicedAmount',
  },{
    title: 'Tax Amount',
    dataIndex: 'taxAmount',
  },{
    title: 'Description(FR)',
    dataIndex: 'descriptionFr',
  }];

  const {
    data,
    loading,
  } = props;

  return (
    <EditableTable
      rowKey="id"
      columns={columns}
      data={data}
      handleSave={(data)=>{ // eslint-disable-line no-shadow
        props.dispatch({
          type: 'order/saveOrderCharges',
          payload: data
        })
      }}
    />
  )
}
