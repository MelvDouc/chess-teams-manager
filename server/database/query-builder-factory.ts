import { Client as MysqlClient } from "mysql";

export default function queryBuilderFactory(client: MysqlClient) {
  return () => {
    let query = "";
    const runQuery = () => client.query(query);
    const execute = () => client.execute(query);

    const join = (type: "left" | "right" | "inner" | "full outer", tableName: string) => {
      query += `\n${type.toUpperCase()} JOIN ${tableName}`;

      return {
        on: (onClause: string) => {
          query += `\nON ${onClause}`;
          return { join, where, run: runQuery };
        }
      };
    };

    const where = (filter: SqlRecord) => {
      query += `\nWHERE ${formatWhereFilter(filter, Object.keys(filter)[0])}`;
      return { limit, orderBy, run: runQuery };
    };

    const orderBy = (col: string, ...cols: string[]) => {
      query += `\nORDER BY ${[col, ...cols].join()}`;
      return { limit, run: runQuery };
    };

    const limit = (value: number) => {
      query += `\nLIMIT ${value}`;
      return { run: runQuery };
    };

    return {
      select: (col: string, ...cols: string[]) => {
        query += `SELECT\n${[col, ...cols].join(",\n")}`;

        return {
          from: (tableName: string) => {
            query += `\nFROM ${tableName}`;
            return {
              join,
              limit,
              orderBy,
              where,
              run: runQuery
            };
          }
        };
      },
      insertInto: (tableName: string) => {
        query += `\nINSERT INTO ${tableName}`;
        return {
          values: <T extends Record<string, SqlValue>>(values: T[]) => {
            const valuesField = values
              .map((value) => {
                return "(" + Object.keys(value).map(formatValue).join() + ")";
              })
              .join();
            query += ` (${Object.keys(values[0]).join()}) VALUES ${valuesField}`;

            return { run: execute };
          }
        };
      },
      update: (tableName: string) => {
        query += `\nUPDATE ${tableName}`;
        return {
          set: (updates: Record<string, SqlValue>) => {
            query += ` SET ${Object.entries(updates).map(([key, value]) => key + " = " + formatValue(value)).join()}`;
            return { where };
          }
        };
      },
      deleteFrom: (tableName: string) => {
        query += `DELETE FROM ${tableName}`;
        return { where };
      }
    };
  };
}

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

  return `${key} = ${formatValue(filter[key] as SqlValue)}`;
}

function formatValue(value: SqlValue): string | number {
  switch (typeof value) {
    case "string":
      return `'${value}'`;
    case "number":
      return value;
    case "boolean":
      return Number(value);
    case "object":
      return "null";
  }
}

export type SqlValue = string | boolean | null | number;

export type SqlRecord = {
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