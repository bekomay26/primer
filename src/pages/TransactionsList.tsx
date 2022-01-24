import { useEffect, useState } from "react";
import styled from "styled-components";
import { getAllPayments } from "../app/paymentAPI";
import TransactionItem from "../components/TransactionItem";
import { formatDate } from "../utils";
import TransactionFilter from "../components/TransactionsFilter";

const Head = styled.div`
  background-color: #dde2dc;
  padding: 30px 10px;
`;
const Body = styled.div`
  //display: table;
`;
const TransactionsList = () => {
  const [payments, setPayments] = useState([]);
  const [filteredPayments, setFilteredPayments] = useState([]);
  const fetchPayments = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data: paymentsData }: { data: any[] } = await getAllPayments();
    console.log("paymentsData");
    console.log(paymentsData.map((pay) => pay.currencyCode));
    setPayments(paymentsData);
    setFilteredPayments(paymentsData);
  };
  useEffect(() => {
    void fetchPayments();
  }, []);
  // console.log("payments");
  // console.log(payments);
  const onUpdateFilterPayments = (newPaymentList) => {
    setFilteredPayments(newPaymentList);
  };
  return (
    <div>
      <Head>
        <p>Transactions</p>
        <TransactionFilter
          payments={payments}
          updatePayments={onUpdateFilterPayments}
        />
      </Head>
      <Body>
        {filteredPayments?.map((pay) => (
          <TransactionItem
            key={pay.id}
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
