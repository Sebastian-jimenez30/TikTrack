"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faExclamationTriangle } from "@fortawesome/free-solid-svg-icons";
import IconProps from "./icon.interface";

export default function ErrorIcon({ className }: IconProps) {
  return <FontAwesomeIcon icon={faExclamationTriangle} className={className} />;
}
