import { Wrapper } from "./style";

const TransactionStatus = ({ name }: { name: string }) => {
  return <Wrapper name={name}>{name}</Wrapper>;
};

export default TransactionStatus;
