import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";

export const DataContext = React.createContext<ProviderValues | null>(null);
let id = 0;
const getId = () => `${id++}`;

function DataProvider({ children }: { children: React.ReactNode }) {
  const [textInput, setTextInput] = useState<string>("");
  const [menus, setMenus] = useState<Array<string>>([]);
  const yPosition = useRef(50);

  const reset = useCallback(() => {
    id = 0;
    yPosition.current = 50;
  }, []);

  const propsToPass: ProviderValues = {
    textInput,
    setTextInput,
    menus,
    setMenus,
    getId,
    yPosition,
    reset,
  };
  return (
    <DataContext.Provider value={propsToPass}>{children}</DataContext.Provider>
  );
}

export default DataProvider;

type ProviderValues = {
  textInput: string;
  setTextInput: Dispatch<SetStateAction<string>>;
  menus: Array<string>;
  setMenus: Dispatch<SetStateAction<Array<string>>>;
  getId: () => string;
  yPosition: React.MutableRefObject<number>;
  reset: () => void;
};
