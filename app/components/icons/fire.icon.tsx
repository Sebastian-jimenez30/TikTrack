"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFire } from "@fortawesome/free-solid-svg-icons";
import IconProps from "./icon.interface";

export default function FireIcon({ className }: IconProps) {
  return <FontAwesomeIcon icon={faFire} className={`${className}`} />;
}
