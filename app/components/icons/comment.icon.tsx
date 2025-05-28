"use client";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faComment } from "@fortawesome/free-solid-svg-icons";
import IconProps from "./icon.interface";

export default function CommentIcon({ className }: IconProps) {
  return <FontAwesomeIcon icon={faComment} className={`${className}`} />;
}
