import { Wrapper, Value, Label } from "./style";

type InfoItemType = {
  label: string;
  children: any;
};

const InfoItem = ({ label, children }: InfoItemType) => {
  return (
    <Wrapper>
      <Label>{label}</Label>
      <Value>{children}</Value>
    </Wrapper>
  );
};

export default InfoItem;
