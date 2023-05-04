import { Observable } from "reactfree-jsx";
import cssClasses from "./Modal.module.scss";

const Modal = (() => {
  const state = new Observable<ModalState>({
    type: "success",
    message: "",
  });

  const modal: HTMLDialogElement = (
    <dialog
      className={cssClasses.modal}
      $init={(element) => (element.returnValue = "cancel")}
      onclick={({ clientX, clientY }) => {
        const { x, y } = modal.getBoundingClientRect();
        if (x < clientX || x > clientX || y < clientY || y > clientY) modal.close();
      }}
      onclose={() => {
        state.value.onClose && state.value.onClose(modal.returnValue);
      }}
    >
      <article className="d-flex flex-column align-items-center justify-content-center gap-3">
        <p className="text-center">{state.map(({ message }) => message)}</p>
        <div className="d-flex justify-content-center align-items-center gap-2">
          <button
            $init={(element) => {
              element.className = `btn btn-${state.value.type}`;
              state.subscribe(({ type }) => {
                element.className = `btn btn-${type}`;
              });
            }}
            onclick={() => {
              modal.returnValue = "OK";
              modal.close();
            }}
          >
            {state.map(({ buttonText }) => buttonText ?? "OK")}
          </button>
          <button
            classes={{
              btn: true,
              "btn-danger": true,
              "d-none": state.map(({ cancellable }) => cancellable === true),
            }}
            onclick={() => modal.close()}
          >
            Annuler
          </button>
        </div>
      </article>
    </dialog>
  );

  state.subscribe(() => modal.showModal());

  return {
    getModal: () => modal,
    setState: (value: ModalState) => (state.value = value),
  };
})();

export default Modal;

type ModalReturnValue = "OK" | "cancel";

interface ModalState {
  message: string;
  type: "success" | "warning" | "danger";
  buttonText?: string;
  cancellable?: boolean;
  onClose?: (returnValue: ModalReturnValue | string) => void;
}
