import styled from "styled-components";

const Wrapper = styled.div`
  padding: 15px 15px;
  background-color: #ffffff;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.2);
`;

const Title = styled.div`
  display: flex;
  align-items: center;
  & > p {
    margin-left: 10px;
  }
  margin-bottom: 10px;
`;

type TransactionDetailCardType = {
  label: string;
  children: any;
  logo: any;
};

const TransactionDetailCard = ({
  logo,
  label,
  children,
}: TransactionDetailCardType) => {
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

export default TransactionDetailCard;
