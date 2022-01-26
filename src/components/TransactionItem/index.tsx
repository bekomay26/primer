import { useContext } from "react";
import { RoutingContext } from "../../Router";
import TransactionProcessorAndMethod from "../../pages/TransactionProcessorAndMethod";
import {
  Wrapper,
  AmountText,
  DateText,
  OrderText,
  RefundText,
  StatusDiv,
  MethodDiv,
  OpenPageButton,
} from "./style";
import TransactionStatus from "../TransactionStatus";
import { ReactComponent as RightIcon } from "../../assets/right-arrow.svg";

const TransactionItem = ({
  id,
  currency,
  amount,
  status,
  processor,
  method,
  orderId,
  refunded,
  date,
}) => {
  const { setPage, setUrlId } = useContext(RoutingContext);

  const onClick = () => {
    setPage("detail");
    setUrlId(id);
  };
  return (
    <Wrapper>
      <AmountText>
        {amount}
        <span>{currency}</span>
      </AmountText>
      <StatusDiv>
        <TransactionStatus name={status} />
      </StatusDiv>
      <MethodDiv>
        <TransactionProcessorAndMethod
          methodName={method}
          processorName={processor}
        />
      </MethodDiv>
      <OrderText>{orderId}</OrderText>
      <RefundText>{refunded && "Refunded"}</RefundText>
      <DateText>{date}</DateText>
      <OpenPageButton onClick={onClick}>
        <RightIcon />
      </OpenPageButton>
    </Wrapper>
  );
};

export default TransactionItem;
