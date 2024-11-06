import axios from 'axios';

const API_BASE_URL = 'https://your-api-url.com';

export const savePaymentInfo = async (paymentData) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/payments`,
      paymentData
    );
    return response.data;
  } catch (error) {
    throw new Error('결제 정보 저장에 실패했습니다.');
  }
};

export const getPaymentHistory = async () => {
  try {
    const response = await axios.get(
      `${API_BASE_URL}/payments/history`
    );
    return response.data;
  } catch (error) {
    throw new Error('결제 내역 조회에 실패했습니다.');
  }
};

export const cancelPayment = async (orderId) => {
  try {
    const response = await axios.post(
      `${API_BASE_URL}/payments/${orderId}/cancel`
    );
    return response.data;
  } catch (error) {
    throw new Error('결제 취소에 실패했습니다.');
  }
}; 