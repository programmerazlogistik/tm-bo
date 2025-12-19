import { cn } from "@muatmuat/lib/utils";
import { Button } from "@muatmuat/ui/Button";
import { IconComponent } from "@muatmuat/ui/IconComponent";
import { Modal, ModalContent } from "@muatmuat/ui/Modal";

/**
 * ConfirmationModal component displays a modal dialog with confirmation and cancel actions.
 *
 * @param {Object} props - Component props.
 * @param {"small"|"big"} [props.size="small"] - The size of the modal dialog.
 * @param {boolean} props.isOpen - Whether the modal is currently open.
 * @param {Function} props.setIsOpen - Function to control the open state of the modal.
 * @param {{ text: string, className: string }} [props.title={ text: "", className: "" }] - Title configuration object.
 * @param {boolean} [props.withCancel=true] - Whether to show the cancel button.
 * @param {boolean} [props.withConfirm=true] - Whether to show the confirm button.
 * @param {{ text: string, className: string }} [props.description={ text: "", className: "" }] - Description configuration object.
 * @param {{ classname: string, variant: string, text: string, onClick: Function }} [props.cancel] - Cancel button configuration.
 * @param {{ classname: string, variant: string, text: string, onClick: Function }} [props.confirm] - Confirm button configuration.
 * @param {string} [props.className=""] - Additional CSS class for the modal container.
 * @param {boolean} [props.closeOnOutsideClick=false] - Whether to close the modal when clicking outside.
 * @param {boolean} [props.disabled=false] - Whether the buttons are disabled.
 * @returns {JSX.Element} The rendered confirmation modal component.
 */
const ConfirmationModal = ({
  size = "small",
  isOpen,
  setIsOpen,
  title = { text: "", className: "" },
  withCancel = true,
  withConfirm = true,
  description = { text: "", className: "" },
  cancel = {
    classname: "",
    variant: "",
    text: "",
    onClick: () => setIsOpen(false),
  },
  confirm = {
    classname: "",
    variant: "",
    text: "",
    onClick: () => setIsOpen(false),
  },
  className = "",
  closeOnOutsideClick = false,
  disabled = false,
}) => {
  const { text: titleText = "", className: titleClassName = "" } = title;
  const { text: descriptionText = "", className: descriptionClassName = "" } =
    description;
  const {
    classname: cancelClassName = "",
    text: cancelText = "",
    onClick: onCancel = () => setIsOpen(false),
    variant: cancelVariant = "muatparts-error-secondary",
  } = cancel;
  const {
    classname: confirmClassName = "",
    text: confirmText = "",
    onClick: onConfirm = () => setIsOpen(false),
    variant: confirmVariant = "muatparts-primary",
  } = confirm;
  const modalClassnames = {
    small: "w-modal-small",
    big: "w-modal-big",
  };
  const modalClassname = modalClassnames[size] || modalClassnames.small;

  return (
    <Modal
      closeOnOutsideClick={closeOnOutsideClick}
      open={isOpen}
      onOpenChange={setIsOpen}
      withCloseButton={false}
    >
      <ModalContent className={cn("w-[411px]", modalClassname, className)}>
        <div className="flex flex-col items-center gap-y-6 px-6 py-9">
          {titleText ? (
            <div className="flex gap-x-2">
              <div className="flex w-[337px] justify-center pl-2">
                <h1
                  className={cn(
                    "text-base font-bold leading-[19.2px] text-neutral-900",
                    titleClassName
                  )}
                >
                  {titleText}
                </h1>
              </div>
              <IconComponent
                className="cursor-pointer text-primary-700"
                onClick={onCancel}
                src="/icons/silang8.svg"
                width={8}
                height={8}
              />
            </div>
          ) : null}
          {descriptionText ? (
            <p
              className={cn(
                "text-center text-sm font-medium leading-[15.4px] text-neutral-900",
                descriptionClassName
              )}
              dangerouslySetInnerHTML={{ __html: descriptionText }}
            />
          ) : null}
          {withCancel || withConfirm ? (
            <div className="flex items-center gap-x-2">
              {withCancel && (
                <Button
                  variant={cancelVariant}
                  className={cn("h-8", cancelClassName)}
                  onClick={onCancel}
                  type="button"
                  disabled={disabled}
                >
                  {cancelText}
                </Button>
              )}
              {withConfirm && (
                <Button
                  variant={confirmVariant}
                  className={cn("h-8", confirmClassName)}
                  onClick={onConfirm}
                  type="button"
                  disabled={disabled}
                >
                  {confirmText}
                </Button>
              )}
            </div>
          ) : null}
        </div>
      </ModalContent>
    </Modal>
  );
};

export default ConfirmationModal;
