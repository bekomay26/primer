import { useContext } from "react";
import {
  Wrapper,
  Nav,
  AmountText,
  RefundText,
  RefundIcon,
  RefundDetail,
  SummaryDiv,
} from "./style";
import { pagesMapping, RoutingContext } from "../../Router";
import { ReactComponent as RightIcon } from "../../assets/right-arrow.svg";

type AmountDetailType = {
  isRefunded: boolean;
  amount: string;
  amountRefunded: string;
  amountCaptured: string;
};

const TransactionDetailHeader = ({
  isRefunded,
  amount,
  amountRefunded,
  amountCaptured,
}: AmountDetailType) => {
  const { setPage } = useContext(RoutingContext);
  return (
    <Wrapper>
      <Nav onClick={() => setPage(pagesMapping.list)}>
        <RightIcon />
        <p>Transactions</p>
      </Nav>
      <SummaryDiv>
        <AmountText>
          <span>{amount}</span>
        </AmountText>
        {isRefunded && (
          <RefundDetail>
            <RefundText>
              <p>Refund</p>
              <p>
                <span>{amountRefunded}</span>
              </p>
            </RefundText>
            <RefundText>
              <p>Final</p>
              <p>
                <span>{amountCaptured}</span>
              </p>
            </RefundText>
            <RefundIcon>Refunded</RefundIcon>
          </RefundDetail>
        )}
      </SummaryDiv>
    </Wrapper>
  );
};

export default TransactionDetailHeader;
