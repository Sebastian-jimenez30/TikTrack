"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlay } from "@fortawesome/free-solid-svg-icons";
import IconProps from "./icon.interface";

export default function PlayIcon({ className }: IconProps) {
  return <FontAwesomeIcon icon={faPlay} className={`${className}`} />;
}
