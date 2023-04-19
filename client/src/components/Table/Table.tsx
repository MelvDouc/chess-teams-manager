import cssClasses from "@components/Table/Table.module.scss";

export default function Table({ large, children }: {
  large: boolean;
  children?: ComponentChildren;
}) {
  return (
    <table classes={{
      [cssClasses.table]: true,
      [cssClasses.tableLarge]: large
    }}>
      {children}
    </table>
  );
}

Table.SubtitleRow = ({ title, colSpan }: { title: string; colSpan: number; }) => {
  return (
    <tbody>
      <tr>
        <td className={cssClasses.tableSubtitleCell} colSpan={colSpan}>{title}</td>
      </tr>
    </tbody>
  );
};

const Actions: ComponentFactory = ({ children }) => (
  <div className={cssClasses.actions}>{children}</div>
);

Table.Actions = Actions;