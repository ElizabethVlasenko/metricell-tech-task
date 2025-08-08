export default function Heading({ children }: { children: React.ReactNode }) {
  return <h3 className="text-2xl leading-none text-gray-600">{children}</h3>;
}
