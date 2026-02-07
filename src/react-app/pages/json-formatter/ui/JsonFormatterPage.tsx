import { toast } from "sonner";
import {
  useJsonFormatter,
  JsonInputPanel,
  JsonOutputPanel,
  ActionButtons,
} from "@/features/json-formatter";

function JsonFormatterPage() {
  const { input, setInput, output, error, handlePrettify, handleMinify, handleClear } =
    useJsonFormatter();

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(output);
      toast.success("Copied to clipboard");
    } catch {
      toast.error("Failed to copy");
    }
  };

  return (
    <div className="mx-auto max-w-6xl px-4 py-8">
      <div className="mb-6">
        <h1 className="text-2xl font-bold">JSON Formatter</h1>
        <p className="text-muted-foreground text-sm">
          Validate, prettify, and minify your JSON data.
        </p>
      </div>
      <div className="mb-4">
        <ActionButtons
          onPrettify={handlePrettify}
          onMinify={handleMinify}
          onCopy={handleCopy}
          onClear={handleClear}
          copyDisabled={!output}
        />
      </div>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <JsonInputPanel value={input} onChange={setInput} error={error} />
        <JsonOutputPanel value={output} />
      </div>
    </div>
  );
}

export { JsonFormatterPage };
