import TextArea from "./left/TeaxtArea";
import TextView from "./left/TextView";

function Left() {
  return (
    <div>
      <div className='flex flex-col items-center'>
        <TextArea />
        <TextView />
      </div>
    </div>
  );
}

export default Left;
