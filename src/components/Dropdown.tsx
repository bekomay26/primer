import React, { useEffect, useState } from "react";
import styled from "styled-components";

const Wrapper = styled.div`
  display: flex;
  align-items: center;
`;

const Paragraph = styled.p`
  margin-right: 5px;
`;

const DropDownContainer = styled.div`
  //width: 10.5em;
  margin: 0 auto;
  position: relative;
  //padding: 200px;
`;

const DropDownHeader = styled.div`
  //margin-bottom: 0.8em;
  padding: 5px 10px;
  //box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  font-weight: 500;
  font-size: 1rem;
  color: #3faffa;
  cursor: pointer;
`;

const DropDownListContainer = styled.div`
  position: absolute;
  z-index: 100;
  width: 10.5em;
  right: 0;
`;

const DropDownList = styled.ul`
  //padding: 0;
  margin: 0;
  padding-left: unset;
  background: #ffffff;
  box-shadow: 0 2px 3px rgba(0, 0, 0, 0.15);
  //border: 2px solid #e5e5e5;
  box-sizing: border-box;
  color: #3faffa;
  font-size: 14px;
  font-weight: 500;
  cursor: pointer;
  &:first-child {
    padding-top: 0.8em;
  }
`;

const ListItem = styled.li`
  list-style: none;
  margin-bottom: 3px;
  padding: 5px 0;
  &:hover {
    color: #ffffff;
    background: #3faffa;
  }
`;

// const options = ["Mangoes", "Apples", "Oranges"];
type SelectOption = {
  label: string;
  value: string;
};

export default function Dropdown({
  options,
  title,
  onChange,
}: {
  options: SelectOption[];
  title: string;
  onChange: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>("ALL");

  const onToggle = () => {
    console.log("isOpen");
    console.log(isOpen);
    setIsOpen(!isOpen);
  };

  const onOptionClicked = (value: string) => () => {
    onChange(value);
    setSelectedOption(value);
    setIsOpen(false);
  };

  // const onClose = () => {
  //   setIsOpen(false);
  // };

  // useEffect(() => {
  //   console.log("aaa");
  //   // setTimeout(() => {
  //   if (isOpen) {
  //     console.log("ddd");
  //     window.addEventListener("click", onClose);
  //   } else {
  //     console.log("eee");
  //     window.removeEventListener("click", onClose);
  //   }
  //   // }, 0);
  //   // return window.removeEventListener("click", onClose);
  // }, [isOpen]);

  return (
    <Wrapper>
      <Paragraph>{title}</Paragraph>
      <DropDownContainer>
        <DropDownHeader onClick={onToggle}>{selectedOption}</DropDownHeader>
        {isOpen && (
          <DropDownListContainer>
            <DropDownList>
              {options.map((option) => (
                <ListItem
                  onClick={onOptionClicked(option.value)}
                  key={option.value}
                >
                  {option.label}
                </ListItem>
              ))}
            </DropDownList>
          </DropDownListContainer>
        )}
      </DropDownContainer>
    </Wrapper>
  );
}
