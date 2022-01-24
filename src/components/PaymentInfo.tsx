import styled from "styled-components";
import TransactionStatus from "../pages/TransactionStatus";
import { formatDate } from "../utils";
import InfoItem from "./InfoItem";
import TransactionMethodIcon from "./TransactionMethodIcon";
import TransactionProcessorIcon from "./TransactionProcessorIcon";

const instrumentTypeToLabel = {
  PAYMENT_CARD: "Card",
};

const Wrapper = styled.div`
  padding: 20px 30px;
  background-color: #ffffff;
  display: flex;
  align-items: center;
  justify-content: space-between;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
`;

const Content = styled.div`
  display: flex;
  align-items: center;
`;

const IconText = styled.div`
  display: flex;
  align-items: center;

  & > div:first-child {
    margin-right: 5px;
  }
`;

const Status = styled.div`
  padding: 15px 20px;
  border: 1px solid black;
`;

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
