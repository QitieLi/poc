import React,{PureComponent} from 'react'
import ReactDOM from 'react-dom'
import {
  Table, Input, Button, Popconfirm, Form, Card,Row, Icon
} from 'antd';
import isEqual from 'lodash/isEqual';
import style from './index.less'

const generateId = (() => {
  let i = 0;
  return () => {
    i += 1;
    return `NEW_TEMP_ID_${i}`;
  };
})();

const FormItem = Form.Item;
const EditableContext = React.createContext();

const EditableRow = ({ form, index, ...props }) => (
  <EditableContext.Provider value={form}>
    <tr {...props} />
  </EditableContext.Provider>
);

const EditableFormRow = Form.create()(EditableRow);

class EditableCell extends React.Component {
  state = {
    editing: false,
  }

  input = null

  componentDidMount() {
    if (this.props.editable) {
      document.addEventListener('click', this.handleClickOutside, true);
    }
    const ipt = document.querySelector('input');
    // ReactDOM.findDOMNode(ipt).focus();
  }

  componentWillUnmount() {
    if (this.props.editable) {
      document.removeEventListener('click', this.handleClickOutside, true);
    }
  }

  toggleEdit = () => {
    const editing = !this.state.editing;
    this.setState({ editing }, () => {
      if (editing) {
        // this.input.focus();
        const ipt = this.cell.querySelector('input');
        const ref = ReactDOM.findDOMNode(ipt)
        ref.focus()
        ref.addEventListener('keydown',(event)=>{
          const keyCode = event.keyCode || event.which;
          if(keyCode === "13"){
            event.preventDefault();
            this.save()
          }
        })
      }
    });
  }

  handleClickOutside = (e) => {
    const { editing } = this.state;
    if (editing && this.cell !== e.target && !this.cell.contains(e.target)) {
      this.save();
    }
    // 点击td内部时，防止尝试input value是空，不触发编辑
    if (editing == false && this.cell == e.target) {
      this.toggleEdit()
    }
  }

  save = () => {
    const { record, handleSave } = this.props;
    this.form.validateFields((error, values) => {
      if (error) {
        return;
      }
      this.toggleEdit();
      handleSave({ ...record, ...values });
    });
  }

  render() {
    const { editing } = this.state;
    const {
      editable,
      dataIndex,
      title,
      record,
      index,
      handleSave,
      editor,
      ...restProps
    } = this.props;

    return (
      <td ref={node => (this.cell = node)} {...restProps}>
        {editable ? (
          <EditableContext.Consumer>
            {(form) => {
              this.form = form;
              return (
                editing ? (
                  <FormItem style={{ margin: 0}} className={style.editableCell}>
                    {form.getFieldDecorator(dataIndex, {
                      rules: [{
                        required: true,
                        message: `${title} is required.`,
                      }],
                      initialValue: record[dataIndex],
                    })(editor)}
                  </FormItem>
                ) : (
                  <div
                    className="editable-cell-value-wrap"
                    style={{ paddingRight: 24 }}
                    onClick={this.toggleEdit}
                  >
                    {restProps.children}
                  </div>
                )
              );
            }}
          </EditableContext.Consumer>
        ) : restProps.children}
      </td>
    );
  }
}

class EditableTable extends React.Component {

  constructor(props) {
    super(props);

    const {
      columns,
      rowKey,
      onSave,
      ...restProps
    } = props

    this.columns = columns

    this.state = {
      selectedRowKeys: [],
    };

    this.rowKey = rowKey
    this.restProps = restProps
  }

  handleDelete = () => {
    const {selectedRowKeys:{0:key}} = this.state
    const {data, handleSave} = this.props
    handleSave(data.filter(item => item[this.rowKey] !== key))
  }

  handleAdd = () => {
    const {data, handleSave} = this.props
    const newData = {[this.rowKey]: generateId()}
    this.columns.forEach(column=>{
      newData[column.dataIndex] = ''
    })
    handleSave([...data, newData])
  }

  handleSave = (row) => {
    // const newData = [...this.props.data];
    const {data: [...newData], handleSave} = this.props
    const index = newData.findIndex(item => row[this.rowKey] === item[this.rowKey]);
    const item = newData[index];
    newData.splice(index, 1, {
      ...item,
      ...row,
    });
    handleSave(newData)
  }

  onSelectChange = (selectedRowKeys) => {
    console.log('selectedRowKeys changed: ', selectedRowKeys);
    this.setState({ selectedRowKeys });
  }

  render() {
    const { selectedRowKeys } = this.state;
    const { data } = this.props
    const rowSelection = {
      type: 'radio',
      // fixed: true,
      selectedRowKeys,
      onChange: this.onSelectChange,
    };
    const components = {
      body: {
        row: EditableFormRow,
        cell: EditableCell,
      },
    };
    const columns = this.columns.map((col) => {
      if (!col.editable) {
        return col;
      }
      return {
        ...col,
        onCell: record => ({
          record,
          editable: col.editable,
          dataIndex: col.dataIndex,
          title: col.title,
          handleSave: this.handleSave,
          // editor: col.editor
          editor: col.editor
        }),
      };
    });
    return (

      <div>
        <Row>
          <Button onClick={this.handleAdd} shape="circle" type="primary" size='small'
                  style={{ marginBottom: 0,float:"left"}}>
            +
          </Button>
          <Button onClick={this.handleDelete} shape="circle" type="primary" size='small'
                  style={{ marginBottom: 0,float:"left"}}>
            -
          </Button>
        </Row>
        <Row>
          <Table
            rowKey={this.rowKey}
            size='small'
            components={components}
            rowClassName={() => 'editable-row'}
            bordered
            dataSource={data}
            columns={columns}
            // selectedRowKeys={this.state.selectedRowKeys}
            rowSelection={rowSelection}
            pagination={false}
            {...this.restProps}
          />
        </Row>
      </div>
    );
  }
}

export default EditableTable
