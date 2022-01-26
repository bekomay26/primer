import React, { useState } from "react";
import {
  Wrapper,
  DropDownContainer,
  DropDownList,
  DropDownListContainer,
  DropDownHeader,
  ListItem,
  Paragraph,
} from "./style";

type SelectOption = {
  label: string;
  value: string;
};

export default function Dropdown({
  options,
  title,
  onChange,
  defaultValue = "ALL",
}: {
  options: SelectOption[];
  title: string;
  defaultValue?: string;
  onChange: any;
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedOption, setSelectedOption] = useState<string>(defaultValue);

  const onToggle = () => {
    setIsOpen(!isOpen);
  };

  const onOptionClicked = (value: string) => () => {
    onChange(value);
    setSelectedOption(value);
    setIsOpen(false);
  };

  return (
    <Wrapper>
      <Paragraph>{title}</Paragraph>
      <DropDownContainer>
        <DropDownHeader data-testid={title} onClick={onToggle}>
          {selectedOption}
        </DropDownHeader>
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
