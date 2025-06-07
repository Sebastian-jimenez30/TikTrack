"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function FilterRedirectHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const filtersChanged = sessionStorage.getItem("filtersChanged");

    if (filtersChanged === "true") {
      sessionStorage.setItem("filtersChanged", "false");

      const newParams = new URLSearchParams(Array.from(searchParams.entries()));
      newParams.set("page", "1");

      router.replace(`?${newParams.toString()}`);
    }
  }, [searchParams, router]);

  return null;
}
