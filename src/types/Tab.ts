import { ADMIN_TAB_LABEL } from "@/enums/tabs";

export type TabType = {
  index: ADMIN_TAB_LABEL;
  label: string;
  Icon: JSX.Element;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  className?: string;
  Content?: JSX.Element;
};
