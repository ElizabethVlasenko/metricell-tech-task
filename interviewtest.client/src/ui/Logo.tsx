import { BookA } from "lucide-react";

type LogoPropsType = {
  size?: "small" | "medium" | "large";
};

export default function Logo({ size = "medium" }: LogoPropsType) {
  let wrapperClasses = "flex items-center text-gray-600 w-fit ";
  let iconClasses = "";

  switch (size) {
    case "small":
      wrapperClasses += "gap-2 text-sm font-semibold ";
      iconClasses += "h-5";
      break;
    case "medium":
      wrapperClasses += "gap-2 text-md font-bold ";
      iconClasses += "h-8";
      break;
    case "large":
      wrapperClasses += "gap-1 text flex-col text-xl font-semibold ";
      iconClasses += "h-10";
      break;
  }

  return (
    <div className={wrapperClasses}>
      <BookA className={iconClasses} />
      <span>CrewConnect</span>
    </div>
  );
}
