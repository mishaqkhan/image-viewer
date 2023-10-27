const methods = {
  GET: "GET",
  POST: "POST",
  PATCH: "PATCH",
  PUT: "PUT",
  DELETE: "DELETE",
} as const;

export type Method = (typeof methods)[keyof typeof methods];
export type Url = string;

export type Image = {
  id: number;
  url: string;
  name: string;
  author: string;
  description: string;
};
