"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSignOutAlt } from "@fortawesome/free-solid-svg-icons";
import IconProps from "./icon.interface";

export default function LogoutIcon({ className }: IconProps) {
  return <FontAwesomeIcon icon={faSignOutAlt} className={`${className}`} />;
}
