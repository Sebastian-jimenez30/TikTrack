"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEye } from "@fortawesome/free-solid-svg-icons";
import IconProps from "./icon.interface";

export default function EyeIcon({ className }: IconProps) {
  return <FontAwesomeIcon icon={faEye} className={`${className}`} />;
}
