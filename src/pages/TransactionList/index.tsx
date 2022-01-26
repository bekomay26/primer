import { Head, Body } from "./style";
import { useEffect, useState } from "react";
import { getAllPayments, getPaymentDetail } from "../../app/paymentAPI";
import { formatAmount, formatDate } from "../../utils";
import LoaderOverlay from "../../components/LoaderOverlay";
import TransactionFilter from "../../components/TransactionFilter";
import TransactionItem from "../../components/TransactionItem";

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
