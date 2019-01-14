import * as orderService from '../services/orders'
import {message} from 'antd'
import { routerRedux } from 'dva/router';
import { stringify } from 'qs';
import router from 'umi/router'

export default {
  namespace: 'order',

  state: {
    data: {},
    orderCharges: []
  },

  reducers: {
    save(state, {payload}) {
      const data = Object.assign({}, state.data, payload)
      return {...state, data}
    },
    saveOrderCharges(state, {payload}) {
      return {...state, orderCharges: payload}
    }
  },

  effects: {
    *get({payload}, {call,put}) {
      const response = yield call(orderService.get, payload)
      yield put({
        type: 'save',
        payload: response
      })
    },
    *fetchOrderCharges({payload}, {call,put}) {
      const response = yield call(orderService.fetchOrderCharges, payload)
      yield put({
        type: 'saveOrderCharges',
        payload: response
      })
    },
    *post(_, {call,put,select}) {
      const payload = yield select((state)=> (state.order))
      const response = yield call(orderService.post, payload)
      // yield put(routerRedux.replace(redirect || '/'))
      message.success('Save Success1')
    }
  }
}
