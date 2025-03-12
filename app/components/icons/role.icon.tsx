"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserShield } from "@fortawesome/free-solid-svg-icons";
import IconProps from "./icon.interface";

export default function RoleIcon({ className }: IconProps) {
  return <FontAwesomeIcon icon={faUserShield} className={className} />;
}
