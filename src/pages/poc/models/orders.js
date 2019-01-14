import * as orderService from '../services/orders'

export default {
  namespace: 'orders',

  state: {
    data: {
      list: [],
      pagination: {}
    }
  },

  reducers: {
    save(state, {payload}) {
      return {
        ...state,
        data: payload,
      };
    },
  },

  effects: {
    *fetch(_, {call, put}) {
      const response = yield call(orderService.fetch)
      yield put({
        type: 'save',
        payload: response
      })
    }

  }
}
