"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import IconProps from "./icon.interface";

export default function HeartIcon({ className }: IconProps) {
  return <FontAwesomeIcon icon={faHeart} className={`${className}`} />;
}
