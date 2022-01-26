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
} from "./style";
import TransactionStatus from "../TransactionStatus";

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
      <p onClick={onClick}>Click</p>
    </Wrapper>
  );
};

export default TransactionItem;
