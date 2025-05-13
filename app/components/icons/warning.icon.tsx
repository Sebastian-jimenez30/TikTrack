"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import IconProps from "./icon.interface";

export default function WarningIcon({ className }: IconProps) {
return <FontAwesomeIcon icon={faTriangleExclamation} className={className} />;
}