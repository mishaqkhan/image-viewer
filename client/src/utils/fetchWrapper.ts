import type { Method, Url } from "../types";

export async function fetchWrapper<TData, TBody = unknown>(
  method: Method,
  url?: Url,
  body?: TBody,
  additionalOptions?: any
): Promise<TData> {
  const _url = url || method;

  const options = {
    method,
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
      Cache: "no-cache",
    },
    credentials: "include",
    body: body && JSON.stringify(body),
    ...additionalOptions,
  };

  const response = await fetch(_url, options);
  const data = response.json();

  return data;
}
