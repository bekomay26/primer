import api from "./api";

export const getAllPayments = async () => {
  const response = await api.get("payments");
  // eslint-disable-next-line @typescript-eslint/no-unsafe-return
  return response.data;
};

export const getPaymentDetail = async (id: string) => {
  return api.get(`payments/${id}`);
};
