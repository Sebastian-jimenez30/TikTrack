"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import IconProps from "./icon.interface";

export default function UserIcon({ className }: IconProps) {
  return <FontAwesomeIcon icon={faUser} className={className} />;
}
