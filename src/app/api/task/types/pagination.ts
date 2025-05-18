export type Pagination = {
  page: number;
  limit: number;
  skip: () => number;
};
