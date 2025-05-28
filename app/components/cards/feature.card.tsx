import React from "react";
import { JSX } from "react";

interface FeatureCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
}

export default function FeatureCard({
  icon,
  title,
  description,
}: FeatureCardProps): JSX.Element {
  return (
    <div className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-96 p-6">
      <div className="flex items-center mb-4">
        {icon}
        <h5 className="ml-3 text-slate-800 text-xl font-semibold">{title}</h5>
      </div>
      <p className="block text-slate-600 leading-normal font-light mb-4">
        {description}
      </p>
    </div>
  );
}
