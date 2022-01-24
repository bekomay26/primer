import styled from "styled-components";

const Wrapper = styled.p`
  padding: 5px;
`;

const TransactionDetail = ({ name }: { name: string }) => {
  return <Wrapper>{name}</Wrapper>;
};

export default TransactionDetail;
