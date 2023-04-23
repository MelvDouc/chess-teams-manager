export default function createQueryBuilder<T>(queryFn: (sql: string, values?: (number | string | null)[]) => T) {
  return () => {
    let query = "";
    const run = (values?: (number | string | null)[]) => queryFn(query, values);

    const select = (col: string, ...cols: string[]) => {
      query += `SELECT\n${[col, ...cols].join(",\n")}`;

      return {
        from: (tableName: string) => {
          query += `\nFROM ${tableName}`;
          return { innerJoin, limit, orderBy, where, run };
        }
      };
    };

    const innerJoin = (tableName: string) => {
      query += `\nINNER JOIN ${tableName}`;
      return { on };
    };

    const on = (onClause: string) => {
      query += `\nON ${onClause}`;
      return { innerJoin, where, run };
    };

    const where = (filter: SqlRecord) => {
      query += `\nWHERE ${formatWhereFilter(filter, Object.keys(filter)[0])}`;
      return { limit, orderBy, run };
    };

    const orderBy = (col: string, ...cols: string[]) => {
      query += `\nORDER BY ${[col, ...cols].join()}`;
      return { limit, run };
    };

    const limit = (value: number) => {
      query += `\nLIMIT ${value}`;
      return { run };
    };

    return { select };
  };

  function formatWhereFilter(filter: SqlRecord, key: string): string {
    if (key === "$and")
      return Object.keys(filter["$and"]!)
        .map((k) => formatWhereFilter(filter["$and"] as SqlRecord, k))
        .join(" AND ");

    if (key === "$or")
      return "("
        + Object.keys((filter as OrFilter)["$or"]!)
          .map((k) => formatWhereFilter(filter["$or"] as SqlRecord, k))
          .join(" OR ")
        + ")";

    return `${key} = ${filter[key]}`;
  }
}

type SqlValue = string | null | number;
type SqlRecord = {
  [key: string]: typeof key extends "$and" ? AndFilter
  : typeof key extends "$or" ? OrFilter
  : SqlValue | SqlRecord;
};

type AndFilter = SqlRecord & {
  $or?: OrFilter;
};

type OrFilter = SqlRecord & {
  $and?: AndFilter;
};