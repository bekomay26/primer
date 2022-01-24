// import React from "react";
import styled from "styled-components";
import { ReactComponent as Adyen } from "../assets/adyen.svg";
import { ReactComponent as Stripe } from "../assets/stripe.svg";
import { ReactComponent as Paypal } from "../assets/paypal.svg";
import { ReactComponent as Braintree } from "../assets/braintree.svg";
import { ReactComponent as Visa } from "../assets/visa.svg";
// import { ReactComponent as Maestro } from "../assets/maesto.svg";
import { ReactComponent as Mastercard } from "../assets/mastercard.svg";
import { ReactComponent as Amex } from "../assets/amex.svg";
import { ReactComponent as Jcb } from "../assets/jcb.svg";
import { ReactComponent as PaymentCard } from "../assets/payment-card.svg";

const processorNameToImage = {
  ADYEN: <Adyen title="adyen" />,
  STRIPE: <Stripe title="stripe" />,
  PAYPAL: <Paypal title="paypal" />,
  BRAINTREE: <Braintree title="braintree" />,
};

const methodNameToImage = {
  VISA: <Visa title="visa" />,
  // MAESTRO: <Maestro style={{ width: 24, height: 24 }} title="maestro" />,
  MAESTRO: <PaymentCard title="maestro" />,
  MASTERCARD: <Mastercard title="mastercard" />,
  AMEX: <Amex title="amex" />,
  JCB: <Jcb title="jcb" />,
};
const Wrapper = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  width: 54px;
  justify-content: space-between;
`;

const TransactionProcessorAndMethod = ({
  processorName,
  methodName,
}: {
  processorName: string;
  methodName: string;
}) => {
  // console.log(processorName);
  return (
    <Wrapper>
      <div>{processorNameToImage[processorName] || processorName}</div>
      <div>{methodNameToImage[methodName] || methodName}</div>
    </Wrapper>
  );
};

export default TransactionProcessorAndMethod;
