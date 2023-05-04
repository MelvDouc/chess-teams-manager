import cssClasses from "./LineUpTable.module.scss";

export default function LineUpTableFfeIdCell({
  ffeId,
  setFfeId,
  onFfeIdChange,
}: {
  ffeId: string;
  setFfeId: (ffeId: string) => void;
  onFfeIdChange: (subscription: (ffeId: string) => void) => void;
}) {
  return (
    <div
      className={cssClasses.ffeIdElement}
      contentEditable="true"
      oninput={({ target }) => setFfeId((target as HTMLElement).innerText)}
      $init={(element) => {
        onFfeIdChange((ffeId) => {
          element.innerText = ffeId;
        });
      }}
    >
      {ffeId}
    </div>
  );
}
