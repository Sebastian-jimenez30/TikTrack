"use client";

import { useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";

export default function SearchBarRedirectHandler() {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const filtersChanged = sessionStorage.getItem("searchBarChanged");

    if (filtersChanged === "true") {
      sessionStorage.setItem("searchBarChanged", "false");

      const newParams = new URLSearchParams(Array.from(searchParams.entries()));
      newParams.set("page", "1");

      router.replace(`?${newParams.toString()}`);
    }
  }, [searchParams, router]);

  return null;
}
