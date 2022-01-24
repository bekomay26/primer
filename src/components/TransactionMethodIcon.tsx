import styled from "styled-components";
import { ReactComponent as Visa } from "../assets/visa.svg";
import { ReactComponent as Mastercard } from "../assets/mastercard.svg";
import { ReactComponent as Amex } from "../assets/amex.svg";
import { ReactComponent as Jcb } from "../assets/jcb.svg";
import { ReactComponent as PaymentCard } from "../assets/payment-card.svg";

const methodNameToImage = {
  VISA: <Visa title="visa" />,
  MAESTRO: <PaymentCard title="maestro" />,
  MASTERCARD: <Mastercard title="mastercard" />,
  AMEX: <Amex title="amex" />,
  JCB: <Jcb title="jcb" />,
};
const Wrapper = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TransactionMethodIcon = ({ methodName }: { methodName: string }) => {
  return <Wrapper>{methodNameToImage[methodName] || methodName}</Wrapper>;
};

export default TransactionMethodIcon;
