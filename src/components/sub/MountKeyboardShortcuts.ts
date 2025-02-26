import { RefObject } from "react";
import { useHotkeys } from "react-hotkeys-hook";

function MountKeyboardShortcuts(queryRef: RefObject<HTMLInputElement | null>) {
  const handleModK = (event: KeyboardEvent) => {
    event.preventDefault();
    if (document.activeElement === queryRef.current) {
      queryRef.current?.blur();
      return;
    }
    queryRef.current?.focus();
  };

  const handleEsc = () => {
    if (document.activeElement instanceof HTMLInputElement) {
      document.activeElement.blur();
    }
  };

  useHotkeys("mod+k", handleModK, { enableOnFormTags: true }, [queryRef]);
  useHotkeys("esc", handleEsc, { enableOnFormTags: true });

  return null;
}

export default MountKeyboardShortcuts;
