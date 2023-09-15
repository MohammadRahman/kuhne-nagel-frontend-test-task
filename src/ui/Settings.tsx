/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useState } from "react";
import { Children } from "../interface/modal";

export type SettingsContextProps = {
  toggleHandler: (value: string) => void;
  activeToggle: { [key: string]: boolean };
};

export const SettingsContext = createContext<SettingsContextProps | undefined>(
  undefined
);

function Settings({ children }: Children) {
    const [activeToggle, setActiveToggle] = useState<SettingsContextProps['activeToggle']>({});

    function toggleHandler(value: string) {
          setActiveToggle((prev: any) => {
            const updatedToggles = { ...prev };
            if (updatedToggles[value]) {
              delete updatedToggles[value];
            } else {
              updatedToggles[value] = true;
            }
            return updatedToggles;
          });
    }
    return (
      <SettingsContext.Provider value={{ activeToggle, toggleHandler }}>
        {children}
      </SettingsContext.Provider>
    );
}
export default Settings;