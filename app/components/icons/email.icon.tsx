"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faEnvelope } from "@fortawesome/free-solid-svg-icons";
import IconProps from "./icon.interface";

export default function EmailIcon({ className }: IconProps) {
  return <FontAwesomeIcon icon={faEnvelope} className={className} />;
}
