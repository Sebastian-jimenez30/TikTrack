"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFloppyDisk } from "@fortawesome/free-solid-svg-icons";
import IconProps from "./icon.interface";

export default function DiskIcon({ className }: IconProps) {
  return <FontAwesomeIcon icon={faFloppyDisk} className={`${className}`} />;
}
