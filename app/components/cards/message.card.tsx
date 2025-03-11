import { JSX } from "react";
import { useTranslations } from "next-intl";
import Image from "next/image";
import Button from "~/app/components/button";

import { Link } from "~/i18n/routing";
import MapPinIcon from "~/app/components/icons/location.icon";
import ROUTES from "~/constants/urls";

interface MessageCardProps {
  content: string;
}

export default function MessageCard({
  content,
}: MessageCardProps): JSX.Element {
  const t = useTranslations("Cards");
  return (
    <div className="max-w-sm p-6 bg-white border border-gray-200 rounded-lg shadow-sm mx-5">
      <p className="mb-3 font-normal text-gray-700 dark:text-gray-400"> {content} </p>
      <Button variant="secondary" href="">Customize</Button>
        <Button variant="primary" href="">
          Edit
        </Button>
    </div>
  );
}
