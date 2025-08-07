import { BookA } from "lucide-react";

type LogoPropsType = {
  size?: "small" | "medium" | "large";
};

export default function Logo({ size = "medium" }: LogoPropsType) {
  let wrapperClasses = "flex items-center text-gray-600 font-semibold w-fit ";
  let iconClasses = "";

  switch (size) {
    case "small":
      wrapperClasses += "gap-2 text-sm";
      iconClasses += "h-5";
      break;
    case "medium":
      wrapperClasses += "gap-2 text ";
      iconClasses += "h-8";
      break;
    case "large":
      wrapperClasses += "gap-1 text flex-col text-xl";
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
