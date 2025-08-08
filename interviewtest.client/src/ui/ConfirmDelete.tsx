import Button from "./Button";
import Heading from "./Heading";

type ConfirmDeletePropsType = {
  resourceName: string;
  onConfirm: () => void;
  disabled?: boolean;
  onCloseModal?: () => void;
  error?: Error | null;
};

export default function ConfirmDelete({
  resourceName,
  onConfirm,
  disabled,
  onCloseModal,
  error,
}: ConfirmDeletePropsType) {
  return (
    <div className="flex flex-col gap-5 w-md">
      <Heading>Delete {resourceName}</Heading>
      <p>
        Are you sure you want to delete this {resourceName} permanently? This
        action cannot be undone.
      </p>

      {error && (
        <span className="text-red-700 text-md">
          {" "}
          Couldn't delete this {resourceName}. Please, try again later.
        </span>
      )}

      <div className="flex gap-3 justify-end">
        <Button
          variant="secondary"
          disabled={disabled}
          onClick={() => onCloseModal?.()}
        >
          Cancel
        </Button>
        <Button variant="danger" disabled={disabled} onClick={onConfirm}>
          Delete
        </Button>
      </div>
    </div>
  );
}
