import { Braces, Minimize2, Copy, Trash2 } from "lucide-react";
import { Button } from "@/shared/ui/Button";

function ActionButtons({
  onPrettify,
  onMinify,
  onCopy,
  onClear,
  copyDisabled,
}: {
  onPrettify: () => void;
  onMinify: () => void;
  onCopy: () => void;
  onClear: () => void;
  copyDisabled: boolean;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Button variant="default" onClick={onPrettify}>
        <Braces />
        Prettify
      </Button>
      <Button variant="secondary" onClick={onMinify}>
        <Minimize2 />
        Minify
      </Button>
      <Button variant="outline" onClick={onCopy} disabled={copyDisabled}>
        <Copy />
        Copy
      </Button>
      <Button variant="ghost" onClick={onClear}>
        <Trash2 />
        Clear
      </Button>
    </div>
  );
}

export { ActionButtons };
