export const generatePaginationDisplay = (pagination) => {
  // Handle null, undefined, or missing properties
  const currentPage = pagination?.currentPage ?? 1;
  const itemsPerPage = pagination?.itemsPerPage ?? 10;
  const totalItems = pagination?.totalItems ?? 0;
  const totalPages = pagination?.totalPages ?? 0;

  // Calculate start and end item indices
  const start = (currentPage - 1) * itemsPerPage + 1;
  const end = Math.min(currentPage * itemsPerPage, totalItems);

  // Ensure currentPage doesn't exceed totalPages (optional safety)
  const displayedPage = Math.min(currentPage, totalPages);

  return `Menampilkan ${start} - ${end} dari total ${totalItems} data pada kolom ${displayedPage} dari ${totalPages} kolom`;
};
