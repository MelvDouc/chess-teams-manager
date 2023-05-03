export default function LineUpTablePlayerNameCell({ playerFullName, setPlayerFullName }: {
  playerFullName: string;
  setPlayerFullName: (name: string) => void;
}) {
  return (
    <>
      <input
        type="text"
        oninput={({ target }) => {
          const { value } = target as HTMLInputElement;
          setPlayerFullName(value.trim());
        }}
        value={playerFullName}
        $init={(element) => element.setAttribute("list", "players-datalist")}
      />
    </>
  );
}