export interface QueryParams {
  skip?: any;
  query?: string;
  page?: string;
  limit?: string;
  search?: string;
  startDate?: string;
  endDate?: string;
  language?: string;
  status?: string;
}

export interface PaginationOptions {
  skip: number;
  limit: number;
  currentPage: number;
}
