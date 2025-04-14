import React from "react";
import { JSX } from "react";

interface InlineCardProps {
    icon: React.ReactNode;
    description: string;
}

export default function InlineCard({icon,description}: InlineCardProps): JSX.Element {
    return (
        <div className="w-full flex items-center">
            {icon} 
            <p className="text-sm sm:text-base md:text-lg lg:text-xl block text-slate-600 leading-normal font-light">{description}</p>
        </div>
    )
}