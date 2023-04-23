export default function queryBuilder<T>(queryFn: (sql: string, values?: (number | string | null)[]) => T) {
  let query = "";
  const run = (values?: (number | string | null)[]) => queryFn(query, values);

  const select = (col: string, ...cols: string[]) => {
    query += `SELECT ${[col, ...cols].join()}`;

    return {
      from: (tableName: string) => {
        query += ` FROM ${tableName}`;
        return { innerJoin, where };
      }
    };
  };

  const innerJoin = (tableName: string) => {
    query += ` INNER JOIN ${tableName}`;
    return { on };
  };

  const on = (onClause: string) => {
    query += ` ON ${onClause}`;
    return { innerJoin, where };
  };

  const where = (whereClause: string) => {
    query += ` WHERE ${whereClause}`;
    return { limit, orderBy, run };
  };

  const orderBy = (col: string, ...cols: string[]) => {
    query += ` ORDER BY ${[col, ...cols].join()}`;
    return { limit, run };
  };

  const limit = (value: number) => {
    query += ` LIMIT ${value}`;
    return { run };
  };

  return { select };
}