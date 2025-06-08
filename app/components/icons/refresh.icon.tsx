"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faRefresh } from "@fortawesome/free-solid-svg-icons";
import IconProps from "./icon.interface";

export default function RefreshIcon({ className }: IconProps) {
  return <FontAwesomeIcon icon={faRefresh} className={`${className}`} />;
}
