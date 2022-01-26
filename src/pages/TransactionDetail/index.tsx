import {
  Wrapper,
  InfoItems,
  Body,
  ThreeDInfo,
  ErrorPage,
  BackButton,
} from "./style";
import { useContext, useEffect, useState } from "react";
import { getPaymentDetail } from "../../app/paymentAPI";
import LoaderOverlay from "../../components/LoaderOverlay";
import TransactionDetailHeader from "../../components/TransactionDetailHeader";
import { formatAmount, ThreeDSecureCodes } from "../../utils";
import PaymentInfo from "../../components/PaymentInfo";
import InfoItem from "../../components/InfoItem";
import TransactionDetailBox from "../../components/TransactionDetailBox";
import TransactionProcessorIcon from "../../components/TransactionProcessorIcon";
import TransactionMethodIcon from "../../components/TransactionMethodIcon";
import { ReactComponent as ThreeDSecureIcon } from "../../assets/3DS.svg";
import TransactionStatus from "../../components/TransactionStatus";
import { pagesMapping, RoutingContext } from "../../Router";
import { ReactComponent as RightIcon } from "../../assets/right-arrow.svg";

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

type ThreeDType = {
  responseCode?: string;
};

const TransactionDetail = ({ id }: { id: string }) => {
  const [loading, setLoading] = useState(true);
  const [payment, setPayment] = useState<PaymentType>({});
  const [paymentIsRefunded, setPaymentIsRefunded] = useState(false);
  const [transactionId, setTransactionId] = useState("");
  const [processor, setProcessor] = useState("");
  const [threeDSec, setThreeDSec] = useState<ThreeDType | null>(null);
  const [instrumentData, setInstrumentData] = useState<any>({});
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const { setPage } = useContext(RoutingContext);

  const fetchPayment = async () => {
    try {
      const { data: paymentData }: { data: PaymentType } =
        await getPaymentDetail(id);
      setPayment(paymentData);
      setProcessor(paymentData.processor);
      setInstrumentData(paymentData?.paymentInstrument?.paymentInstrumentData);
      setThreeDSec(paymentData?.paymentInstrument?.threeDSecureAuthentication);
      const saleTransId = paymentData.transactions.find(
        (tran) => tran.type === "SALE"
      );
      setTransactionId(
        saleTransId?.processorTransactionId ||
          paymentData.transactions[0]?.processorTransactionId
      );
      setPaymentIsRefunded(paymentData.amountRefunded > 0);
    } catch (e) {
      if (e.response) {
        setHasError(true);
        setErrorMessage(e.response.data?.error?.description);
      }
    }
    setLoading(false);
  };
  useEffect(() => {
    fetchPayment();
  }, [id]);

  if (loading) {
    return <LoaderOverlay />;
  }

  if (hasError) {
    return (
      <ErrorPage>
        <p>{errorMessage}</p>

        <BackButton onClick={() => setPage(pagesMapping.list)}>
          <RightIcon />
          <p>Go back to transactions</p>
        </BackButton>
      </ErrorPage>
    );
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
          paymentMethod={instrumentData?.binData?.network}
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
            {processor !== "PAYPAL" ? (
              <InfoItem label={"Transaction ID"}>
                <p>{transactionId}</p>
              </InfoItem>
            ) : (
              <InfoItem label={"Paypal order ID"}>
                <p>{instrumentData?.paypalOrderId}</p>
              </InfoItem>
            )}
          </TransactionDetailBox>
          {payment.processor !== "PAYPAL" && (
            <TransactionDetailBox
              label="Payment Method"
              logo={
                <TransactionMethodIcon
                  methodName={instrumentData?.binData?.network}
                />
              }
            >
              <InfoItem label={"Cardholder Name"}>
                <p>{instrumentData?.cardholderName}</p>
              </InfoItem>
              <InfoItems>
                <InfoItem label={"Card Number"}>
                  <div>{instrumentData?.last4Digits}</div>
                </InfoItem>
                <InfoItem label={"Expiration"}>
                  <p>
                    {instrumentData?.expirationMonth}/
                    {instrumentData?.expirationYear}
                  </p>
                </InfoItem>
              </InfoItems>
            </TransactionDetailBox>
          )}

          {threeDSec && (
            <TransactionDetailBox label="3D Secure" logo={<ThreeDSecureIcon />}>
              <ThreeDInfo>
                <p>Response code</p>
                <TransactionStatus
                  mode={ThreeDSecureCodes[threeDSec.responseCode].mode}
                  name={ThreeDSecureCodes[threeDSec.responseCode].label}
                />
              </ThreeDInfo>
            </TransactionDetailBox>
          )}
        </Body>
      </>
    </Wrapper>
  );
};

export default TransactionDetail;
