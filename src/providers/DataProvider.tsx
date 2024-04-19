import React, {
  Dispatch,
  SetStateAction,
  useCallback,
  useRef,
  useState,
} from "react";
import { useReactFlow } from "reactflow";

export const DataContext = React.createContext<ProviderValues | null>(null);
let id = 0;
const getId = () => `${id++}`;

function DataProvider({ children }: { children: React.ReactNode }) {
  const [textInput, setTextInput] = useState<string>("");
  const [menus, setMenus] = useState<Array<string>>([]);
  const yPosition = useRef(50);
  const { deleteElements, setNodes, getNode, addNodes } = useReactFlow();

  const reset = useCallback(() => {
    id = 0;
    yPosition.current = 50;
  }, []);

  const deleteNode = useCallback(
    (nodeId: string) => {
      deleteElements({ nodes: [{ id: nodeId }] });
    },
    [deleteElements]
  );

  const duplicateNode = useCallback(
    (nodeId: string) => {
      const nodeToDubplicate = getNode(nodeId);
      if (!nodeToDubplicate?.id) return;
      addNodes({
        id: getId(),
        type: "customType",
        position: {
          x: nodeToDubplicate.position.x + 200,
          y: nodeToDubplicate.position.y,
        },
        data: {
          ...nodeToDubplicate.data,
          label: nodeToDubplicate.data.label + " copy",
        },
      });
    },

    // eslint-disable-next-line react-hooks/exhaustive-deps
    [addNodes]
  );

  const addNode = useCallback((label: string) => {
    yPosition.current += 100;
    setNodes((els) => {
      return [
        ...els,
        {
          id: getId(),
          type: "customType",
          position: { x: 100, y: yPosition.current },
          data: {
            label: label || "Untitled",
            onDuplicate: duplicateNode,
            onDelete: deleteNode,
            onUpdate: updateNode,
          },
        },
      ];
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const updateNode = useCallback(
    (nodeId: string, label: string) => {
      setNodes((nodes) =>
        nodes.map((node) => {
          if (node.id === nodeId) {
            return { ...node, data: { ...node.data, label: label } };
          }
          return node;
        })
      );
    },
    [setNodes]
  );

  const propsToPass: ProviderValues = {
    textInput,
    setTextInput,
    menus,
    setMenus,
    getId,
    yPosition,
    reset,
    addNode,
    deleteNode,
    duplicateNode,
    updateNode,
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
  deleteNode: (nodeId: string) => void;
  duplicateNode: (nodeId: string) => void;
  addNode: (label: string) => void;
  updateNode: (nodeId: string, label: string) => void;
};
