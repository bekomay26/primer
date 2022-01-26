// import { render, screen, waitFor } from "@testing-library/react";
// import { setupServer } from "msw/node";
// import { rest } from "msw";
// import TransactionDetail from "./index";
//
// const payment = {
//   id: "nhXgSjDl",
//   date: "2020-12-08T14:33:48.616968+00:00",
//   status: "SETTLED",
//   orderId: "TnLymYPOEhPgglxMLXJMlD",
//   processor: "STRIPE",
//   currencyCode: "USD",
//   paymentInstrument: {
//     paymentInstrumentData: {
//       network: "Visa",
//       binData: {
//         network: "VISA",
//       },
//     },
//     threeDSecureAuthentication: null,
//   },
//   transactions: [
//     {
//       id: "5d773fb6-96f2-477e-a600-26789a11dd76",
//       processorTransactionId: "pi_1Hw7GKGZqNWFwi8cG9akWRHi",
//       processor: "STRIPE",
//       processorMerchantId: "acct_1GORcsGZqNWFwi8c",
//       type: "SALE",
//       status: "SETTLED",
//       paymentError: null,
//     },
//   ],
// };
//
// const server = setupServer(
//   rest.get(
//     `${process.env.REACT_APP_API_URL}/payments/nhXgSjDl`,
//     (req, res, ctx) => {
//       // rest.get(`/payments`, (req, res, ctx) => {
//       return res(ctx.json(payment));
//     }
//   )
// );
//
// beforeAll(() => server.listen({ onUnhandledRequest: "error" }));
// afterAll(() => server.close());
// afterEach(() => server.resetHandlers());
//
// it("Loads page on render", async () => {
//   render(<TransactionDetail id={"nhXgSjDl"} />);
//
//   // await waitFor(() =>
//   //   expect(screen.getByText("Transactions")).toBeInTheDocument()
//   // );
//
//   expect(await screen.findByText("SETTLED")).toBeInTheDocument();
//
//   // expect(await screen.getByText("TnLymYPOEhPgglxMLXJMlD")).toBeTruthy();
// });
