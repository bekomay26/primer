import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import TransactionFilter from "./index";
import { getAllPayments as mockGetAllPayments } from "../../app/paymentAPI";

const payments = [
  {
    id: "nhXgSjDl",
    date: "2020-12-08T14:33:48.616968+00:00",
    status: "SETTLED",
    orderId: "AicrRUybtryqGXiFrDUzve",
    processor: "STRIPE",
    currencyCode: "EUR",
    paymentInstrument: {
      paymentInstrumentData: {
        network: "Mastercard",
        binData: {
          network: "MASTERCARD",
        },
      },
      threeDSecureAuthentication: null,
    },
  },
  {
    id: "nhXgSjDl",
    date: "2020-12-08T14:33:48.616968+00:00",
    status: "SETTLED",
    orderId: "TnLymYPOEhPgglxMLXJMlD",
    processor: "STRIPE",
    currencyCode: "USD",
    paymentInstrument: {
      paymentInstrumentData: {
        network: "Visa",
        binData: {
          network: "VISA",
        },
      },
      threeDSecureAuthentication: null,
    },
  },
];

jest.mock("../../app/paymentAPI");
it("Filter's payment by currency makes a request to the API", async () => {
  (mockGetAllPayments as jest.Mock).mockResolvedValueOnce({ data: payments });
  const mockOnUpdateLoadingState = jest.fn();
  const mockOnUpdatePayments = jest.fn();
  render(
    <TransactionFilter
      payments={payments}
      updatePayments={mockOnUpdatePayments}
      updateLoadingStatus={mockOnUpdateLoadingState}
    />
  );

  userEvent.click(screen.getByTestId(/Currency/i));

  const optionEurListItem = screen
    .getAllByRole("listitem")
    .find((listitem) => listitem.textContent === "EUR");

  userEvent.click(optionEurListItem);

  await waitFor(() =>
    expect(mockGetAllPayments).toHaveBeenCalledWith({
      queryString: "?currency_code=EUR",
    })
  );
  await waitFor(() => expect(mockGetAllPayments).toHaveBeenCalledTimes(1));
  await waitFor(() => expect(mockOnUpdateLoadingState).toHaveBeenCalled());
  await waitFor(() => expect(mockOnUpdatePayments).toHaveBeenCalledTimes(1));
});
