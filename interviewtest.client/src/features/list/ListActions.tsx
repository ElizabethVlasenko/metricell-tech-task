import toast from "react-hot-toast";
import Button from "../../ui/Button";
import GroupValuesTable from "./GroupValuesTable";
import { useGetEmployeeValueSum } from "./useGetEmployeeValueSum";
import { useIncrementValues } from "./useIncrementValues";

export default function ListActions() {
  const { isLoading, incrementValuesAsync, error } = useIncrementValues();
  const {
    isLoading: isLoadingValueSum,
    listValueSum,
    error: errorValueSum,
    refetchListValueSum,
  } = useGetEmployeeValueSum();

  const handleFetchListValueSum = async () => {
    const result = await refetchListValueSum();

    if (result.isSuccess) {
      toast.success("Data loaded successfully!");
    } else {
      toast.error("Failed to load data.");
    }
  };

  return (
    <div className="flex flex-col gap-4 flex-wrap">
      <div className="flex flex-col-reverse gap-2 md:gap-4 md:flex-row">
        <div className="flex flex-col gap-2 items-start">
          <Button
            disabled={isLoadingValueSum}
            onClick={handleFetchListValueSum}
          >
            Get Employee Value Sum
          </Button>
          {errorValueSum && (
            <span className="text-red-700 text-md leading-none">
              Couldn't get values.
              <br /> Please, try again later.
            </span>
          )}
        </div>
        <div className="flex flex-col gap-2 items-start">
          <Button disabled={isLoading} onClick={() => incrementValuesAsync()}>
            Increment Values
          </Button>
          {error && (
            <span className="text-red-700 text-md leading-none">
              Couldn't execute incrementing the values.
              <br /> Please, try again later.
            </span>
          )}
        </div>
      </div>
      {listValueSum && <GroupValuesTable listValueSum={listValueSum} />}
    </div>
  );
}
