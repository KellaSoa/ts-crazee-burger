import { theme } from "@/theme/theme";
import { ComponentProps } from "react";
import { IconType } from "react-icons";
import Select, {
  components,
  GroupBase,
  MultiValueProps,
  OptionProps,
  ValueContainerProps,
} from "react-select";
import { stylesMultiSelect } from "./stylesMultiSelect";
import { Category } from "@/types/Category";
import { Product } from "@/types/Product";
import { getCategoryIcon } from "@/utils/icon";
import { applyOpacity } from "@/utils/color";

type MultiSelectProps<T> = ComponentProps<typeof Select<T, true>> & {
  customIcon?: IconType;
};

export const MultipleSelect = <T,>({
  isMulti = true,
  customIcon,
  className,
  ...otherProps
}: MultiSelectProps<T>) => {
  return (
    <Select
      {...otherProps}
      isMulti={isMulti}
      styles={stylesMultiSelect}
      components={{
        ...otherProps.components,
        DropdownIndicator: () => null,
        IndicatorSeparator: () => null,
        Option: CustomOption, // Une option individuelle dans la liste des options
        MultiValue: CustomMultiValue, // UNE SEULE option individuelle après avoir été sélectionnée par l'utilisateur
        ValueContainer: (props) => (
          <CustomValueContainer {...props} customIcon={customIcon} />
        ), // le conteneur qui englobe l'ENSEMBLE des MultiValue (ou options sélectionnées)
      }}
      noOptionsMessage={() => "Plus d'option disponible"}
    />
  );
};

// CustomValueContainer = le conteneur qui englobe l'ENSEMBLE des MultiValue (ou options sélectionnées)
const CustomValueContainer = <Option,>({
  children,
  ...props
}: ValueContainerProps<Option, true, GroupBase<Option>> & {
  customIcon?: IconType;
}) => {
  const childrenArray = Array.isArray(children) ? children : [children];
  const [values, input] = childrenArray;
  const hasValue = props.getValue().length === 0;
  const IconToDisplay = props.customIcon;

  return (
    <components.ValueContainer {...props}>
      {/* <div style={{
                border: "1px solid red"
            }}>
                bonjour
            </div> */}
      {IconToDisplay && (
        <IconToDisplay
          color={theme.colors.greyBlue}
          style={{ flexShrink: 0, marginRight: 10 }}
        />
      )}
      <div
        style={{
          overflowX: "scroll",
          scrollbarWidth: "none",
          // border: "1px solid red",
          textWrap: "nowrap",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            // gap: 13,
            color: "#9CA3AF", // gris clair
            fontSize: theme.fonts.size.P1,
            fontWeight: 500,
            marginRight: 6,
            // whiteSpace: "nowrap",
            // overflow: "hidden",
            textOverflow: "ellipsis",
            flex: 1,
            minWidth: 0,
            scrollbarWidth: "none",
            marginLeft: 2,
            width: "100%",
            // border: "1px solid blue"
          }}
        >
          {hasValue ? (
            <span
              style={{
                marginLeft: 3,
                color: theme.colors.greyMedium,
                fontSize: theme.fonts.size.SM,
              }}
            >
              {props.selectProps.placeholder}
            </span>
          ) : (
            <span
              style={{
                // border: " 1px solid red",
                paddingLeft: 0,
                display: "flex",
                overflowX: "auto",
                minWidth: 0,
                flex: 1, // assure-toi que le container peut shrink
              }}
            >
              {values}
            </span>
          )}
        </div>
      </div>
      {input}
    </components.ValueContainer>
  );
};

const CustomOption = <Option,>(
  props: OptionProps<Option, true, GroupBase<Option>>,
) => {
  const {
    data: optionData,
    innerRef,
    innerProps,
    isFocused,
    isSelected,
  } = props;
  const data = optionData as Category | Product;

  const OptionIcon = "iconName" in data ? getCategoryIcon(data.iconName) : null;

  let bgColor = "lightgrey";

  if ("color" in data) {
    bgColor = isSelected
      ? applyOpacity(data.color, 0.25)
      : isFocused
        ? applyOpacity(data.color, 0.1)
        : "white";
  } else {
    bgColor = isSelected
      ? "blue"
      : isFocused
        ? theme.colors.greyLight
        : "white";
  }

  return (
    <div
      ref={innerRef}
      {...innerProps}
      style={{
        backgroundColor: bgColor,
        color: "color" in data ? data.color : theme.colors.greyBlue,
        display: "flex",
        alignItems: "center",
        gap: 8,
        padding: "6px 15px",
        margin: 6,
        borderRadius: 20,
        fontWeight: 500,
        cursor: "pointer",
        width: "fit-content",
        borderWidth: 1,
        borderColor: "red",
      }}
    >
      {OptionIcon && (
        <span
          style={{
            color: "color" in data ? data.color : theme.colors.dark,
            display: "flex",
          }}
        >
          {<OptionIcon />}
        </span>
      )}
      <span>{"label" in data ? data.label : ""}</span>
    </div>
  );
};

// CustomMultiValue = UNE SEULE option individuelle après avoir été sélectionnée par l'utilisateur
const CustomMultiValue = <Option,>(props: MultiValueProps<Option>) => {
  const { data: optionData } = props;
  const data = optionData as Category;

  const ValueIcon = data.iconName ? getCategoryIcon(data.iconName) : null; // attention, ici on n'a pas le composant en JSX.Element, on n'a pour l'instant que la référence au composant JSX.Element
  const color = data.color ?? theme.colors.dark;
  return (
    <components.MultiValue {...props}>
      <div
        style={{
          display: "flex",
          gap: 6,
          paddingLeft: 4,
        }}
      >
        {ValueIcon && (
          <span style={{ color: data.color, top: 1.5, position: "relative" }}>
            {<ValueIcon />}
          </span>
        )}
        <span style={{ color: color }}>{data.label}</span>
      </div>
    </components.MultiValue>
  );
};

export default MultipleSelect;
