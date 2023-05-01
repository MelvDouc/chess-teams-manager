import cssClasses from "./AlertBox.module.scss";

export default function AlertBox({ message, type, buttonText, preClose, postClose, onCancel }: {
  message: string;
  type: "success" | "warning" | "danger";
  buttonText?: string;
  preClose?: VoidFunction;
  postClose?: VoidFunction;
  onCancel?: (closeFn: VoidFunction) => void;
}) {
  let box: HTMLElement;

  function close() {
    preClose && preClose();
    box.remove();
    postClose && postClose();
    document.removeEventListener("keydown", closeOnEnterPress);
  }

  function closeOnEnterPress({ key }: KeyboardEvent) {
    if (key === "Enter")
      close();
  }

  box = (
    <div className={cssClasses.alertBoxContainer}>
      <article className={cssClasses.alertBox}>
        <p>{message}</p>
        <div className="d-flex justify-content-center align-items-center gap-2">
          <button
            classNames={["btn", `btn-${type}`]}
            onclick={close}
          >{buttonText ?? "OK"}</button>
          {onCancel
            ? <button
              classNames={["btn", "btn-danger"]}
              onclick={() => {
                onCancel(() => {
                  box.remove();
                  document.removeEventListener("keydown", closeOnEnterPress);
                });
              }}
            >Annuler</button>
            : null}
        </div>
      </article>
    </div>
  );

  document.body.prepend(box);
  document.addEventListener("keydown", closeOnEnterPress);
}