import { AlertCircle } from "lucide-react";
import { Textarea } from "@/shared/ui/Textarea";
import type { JsonValidationError } from "../lib/formatJson";

function JsonInputPanel({
  value,
  onChange,
  error,
}: {
  value: string;
  onChange: (value: string) => void;
  error: JsonValidationError | null;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Input</label>
      <Textarea
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder="Paste your JSON here..."
        className="min-h-[400px] resize-none font-mono text-sm"
      />
      {error && (
        <div className="flex items-start gap-2 rounded-md bg-destructive/10 p-3 text-sm text-destructive">
          <AlertCircle className="mt-0.5 size-4 shrink-0" />
          <span>
            {error.line != null && error.column != null
              ? `Line ${error.line}, Column ${error.column}: ${error.message}`
              : error.message}
          </span>
        </div>
      )}
    </div>
  );
}

export { JsonInputPanel };
