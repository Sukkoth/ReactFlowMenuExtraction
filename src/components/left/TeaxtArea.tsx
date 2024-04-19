import { useContext, useState } from "react";
import { DataContext } from "../../providers/DataProvider";

function TextArea() {
  const data = useContext(DataContext);

  const [textInput, setTextInput] = useState<string>("");

  return (
    <div>
      <textarea
        onChange={(e) => {
          setTextInput(e.target.value);
        }}
        value={textInput}
        className='border bg-transparent  border-orange-400 rounded-3xl p-5 outline-none focus:border-orange-700'
        name=''
        id=''
        cols={40}
        rows={15}
        placeholder='Paste/type your menu items here'
      ></textarea>
      <div className='flex items-center justify-center p-5 gap-x-5'>
        <button
          onClick={() => {
            data?.reset();
            data?.setTextInput(textInput);
          }}
          disabled={textInput.length == 0}
          className={`rounded-xl text-white font-medium  bg-orange-400 py-3 px-6 hover:bg-orange-500 hover:ring-2 hover:ring-orange-500 hover:ring-offset-2 ${
            textInput.length == 0 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          Extract
        </button>
        {data !== null && data?.menus?.length > 0 && (
          <button
            onClick={() => {
              data?.setMenus([]);
              data?.setTextInput("");
              setTextInput("");
              data.reset();
            }}
            className='rounded-xl text-white font-medium  bg-blue-200 py-3 px-6 hover:bg-blue-300 hover:ring-1 hover:ring-blue-300 hover:ring-offset-2'
          >
            Clear
          </button>
        )}
      </div>
    </div>
  );
}

export default TextArea;
