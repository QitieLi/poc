import request from '@/utils/request';

export async function fetch() {
  return request('/api/orders');
}

export async function get(id) {
  return request(`/api/orders/${id}`);
}

export async function fetchOrderCharges(orderId) {
  return request(`/api/orderCharges/${orderId}`)
}

export async function post(params) {
  return request(`/api/orders/0`, {
    method: 'POST',
    body: params,
  });
}
