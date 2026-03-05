import Button from "@/components/reusable-ui/Button";
import SubmitMessage from "./SubmitMessage";

type SubmitButtonProps = {
  label?: string;
  isSubmitted: boolean;
  submitMessage?: string;
};

export default function SubmitButton({
  label = "",
  isSubmitted,
  submitMessage,
}: SubmitButtonProps) {
  return (
    <>
      <Button className="submit-button" label={label} version="success" />
      {isSubmitted && <SubmitMessage label={submitMessage} />}
    </>
  );
}
