import { Textarea } from "@/shared/ui/Textarea";

function JsonOutputPanel({ value }: { value: string }) {
  return (
    <div className="flex flex-col gap-2">
      <label className="text-sm font-medium">Output</label>
      <Textarea
        value={value}
        readOnly
        placeholder="Formatted output will appear here..."
        className="min-h-[400px] resize-none font-mono text-sm"
      />
    </div>
  );
}

export { JsonOutputPanel };
