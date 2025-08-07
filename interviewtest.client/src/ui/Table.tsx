import { createContext, useContext } from "react";

const TableContext = createContext({ columns: "grid-cols-4" });

function Table({
  columns,
  children,
}: {
  columns: string;
  children: React.ReactNode;
}) {
  return (
    <TableContext.Provider value={{ columns }}>
      <div
        className="border border-gray-300 text-md bg-gray-50 rounded-4xl overflow-hidden"
        role="table"
      >
        {children}
      </div>
    </TableContext.Provider>
  );
}

function Header({ children }: { children: React.ReactNode }) {
  const { columns } = useContext(TableContext);
  return (
    <div
      role="row"
      className={`grid gap-x-10 items-center py-4 px-6 bg-grey-50 border-b border-gray-100 uppercase font-semibold text-gray-600 :last-border-b-0 ${columns}`}
    >
      {children}
    </div>
  );
}

function Row({ children }: { children: React.ReactNode }) {
  const { columns } = useContext(TableContext);
  return (
    <div
      role="row"
      className={`grid gap-x-10 items-center py-4 px-6 bg-gray-100 odd:bg-gray-50 ${columns}`}
    >
      {children}
    </div>
  );
}

function Body<T>({
  render,
  data,
}: {
  render: (item: T) => React.ReactNode;
  data: T[];
}) {
  if (!data.length)
    return (
      <p className="text-xl font-medium text-center m-10">
        No data to show at the moment
      </p>
    );

  return <section className="">{data.map(render)}</section>;
}

function Footer({ children }: { children: React.ReactNode }) {
  return (
    <footer className="border border-gray-100 flex justify-center py-6 px-10 font-semibold">
      {children}
    </footer>
  );
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
