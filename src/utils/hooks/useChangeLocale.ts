import { useRouter } from "next/router";
import { useEffect } from "react";

const useChangeLocale = () => {
  const router = useRouter();
  const { replace, locale: activeLocale } = router;

  const changeLocale = (localeCode: string) => {
    // replace()
    console.log("localeCode ====> ", localeCode);
  };

  useEffect(() => {
    console.log("activeLocale");
  }, [activeLocale]);

  return changeLocale;
};

export default useChangeLocale;
