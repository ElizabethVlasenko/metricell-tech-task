import Table from "../../ui/Table";
import { ListValueSums } from "../../utils/types/listTypes";
import GroupValueRow from "./GroupValueRow";

type GroupValuesTablePropsType = {
  listValueSum: ListValueSums;
};

export default function GroupValuesTable({
  listValueSum,
}: GroupValuesTablePropsType) {
  return (
    <Table columns="grid-cols-[1fr_1fr]">
      <Table.Header>
        <div role="columnheader">Letter</div>
        <div role="columnheader">Total Value</div>
      </Table.Header>

      <Table.Body
        data={listValueSum}
        render={(valueSum) => {
          return (
            <GroupValueRow key={valueSum.startingLetter} valueSum={valueSum} />
          );
        }}
      />
    </Table>
  );
}
