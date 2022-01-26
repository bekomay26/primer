import { Wrapper } from "./style";

const statusToBackgroundColorMap = {
  FAILED: "red",
  SETTLING: "gray",
  AUTHORIZED: "lightGreen",
  SETTLED: "red",
  DECLINED: "blue",
  CANCELLED: "yellow",
};

const TransactionStatus = ({ name }: { name: string }) => {
  return (
    <Wrapper backgroundColor={statusToBackgroundColorMap[name]}>{name}</Wrapper>
  );
};

export default TransactionStatus;
