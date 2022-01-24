import styled from "styled-components";

const statusToBackgroundColorMap = {
  FAILED: "red",
  SETTLING: "gray",
  AUTHORIZED: "lightGreen",
  SETTLED: "red",
  DECLINED: "blue",
  CANCELLED: "yellow",
};
const Wrapper = styled.p`
  padding: 5px;
  background-color: ${(props: { backgroundColor: string }) =>
    props.backgroundColor || "grey"};
  font-size: 14px;
  //text-align: center;
  //display: flex;
  //align-items: center;
  display: inline-block;
  border-radius: 5px;
  //color: palevioletred;
`;

const TransactionStatus = ({ name }: { name: string }) => {
  // console.log(statusToBackgroundColorMap[name]);

  return (
    <Wrapper backgroundColor={statusToBackgroundColorMap[name]}>{name}</Wrapper>
  );
};

export default TransactionStatus;
