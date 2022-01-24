import styled from "styled-components";

const Wrapper = styled.div`
  padding: 5px;
  margin-right: 10px;
  text-align: left;
`;

const Label = styled.p`
  font-size: 12px;
  font-weight: 500;
  color: #282c34;
  margin-bottom: 5px;
`;

const Value = styled.div`
  font-size: 16px;
  font-weight: 600;
  height: 30px;
  display: flex;
  align-items: center;
`;

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
