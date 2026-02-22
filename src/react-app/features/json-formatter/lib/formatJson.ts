interface JsonValidationError {
  message: string;
  line: number | null;
  column: number | null;
}

type JsonFormatResult =
  | { success: true; output: string }
  | { success: false; error: JsonValidationError };

function extractPosition(
  errorMessage: string,
  input: string,
): { line: number | null; column: number | null } {
  // Firefox: "at line N column N"
  const firefoxMatch = errorMessage.match(/at line (\d+) column (\d+)/);
  if (firefoxMatch) {
    return {
      line: Number(firefoxMatch[1]),
      column: Number(firefoxMatch[2]),
    };
  }

  // V8: "at position N"
  const v8Match = errorMessage.match(/at position (\d+)/);
  if (v8Match) {
    const position = Number(v8Match[1]);
    let line = 1;
    let column = 1;
    for (let i = 0; i < position && i < input.length; i++) {
      if (input[i] === "\n") {
        line++;
        column = 1;
      } else {
        column++;
      }
    }
    return { line, column };
  }

  return { line: null, column: null };
}

function createErrorResult(error: unknown, input: string): JsonFormatResult {
  if (error instanceof SyntaxError) {
    const { line, column } = extractPosition(error.message, input);
    return {
      success: false,
      error: { message: error.message, line, column },
    };
  }
  return {
    success: false,
    error: {
      message: error instanceof Error ? error.message : "Unknown error",
      line: null,
      column: null,
    },
  };
}

function tryParseWithUnescape(input: string): unknown {
  try {
    const parsed = JSON.parse(input);
    if (typeof parsed === "string") {
      try {
        return JSON.parse(parsed);
      } catch {
        return parsed;
      }
    }
    return parsed;
  } catch (firstError) {
    if (input.includes('\\"')) {
      const unescaped = input.replace(/\\"/g, '"');
      return JSON.parse(unescaped);
    }
    throw firstError;
  }
}

function validateJson(input: string): JsonFormatResult {
  try {
    tryParseWithUnescape(input);
    return { success: true, output: input };
  } catch (error) {
    return createErrorResult(error, input);
  }
}

function prettifyJson(input: string, indent = 2): JsonFormatResult {
  try {
    const parsed = tryParseWithUnescape(input);
    return { success: true, output: JSON.stringify(parsed, null, indent) };
  } catch (error) {
    return createErrorResult(error, input);
  }
}

function minifyJson(input: string): JsonFormatResult {
  try {
    const parsed = tryParseWithUnescape(input);
    return { success: true, output: JSON.stringify(parsed) };
  } catch (error) {
    return createErrorResult(error, input);
  }
}

export { validateJson, prettifyJson, minifyJson, extractPosition };
export type { JsonValidationError, JsonFormatResult };
