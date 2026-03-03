type FormElement = HTMLInputElement | HTMLSelectElement;
type Changehandler = React.ChangeEventHandler<FormElement>;
type FocusHandler = React.FocusEventHandler<FormElement>;
type BlurHandler = React.FocusEventHandler<FormElement>;
export type FormEvents = {
  onChange?: Changehandler;
  onFocus?: FocusHandler;
  onBlur?: BlurHandler;
};
