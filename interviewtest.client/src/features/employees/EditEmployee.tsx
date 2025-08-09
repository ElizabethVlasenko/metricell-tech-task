import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import { type Employee } from "../../utils/types/employeesTypes";
import { useForm, SubmitHandler } from "react-hook-form";
import { useEditEmployee } from "./useEditEmployee";
import Heading from "../../ui/Heading";
import { letterOnlyRegex } from "../../utils/const/regexConst";

type EditEmployeePropsType = {
  initialValues: Employee;
  onCloseModal?: () => void;
};

export default function EditEmployee({
  initialValues,
  onCloseModal,
}: EditEmployeePropsType) {
  const { editEmployeeAsync, isEditing, error: fetchError } = useEditEmployee();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Employee>({
    defaultValues: initialValues,
  });

  const onSubmit: SubmitHandler<Employee> = async (data) => {
    await editEmployeeAsync(data);
    onCloseModal?.();
  };

  return (
    <div className="flex flex-col gap-5">
      <Heading>Edit record</Heading>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-full flex flex-col gap-5"
      >
        {fetchError && (
          <span className="text-red-700 text-md">
            Couldn't edit the employee. Please, try again later.
          </span>
        )}
        <FormRow label={"Name"} error={errors.name?.message} required>
          <input
            className="w-md bg-white rounded-2xl p-2 border border-gray-300 max-w-full"
            type="text"
            id="name"
            {...register("name", {
              required: "This field is required.",
              minLength: {
                value: 3,
                message: "Name should be at least 3 characters long.",
              },
              pattern: {
                value: letterOnlyRegex,
                message: "Only letters are allowed",
              },
            })}
          />
        </FormRow>

        <FormRow label={"Value"} error={errors.value?.message} required>
          <input
            className="w-md bg-white rounded-2xl p-2 border border-gray-300 max-w-full"
            type="number"
            id="value"
            {...register("value", {
              required: "This field is required.",
              min: {
                value: 0,
                message: "Value must be a positive number.",
              },
            })}
          />
        </FormRow>

        <div className="flex gap-3 justify-end">
          <Button
            variant="secondary"
            disabled={isEditing}
            onClick={() => onCloseModal?.()}
          >
            Cancel
          </Button>
          <Button variant="primary" disabled={isEditing} type="submit">
            Confirm
          </Button>
        </div>
      </form>
    </div>
  );
}
