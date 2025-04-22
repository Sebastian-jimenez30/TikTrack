"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faLock } from "@fortawesome/free-solid-svg-icons";
import IconProps from "./icon.interface";

export default function LockIcon({ className }: IconProps) {
  return <FontAwesomeIcon icon={faLock} className={className} />;
}