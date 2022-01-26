import { Wrapper } from "./style";

const TransactionStatus = ({ mode, name }: { mode?: string; name: string }) => {
  return <Wrapper mode={mode || name}>{name}</Wrapper>;
};

export default TransactionStatus;
