"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShare } from "@fortawesome/free-solid-svg-icons";
import IconProps from "./icon.interface";

export default function ShareIcon({ className }: IconProps) {
  return <FontAwesomeIcon icon={faShare} className={`${className}`} />;
}
