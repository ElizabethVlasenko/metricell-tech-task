import { SubmitHandler, useForm } from "react-hook-form";
import Button from "../../ui/Button";
import FormRow from "../../ui/FormRow";
import Heading from "../../ui/Heading";
import { letterOnlyRegex } from "../../utils/const/regexConst";
import { type Employee } from "../../utils/types/employeesTypes";
import { useAddEmployee } from "./useAddEmployee";

type AddEmployeePropsType = {
  onCloseModal?: () => void;
};

export default function AddEmployee({ onCloseModal }: AddEmployeePropsType) {
  const { addEmployeeAsync, isAdding, error: fetchError } = useAddEmployee();
  const {
    register,
    formState: { errors },
    handleSubmit,
  } = useForm<Employee>();

  const onSubmit: SubmitHandler<Employee> = async (data) => {
    await addEmployeeAsync(data);
    onCloseModal?.();
  };

  return (
    <div className="flex flex-col gap-5">
      <Heading>Add new record</Heading>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="max-w-full flex flex-col gap-5"
      >
        {fetchError && (
          <span className="text-red-700 text-md">
            Couldn't Add the employee. Please, try again later.
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
            disabled={isAdding}
            onClick={() => onCloseModal?.()}
          >
            Cancel
          </Button>
          <Button variant="primary" disabled={isAdding} type="submit">
            Add
          </Button>
        </div>
      </form>
    </div>
  );
}
