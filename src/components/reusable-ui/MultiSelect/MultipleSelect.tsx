import Select, { Props as SelectProps } from "react-select";
import { stylesMultiSelect } from "./stylesMultiSelect";

type Option = {
  value: string;
  label: string;
};

export default function MultipleSelect(props: SelectProps<Option, true>) {
  return <Select {...props} isMulti styles={stylesMultiSelect} />;
}
