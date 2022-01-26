import { Wrapper, InfoItems, Body } from "./style";
import { useEffect, useState } from "react";
import { getPaymentDetail } from "../../app/paymentAPI";
import LoaderOverlay from "../../components/LoaderOverlay";
import TransactionDetailHeader from "../../components/TransactionDetailHeader";
import { formatAmount } from "../../utils";
import PaymentInfo from "../../components/PaymentInfo";
import InfoItem from "../../components/InfoItem";
import TransactionDetailBox from "../../components/TransactionDetailBox";
import TransactionProcessorIcon from "../../components/TransactionProcessorIcon";
import TransactionMethodIcon from "../../components/TransactionMethodIcon";

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
  const fetchPayment = async () => {
    const { data: paymentData }: { data: PaymentType } = await getPaymentDetail(
      id
    );
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
    fetchPayment();
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
          orderId={payment.orderId}
          submissionDate={payment.date}
          status={payment.status}
        />
        <Body>
          <TransactionDetailBox
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
          </TransactionDetailBox>
          <TransactionDetailBox
            label="Payment Method"
            logo={
              <TransactionMethodIcon
                methodName={
                  payment?.paymentInstrument?.paymentInstrumentData?.binData
                    ?.network
                }
              />
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
          </TransactionDetailBox>
        </Body>
      </>
    </Wrapper>
  );
};

export default TransactionDetail;
