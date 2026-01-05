import { useEffect } from "react";

export const useCreateKeyboardShortcut = (
  keyboardKey: string,
  callbackAction: () => void
) => {
  const handleKeyDown = (event: KeyboardEvent) => {
    if (
      (event.metaKey || event.ctrlKey) &&
      event.key.toLowerCase() === keyboardKey
    ) {
      event.preventDefault(); // Empêche le comportement par défaut (recherche navigateur)
      callbackAction && callbackAction();
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [callbackAction]);
};
