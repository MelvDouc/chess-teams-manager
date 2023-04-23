export default function createQueryBuilder<T>(queryFn: (sql: string, values?: (number | string | null)[]) => T) {
  let query = "";
  const run = (values?: (number | string | null)[]) => queryFn(query, values);

  const select = (col: string, ...cols: string[]) => {
    query += `SELECT\n${[col, ...cols].join(",\n")}`;

    return {
      from: (tableName: string) => {
        query += `\nFROM ${tableName}`;
        return { innerJoin, where, run };
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

  const where = (whereClause: string) => {
    query += `\nWHERE ${whereClause}`;
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
}