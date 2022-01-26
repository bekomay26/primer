import { Wrapper, Title } from "./style";

type TransactionDetailBoxType = {
  label: string;
  children: any;
  logo: any;
};

const TransactionDetailBox = ({
  logo,
  label,
  children,
}: TransactionDetailBoxType) => {
  return (
    <Wrapper>
      <Title>
        {logo}
        <p>{label}</p>
      </Title>
      {children}
    </Wrapper>
  );
};

export default TransactionDetailBox;
