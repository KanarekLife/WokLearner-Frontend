export class PaginationStatus {
  constructor(page: number, pages: number) {
    this.page = page;
    this.pages = pages;
  }
  page: number;
  pages: number;
}
