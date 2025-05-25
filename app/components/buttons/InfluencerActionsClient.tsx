"use client";
import RemoveFromFavoritesButton from "./RemoveFromFavoritesButton";
import { Pathname } from "~/i18n/routing";

interface Props {
  influencerId: string;
  messages: {
    success: string;
    error: string;
    removing: string;
    remove: string;
  };
  variant: "primary" | "secondary" | "danger";
  redirect: Pathname;
  actionUrl: string;
}

export default function InfluencerActionsClient(props: Props) {
  const handleSuccess = () => {
    // Aquí puedes actualizar el estado, recargar la página, etc.
    window.location.reload();
  };

  return (
    <RemoveFromFavoritesButton
      {...props}
      onSuccess={handleSuccess}
    />
  );
}