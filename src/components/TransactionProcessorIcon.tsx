import styled from "styled-components";
import { ReactComponent as Adyen } from "../assets/adyen.svg";
import { ReactComponent as Stripe } from "../assets/stripe.svg";
import { ReactComponent as Paypal } from "../assets/paypal.svg";
import { ReactComponent as Braintree } from "../assets/braintree.svg";

const processorNameToImage = {
  ADYEN: <Adyen title="adyen" />,
  STRIPE: <Stripe title="stripe" />,
  PAYPAL: <Paypal title="paypal" />,
  BRAINTREE: <Braintree title="braintree" />,
};

const Wrapper = styled.div`
  text-align: center;
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const TransactionProcessorIcon = ({
  processorName,
}: {
  processorName: string;
}) => {
  return (
    <Wrapper>{processorNameToImage[processorName] || processorName}</Wrapper>
  );
};

export default TransactionProcessorIcon;
