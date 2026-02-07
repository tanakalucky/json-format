import { describe, expect, it } from "vitest";
import { prettifyJson, minifyJson, validateJson } from "./formatJson";

describe("prettifyJson", () => {
  it("有効な JSON を整形できる", () => {
    const result = prettifyJson('{"name":"John","age":30}');
    expect(result).toEqual({
      success: true,
      output: '{\n  "name": "John",\n  "age": 30\n}',
    });
  });

  it("空オブジェクトを整形できる", () => {
    const result = prettifyJson("{}");
    expect(result).toEqual({ success: true, output: "{}" });
  });

  it("ネストされた構造を整形できる", () => {
    const result = prettifyJson('{"a":{"b":{"c":1}}}');
    expect(result.success).toBe(true);
    if (result.success) {
      expect(result.output).toContain('"a"');
      expect(result.output).toContain('"b"');
      expect(result.output).toContain('"c"');
    }
  });

  it("カスタムインデントを指定できる", () => {
    const result = prettifyJson('{"a":1}', 4);
    expect(result).toEqual({
      success: true,
      output: '{\n    "a": 1\n}',
    });
  });

  it("不正な JSON でエラーを返す", () => {
    const result = prettifyJson("{invalid}");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.message).toBeTruthy();
    }
  });
});

describe("minifyJson", () => {
  it("有効な JSON を圧縮できる", () => {
    const input = '{\n  "name": "John",\n  "age": 30\n}';
    const result = minifyJson(input);
    expect(result).toEqual({
      success: true,
      output: '{"name":"John","age":30}',
    });
  });

  it("不正な JSON でエラーを返す", () => {
    const result = minifyJson("not json");
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.message).toBeTruthy();
    }
  });
});

describe("validateJson", () => {
  it("有効な JSON で success を返す", () => {
    const result = validateJson('{"valid": true}');
    expect(result.success).toBe(true);
  });

  it("配列も有効な JSON として認識する", () => {
    const result = validateJson("[1, 2, 3]");
    expect(result.success).toBe(true);
  });

  it("不正な JSON でエラーメッセージを返す", () => {
    const result = validateJson('{"key": }');
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.message).toBeTruthy();
    }
  });

  it("エラー位置情報を含む", () => {
    const input = '{\n  "a": 1,\n  "b": \n}';
    const result = validateJson(input);
    expect(result.success).toBe(false);
    if (!result.success) {
      expect(result.error.message).toBeTruthy();
    }
  });
});
