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
        className="border border-gray-300 md:text-md bg-gray-50 md:rounded-4xl rounded-2xl overflow-hidden"
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
      className={`grid gap-x-5 items-center py-2 px-4 bg-grey-50 border-b border-gray-100 uppercase font-semibold text-gray-600 :last-border-b-0 md:py-4 md:px-6 md:gap-x-10 ${columns}`}
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
      className={`grid gap-x-5 items-center py-2 px-4 bg-gray-100 odd:bg-gray-50 md:py-4 md:x-6 md:gap-x-10 ${columns}`}
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
      <p className="text-lg font-semibold text-center md:m-10 m-5 leading-none text-gray-600">
        No data to show at the moment
      </p>
    );

  return <section className="">{data.map(render)}</section>;
}

function Footer({ children }: { children: React.ReactNode }) {
  return (
    <footer className="border border-gray-100 flex justify-center py-2 px-4 font-semibold md:py-6 md:px-10">
      {children}
    </footer>
  );
}

Table.Header = Header;
Table.Row = Row;
Table.Body = Body;
Table.Footer = Footer;

export default Table;
