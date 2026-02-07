import { useCallback, useState } from "react";
import {
  prettifyJson,
  minifyJson,
  validateJson,
  type JsonValidationError,
} from "../lib/formatJson";

function useJsonFormatter() {
  const [input, setInput] = useState("");
  const [output, setOutput] = useState("");
  const [error, setError] = useState<JsonValidationError | null>(null);

  const handlePrettify = useCallback(() => {
    if (!input.trim()) {
      setError(null);
      setOutput("");
      return;
    }
    const result = prettifyJson(input);
    if (result.success) {
      setOutput(result.output);
      setError(null);
    } else {
      setError(result.error);
    }
  }, [input]);

  const handleMinify = useCallback(() => {
    if (!input.trim()) {
      setError(null);
      setOutput("");
      return;
    }
    const result = minifyJson(input);
    if (result.success) {
      setOutput(result.output);
      setError(null);
    } else {
      setError(result.error);
    }
  }, [input]);

  const handleValidate = useCallback(() => {
    if (!input.trim()) {
      setError(null);
      return;
    }
    const result = validateJson(input);
    if (result.success) {
      setError(null);
    } else {
      setError(result.error);
    }
  }, [input]);

  const handleClear = useCallback(() => {
    setInput("");
    setOutput("");
    setError(null);
  }, []);

  return {
    input,
    setInput,
    output,
    error,
    handlePrettify,
    handleMinify,
    handleValidate,
    handleClear,
  };
}

export { useJsonFormatter };
