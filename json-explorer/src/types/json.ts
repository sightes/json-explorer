export interface JSONNode {
  key: string;
  value: unknown;
  type: "object" | "array" | "string" | "number" | "boolean" | "null";
  children?: JSONNode[];
  path: string;
}

export interface ToastMessage {
  id: string;
  message: string;
  type: "success" | "error";
}
