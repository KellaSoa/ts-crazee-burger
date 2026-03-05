import styled from "styled-components";
import { theme } from "@/theme/theme";
import { ComponentProps, useEffect, useState } from "react";

// type OptionValue = string | number | readonly string[]

type Option = {
  optionValue: string | number | readonly string[];
  label: string;
};

type SelectInputProps = {
  options: Option[];
  Icon?: JSX.Element;
  selectPlaceholder?: string;
} & ComponentProps<"select">;

export default function SelectInput({
  options,
  value,
  Icon,
  className,
  onChange,
  selectPlaceholder,
  ...restProps
}: SelectInputProps) {
  const [selectedValue, setSelectedValue] = useState<Option["optionValue"]>(
    value ?? "",
  ); // Valeur vide par défaut

  // 🔥 Ajout d'un useEffect pour synchroniser selectedValue avec value externe
  useEffect(() => {
    setSelectedValue(value ?? "");
  }, [value]);

  const handleChangeInternal = (
    event: React.ChangeEvent<HTMLSelectElement>,
  ) => {
    setSelectedValue(event.target.value);
    onChange && onChange(event);
  };

  return (
    <SelectInputStyled className={className} selectedValue={selectedValue}>
      {Icon && <div className="icon">{Icon}</div>}
      <select
        value={selectedValue}
        onChange={handleChangeInternal}
        {...restProps}
      >
        <option value="" disabled hidden>
          {selectPlaceholder}
        </option>
        {options.map(({ optionValue, label }) => (
          <option key={label} value={optionValue}>
            {label}
          </option>
        ))}
      </select>
    </SelectInputStyled>
  );
}

type SelectInputStyledProps = {
  selectedValue: Option["optionValue"]; // selectedValue n'attend pas l'objet option, il attend la propriété DANS Option qui s'appelle "value"  et qui peut être de type OptionValue ou Option["optionValue"], ces deux éctitures sont équivalentes
};

const SelectInputStyled = styled.div<SelectInputStyledProps>`
  /* border: 1px solid yellow; */
  background-color: ${theme.colors.background_white};
  border-radius: ${theme.borderRadius.round};
  display: flex;
  align-items: center;
  padding: 8px 16px;

  .icon {
    /* border: 1px solid red; */
    font-size: ${theme.fonts.size.P1};
    margin: 0 13px 0 8px;
    color: ${theme.colors.greyBlue};
    display: flex; // centre verticalement l'icône dans le champ select
  }

  select {
    /* border: 1px solid blue; */
    background: ${theme.colors.background_white};
    border: none;
    font-size: ${theme.fonts.size.SM};
    color: ${({ selectedValue }) =>
      selectedValue !== "" ? theme.colors.dark : theme.colors.greyMedium};
    width: 100%;
    outline: 0;
  }
`;
