import { useRouter } from "next/router";

const Index = () => {
  const router = useRouter();
  const {
    locales,
    locale: activeLocale,
    defaultLocale,
    isLocaleDomain,
    domainLocales,
  } = router;
  console.log("locales ===> ", locales);
  console.log("defaultLocale ===> ", defaultLocale);
  console.log("activeLocale ===> ", activeLocale);

  return (
    <div>
      <h1>Home page</h1>
    </div>
  );
};

export default Index;
