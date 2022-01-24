import api from "./api";

type QueryStringType = {
  queryString?: string;
};
export const getAllPayments = async ({ queryString }: QueryStringType) => {
  const response = await api.get(`payments${queryString || ""}`);
  return response.data;
};

export const getPaymentDetail = async (id: string) => {
  return api.get(`payments/${id}`);
};
