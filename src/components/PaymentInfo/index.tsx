import { Wrapper, Content, Status, IconText } from "./style";
import InfoItem from "../InfoItem";
import TransactionStatus from "../TransactionStatus";
import TransactionProcessorIcon from "../TransactionProcessorIcon";
import TransactionMethodIcon from "../TransactionMethodIcon";
import { formatDate } from "../../utils";

const instrumentTypeToLabel = {
  PAYMENT_CARD: "Card",
  PAYPAL_ORDER: "Paypal",
};

type PaymentInfoType = {
  currency: string;
  processor: string;
  paymentMethod: string;
  paymentInstrumentType: string;
  orderId: string;
  submissionDate: string;
  status: string;
};

const PaymentInfo = ({
  currency,
  processor,
  paymentMethod,
  paymentInstrumentType,
  submissionDate,
  status,
  orderId,
}: PaymentInfoType) => {
  return (
    <Wrapper>
      <Content>
        <InfoItem label="Currency">{currency}</InfoItem>
        <InfoItem label="Processor">
          <IconText>
            <TransactionProcessorIcon processorName={processor} />
            {processor}
          </IconText>
        </InfoItem>
        <InfoItem label="Payment Method">
          <IconText>
            <TransactionMethodIcon methodName={paymentMethod} />
            {instrumentTypeToLabel[paymentInstrumentType] ||
              paymentInstrumentType}
            / {paymentMethod}
          </IconText>
        </InfoItem>
        <InfoItem label="Your reference">{orderId}</InfoItem>
        <InfoItem label="Submitted">
          {submissionDate ? formatDate(submissionDate) : "-"}
        </InfoItem>
      </Content>
      <Status>
        <TransactionStatus name={status} />
      </Status>
    </Wrapper>
  );
};

export default PaymentInfo;
