import { useEffect, useState } from "react";
import { storage, tabs } from "webextension-polyfill";
import { Header } from "../Header";
import { ExperienceForm } from "../ExperienceForm";

export const Home = () => {
  const [value, setValue] = useState();

  useEffect(() => {
    const readBackgroundMessage = async () => {
      const tab = (await tabs.query({ active: true, currentWindow: true }))[0];
      const tabId = tab.id;

      if (tabId) {
        const data = await storage.local.get(tabId.toString());
        const currentValue = data?.[tabId] ?? 0;

        setValue(currentValue);
      }
    };

    readBackgroundMessage();
  }, []);

  return (
    <div>
      <Header />
      <ExperienceForm />
    </div>
  );
};
