import { useContext, useEffect } from "react";
import { DataContext } from "../../providers/DataProvider";

function TextView() {
  const data = useContext(DataContext);
  useEffect(() => {
    const text = data?.textInput || "";
    if (text.length > 0) {
      const regex = /\d+\.\s*(\w+)/g;
      const matches = text.matchAll(regex);
      const extractedItems = [...matches].map((match) => match[1]);
      data?.setMenus(extractedItems);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data?.textInput]);

  const centerItems = data?.menus.length == 0;

  return (
    <div className='w-full '>
      <div className={`${centerItems ? "flex items-center" : ""}`}>
        {data?.menus.length == 0 ? (
          <div className='px-2 py-4 w-full bg-blue-50 border border-blue-200 rounded-lg text-center'>
            <h2>Empty/No valid menu items 🥱</h2>
          </div>
        ) : (
          <>
            <h3 className='mb-3 font-medium'>Extracted Menu Items 🎉</h3>
            <ol>
              <div className='p-3 overflow-y-scroll h-[30vh]'>
                {data?.menus.map((item, index) => (
                  <li className='mb-3' key={index + item}>
                    🔖 {item}
                  </li>
                ))}
              </div>
            </ol>
          </>
        )}
      </div>
    </div>
  );
}

export default TextView;
