import { clsx } from "clsx";

interface ProgressBarProps {
  progress: number;
  element: string;
}

const ProgressBar = ({ progress = 0, element }: ProgressBarProps) => {
  const colorClassMap: { [key: string]: string } = {
    fire: "bg-red-500",
    ice: "bg-blue-500",
    electric: "bg-yellow-500",
    wind: "bg-green-500",
    light: "bg-amber-500",
    dark: "bg-purple-500",
    almighty: "bg-gray-500",
    slash: "bg-orange-500",
    strike: "bg-orange-500",
    pierce: "bg-orange-500",
    support: "bg-green-500",
    special: "bg-green-500",
    recovery: "bg-green-500",
    passive: "bg-purple-200",
    ailment: "bg-red-500",
  };

  return (
    <div>
        <div className="mb-2 flex items-center justify-between text-xs">
            <div className="text-gray-600">{element}</div>
            <div className="text-gray-600">100%</div>
        </div>
        <div className="mb-4 flex h-2 overflow-hidden rounded text-xs bg-gray-100">
            <div
            style={{ width: `${progress}%` }}
            className={clsx(colorClassMap[element])}
            ></div>
        </div>
    </div>
  );
};

export default ProgressBar;
