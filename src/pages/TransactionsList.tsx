import { useEffect, useState } from "react";
import styled from "styled-components";
import { getAllPayments } from "../app/paymentAPI";
import TransactionItem from "../components/TransactionItem";
import { formatDate } from "../utils";
import TransactionFilter from "../components/TransactionsFilter";
import LoaderOverlay from "../components/LoaderOverlay";

const Head = styled.div`
  background-color: #dde2dc;
  padding: 30px 10px;
`;
const Body = styled.div`
  //display: table;
`;

const TransactionsList = () => {
  const [loading, setLoading] = useState(true);
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const fetchPayments = async () => {
    const { data: paymentsData }: { data: any[] } = await getAllPayments({});
    setPayments(paymentsData);
    setFilteredPayments(paymentsData);
    setLoading(false);
  };
  useEffect(() => {
    void fetchPayments();
  }, []);

  const onUpdateFilterPayments = (newPaymentList) => {
    setFilteredPayments(newPaymentList);
  };

  const updateLoadingStatus = (isLoading) => {
    setLoading(isLoading);
  };

  return (
    <div>
      {loading && <LoaderOverlay />}
      <Head>
        <p>Transactions</p>
        <TransactionFilter
          payments={payments}
          updatePayments={onUpdateFilterPayments}
          updateLoadingStatus={updateLoadingStatus}
        />
      </Head>
      <Body>
        {filteredPayments?.map((pay) => (
          <TransactionItem
            key={pay.id}
            id={pay.id}
            amount={new Intl.NumberFormat().format(pay.amount / 100)}
            status={pay.status}
            date={formatDate(pay.date)}
            currency={pay.currencyCode}
            processor={pay.processor}
            orderId={pay.orderId}
            refunded={pay.amountRefunded > 0}
            method={
              pay?.paymentInstrument?.paymentInstrumentData?.binData?.network
            }
          />
        ))}
      </Body>
    </div>
  );
};

export default TransactionsList;
