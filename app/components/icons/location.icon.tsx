"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMapPin } from "@fortawesome/free-solid-svg-icons";
import IconProps from "./icon.interface";

export default function MapPinIcon({ className }: IconProps) {
  return <FontAwesomeIcon icon={faMapPin} className={`${className}`} />;
}
