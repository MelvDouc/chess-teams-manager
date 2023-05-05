import { Observable } from "reactfree-jsx";
import type PlayersTableRow from "./PlayersTableRow.jsx";
import cssClasses from "./PlayersTable.module.scss";

export default function PlayersTableTHeader({ sortFnObs }: {
  sortFnObs: Observable<SortRowFn | null>;
}) {
  return ({ text, sortFn, initialOrder }: {
    text: string;
    sortFn: SortRowFn;
    initialOrder?: SortOrder;
  }) => {
    let order: SortOrder = initialOrder ?? 0;
    const reverseSortFn: SortRowFn = (a, b) => sortFn(b, a);

    const handleClick = () => {
      order = (++order + 1) % 3 - 1 as SortOrder;
      switch (order) {
        case SortOrder.DESC:
          sortFnObs.value = reverseSortFn;
          break;
        case SortOrder.ASC:
          sortFnObs.value = sortFn;
          break;
        case SortOrder.NONE:
          sortFnObs.value = null;
      }
    };

    return (
      <th
        className={cssClasses.playersTableSortHeader}
        data-sort-order={sortFnObs.map((fn) => {
          switch (fn) {
            case sortFn:
              return SortOrder[SortOrder.ASC];
            case reverseSortFn:
              return SortOrder[SortOrder.DESC];
            default:
              return SortOrder[SortOrder.NONE];
          }
        })}
        onclick={handleClick}
      >{text}</th>
    );
  };
}

enum SortOrder {
  NONE = 0,
  ASC = 1,
  DESC = -1,
}


type SortRowFn = (a: PlayersTableRow["player"], b: PlayersTableRow["player"]) => number;