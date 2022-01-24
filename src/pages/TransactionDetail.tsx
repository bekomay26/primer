import styled from "styled-components";
import { currencyToSymbol, formatAmount } from "../utils";
import { useEffect, useState } from "react";
import { getPaymentDetail } from "../app/paymentAPI";
import TransactionDetailHeader from "../components/TransactionDetailHeader";
import PaymentInfo from "../components/PaymentInfo";
import TransactionDetailCard from "../components/TransactionDetailCard";
import TransactionProcessorIcon from "../components/TransactionProcessorIcon";
import InfoItem from "../components/InfoItem";
import LoaderOverlay from "../components/LoaderOverlay";

const Wrapper = styled.div`
  background-color: #dde2dc;
  padding: 5px;
  height: 100vh;
  overflow-y: scroll;
`;

const Body = styled.div`
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-top: 20px;
  & > div {
    width: 45%;
  }
`;

const InfoItems = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
`;

type PaymentType = {
  id?: string;
  date?: string;
  status?: string;
  orderId?: string;
  processor?: string;
  processorMerchantId?: string;
  currencyCode?: string;
  amount?: number;
  amountAuthorized?: number;
  amountCaptured?: number;
  amountRefunded?: number;
  paymentInstrument?: any;
  transactions?: any[];
};

const TransactionDetail = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState<PaymentType>({});
  const [paymentIsRefunded, setPaymentIsRefunded] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  //  const { currencyCode: currency, amount, refund, status } = props;
  const fetchPayment = async () => {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
    const { data: paymentData }: { data: PaymentType } = await getPaymentDetail(
      id
    );
    console.log(paymentData);
    setPayment(paymentData);
    const saleTransId = paymentData.transactions.find(
      (tran) => tran.type === "SALE"
    );
    setTransactionId(
      saleTransId?.processorTransactionId ||
        paymentData.transactions[0]?.processorTransactionId
    );
    setPaymentIsRefunded(paymentData.amountRefunded > 0);
    setLoading(false);
  };
  useEffect(() => {
    void fetchPayment();
  }, [id]);

  if (loading) {
    return <LoaderOverlay />;
  }
  return (
    <Wrapper>
      <>
        <TransactionDetailHeader
          isRefunded={paymentIsRefunded}
          amount={formatAmount(payment.amount, payment.currencyCode)}
          amountRefunded={formatAmount(
            payment.amountRefunded,
            payment.currencyCode
          )}
          amountCaptured={formatAmount(
            payment.amountCaptured,
            payment.currencyCode
          )}
        />
        <PaymentInfo
          currency={payment.currencyCode}
          processor={payment.processor}
          paymentMethod={
            payment?.paymentInstrument?.paymentInstrumentData?.binData?.network
          }
          paymentInstrumentType={
            payment?.paymentInstrument?.paymentInstrumentType
          }
          orderId={payment.processor}
          submissionDate={payment.date}
          status={payment.status}
        />
        <Body>
          <TransactionDetailCard
            label="Processor"
            logo={
              <TransactionProcessorIcon processorName={payment.processor} />
            }
          >
            <InfoItem label={"Account ID"}>
              <p>{payment.processorMerchantId}</p>
            </InfoItem>
            <InfoItem label={"Transaction ID"}>
              <p>{transactionId}</p>
            </InfoItem>
          </TransactionDetailCard>
          <TransactionDetailCard
            label="Payment Method"
            logo={
              <TransactionProcessorIcon processorName={payment.processor} />
            }
          >
            <InfoItem label={"Cardholder Name"}>
              <p>
                {
                  payment?.paymentInstrument?.paymentInstrumentData
                    ?.cardholderName
                }
              </p>
            </InfoItem>
            <InfoItems>
              <InfoItem label={"Card Number"}>
                <div>
                  {
                    payment?.paymentInstrument?.paymentInstrumentData
                      ?.last4Digits
                  }
                </div>
                {/*<p>{transactionId}</p>*/}
              </InfoItem>
              <InfoItem label={"Expiration"}>
                <p>
                  {
                    payment?.paymentInstrument?.paymentInstrumentData
                      ?.expirationMonth
                  }
                  /
                  {
                    payment?.paymentInstrument?.paymentInstrumentData
                      ?.expirationYear
                  }
                </p>
              </InfoItem>
            </InfoItems>
          </TransactionDetailCard>
        </Body>
      </>
    </Wrapper>
  );
};

export default TransactionDetail;
