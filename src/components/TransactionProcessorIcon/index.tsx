import { ReactComponent as Adyen } from "../../assets/adyen.svg";
import { ReactComponent as Stripe } from "../../assets/stripe.svg";
import { ReactComponent as Paypal } from "../../assets/paypal.svg";
import { ReactComponent as Braintree } from "../../assets/braintree.svg";
import { Wrapper } from "./style";

const processorNameToImage = {
  ADYEN: <Adyen title="adyen" />,
  STRIPE: <Stripe title="stripe" />,
  PAYPAL: <Paypal title="paypal" />,
  BRAINTREE: <Braintree title="braintree" />,
};

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
