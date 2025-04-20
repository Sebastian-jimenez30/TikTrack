"use client";
import { useTranslations } from "next-intl";
import { useState, ChangeEvent, useEffect } from "react";
import { toast } from "sonner";
import ROUTES_API from "~/constants/urls/api.urls";

interface TextboxWithServiceProps {
  selectedMessageContent?: string;
  username?: string;
}

export default function TextboxWithService({ selectedMessageContent, username }: TextboxWithServiceProps) {
  const t = useTranslations("TextboxAI");

  const [textBoxValue, setTextBoxValue] = useState<string>("");
  const [originalTextBoxValue, setOriginalTextBoxValue] = useState<string>("");
  const [serviceText, setServiceText] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [showConfirmation, setShowConfirmation] = useState<boolean>(false);

  useEffect(() => {
    if (selectedMessageContent) {
      setTextBoxValue(selectedMessageContent);
    }
  }, [selectedMessageContent]);

  const handleTextBoxChange = (e: ChangeEvent<HTMLTextAreaElement>) => {
    setTextBoxValue(e.target.value);
  };

  const handleClick = async () => {
    if (isLoading) return;
    if (!textBoxValue) {
      toast.error(t("error.inputEmpty"));
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
        toast.error(data.error);
        setIsLoading(false);
        return;
      }

      const result: string = data;

      setOriginalTextBoxValue(textBoxValue);
      setServiceText(result);

      setTextBoxValue(result);

      setShowConfirmation(true);
      setIsLoading(false);
      toast.success(t("success"));
    } catch {
      toast.error(t("error.general"));
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

  const handleSendMessage = async () => {
    if (!username || !textBoxValue) {
      toast.error("No username or message provided");
      return;
    }
    try {
      const response = await fetch(ROUTES_API.MESSAGE_SEND(username), {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          message: textBoxValue
        })
      });
      
      if (response.status !== 200) {
        toast.error("Failed to send message");
      } else {
        toast.success("Message sent successfully");
      }
  
    } catch (error) {
      toast.error("Failed to send message");
    }
  };
 

  return (
    <div>
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
            {username && textBoxValue && (
              <button
                onClick={handleSendMessage}
                className="mt-4 bg-purple font-bold text-white px-4 py-2 rounded"
              >
                Send Message
              </button>
            )}
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