"use client";
import { useTranslations } from "next-intl";
import { useState, ChangeEvent } from "react";
import ErrorCard from "~/app/components/cards/error.card";
import ROUTES_API from "~/constants/urls/api.urls";
export default function TextboxWithService() {
  const t = useTranslations("TextboxAI");

  const [textBoxValue, setTextBoxValue] = useState<string>("");
  const [originalTextBoxValue, setOriginalTextBoxValue] = useState<string>("");
  const [serviceText, setServiceText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const handleTextBoxChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextBoxValue(e.target.value);
  };

  const handleClick = async () => {
    if (isLoading) return;
    if (!textBoxValue) {
      setError(t("error.inputEmpty"));
      return;
    }

    setIsLoading(true);
    setShowConfirmation(false);

    try {
      const res = await fetch(ROUTES_API.OPENAI, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          input: textBoxValue,
        }),
      });

      const data = await res.json();

      if (!res.ok || data.error) {
        setError(data.error);
        setIsLoading(false);
        return;
      }

      const result: string = data;

      setOriginalTextBoxValue(textBoxValue);
      setServiceText(result);

      setTextBoxValue(result);

      setShowConfirmation(true);
      setIsLoading(false);
      setError(null);
    } catch {
      setError(t("error.general"));
    } finally {
      setIsLoading(false);
    }
  };

  const handleAccept = () => {
    if (serviceText) {
      setTextBoxValue(serviceText);
    }
    setShowConfirmation(false);
    setServiceText(null);
  };

  const handleDecline = () => {
    setTextBoxValue(originalTextBoxValue);

    setShowConfirmation(false);
    setServiceText(null);
  };

  return (
    <div>
      {error && (
        <div>
          <ErrorCard message={error} />
          <br />
        </div>
      )}
      {!showConfirmation ? (
        <div>
          <textarea
            value={textBoxValue}
            onChange={handleTextBoxChange}
            className="block w-full h-[25vh] p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-lightPurple focus:border-lightPurple resize-none text-sm md:text-xl"
            placeholder={t("placeholder")}
          />
          <div className="w-full flex justify-center flex-col items-center w-[50vw]">
            <button
              onClick={handleClick}
              className="mt-4 bg-black font-bold text-white px-4 py-2 rounded disbaled:opacity-50 disabled:bg-gray-500 disabled:cursor-not-allowed"
              disabled={isLoading}
            >
              {isLoading ? t("loading") : t("enhanced")}
            </button>
          </div>
        </div>
      ) : (
        <div>
          <div className="block w-full h-[25vh] p-2.5 text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 resize-none overflow-y-scroll text-sm md:text-xl">
            <span className="line-through text-gray-400">
              {originalTextBoxValue}
            </span>
            <br />
            <span className="text-black">{serviceText}</span>
          </div>

          <div className="mt-4 w-full h-[50px] flex justify-center">
            <button
              onClick={handleAccept}
              className="bg-purple text-white px-4 py-2 rounded mr-2 font-bold"
            >
              {t("buttonAccept")}
            </button>
            <button
              onClick={handleDecline}
              className="bg-black text-white px-4 py-2 rounded font-bold"
            >
              {t("buttonCancel")}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
