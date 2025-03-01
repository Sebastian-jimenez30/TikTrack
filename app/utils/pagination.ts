class PaginationUtil {
  static getIndexes(page: string, data_length: number, per_page: number) {
    const start = (Number(page) - 1) * per_page;

    let end = start + Number(per_page);
    if (end > data_length) {
      end = data_length;
    }

    const indexes = [start, end];

    return indexes;
  }
}

export default PaginationUtil;
