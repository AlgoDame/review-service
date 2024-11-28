const calculateTotalPages = (total: number, limit: number) => {
  return Math.ceil(total / limit);
};

const calculateNextPage = (currentPage: number = 1, totalPages: number) => {
  const nextPage = currentPage < totalPages ? currentPage + 1 : null;
  return nextPage;
};

const paginateData = (pageNo: any, pageSize: any) => {
  const page = pageNo ? parseInt(pageNo) : 1;
  const limit = pageSize ? parseInt(pageSize) : 10;

  const query = {
    skip: limit * (page - 1),
    limit: limit,
    currentPage: page
  };

  return query;
};

export const paginationUtils = {
  totalPages: calculateTotalPages,
  nextPage: calculateNextPage,
  paginateData
};
