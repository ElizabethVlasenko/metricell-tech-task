import Table from "../../ui/Table";
import { type ListValueSum } from "../../utils/types/listTypes";

type GroupValueRowPropsType = {
  valueSum: ListValueSum;
};

export default function GroupValueRow({ valueSum }: GroupValueRowPropsType) {
  const { startingLetter, totalValue } = valueSum;
  return (
    <Table.Row>
      <p className="font-semibold text-gray-800">{startingLetter}</p>
      <p className="text-gray-800">{totalValue}</p>
    </Table.Row>
  );
}
