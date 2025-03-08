import React from "react";
import { JSX } from "react";

interface MetricCardProps {
  icon: React.ReactNode;
  title: string;
  value: string;
}

export default function MetricCard({
  icon,
  title,
  value,
}: MetricCardProps): JSX.Element {
  return (
    <div className="flex flex-1 gap-3 rounded-lg border border-gray bg-white p-4 flex-col">
      <div className="text-black" data-size="24px" data-weight="regular">
        {icon}
      </div>
      <div className="flex flex-col gap-1">
        <h2 className="text-black text-base font-bold leading-tight">
          {title}
        </h2>
        <p className="text-darkGrey text-sm font-normal leading-normal">
          {value}
        </p>
      </div>
    </div>
  );
}
