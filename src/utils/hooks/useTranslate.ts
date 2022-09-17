import { useRouter } from "next/router";
import { useEffect } from "react";
import * as locales from "@/locales/index";

const useTranslation = () => {
  const { locale: activeLocale, defaultLocale } = useRouter();

  const translate = (key: string): string => {
    if (activeLocale && defaultLocale) {
      return locales[activeLocale || defaultLocale][key];
    }
    return "";
  };

  console.log("translate");
  useEffect(() => {
    console.log("activeLocale");
  }, [activeLocale]);

  return translate;
};

export default useTranslation;
