import TextArea from "./left/TextArea";
import TextView from "./left/TextView";

function Left() {
  return (
    <div className='flex w-full md:w-1/3 justify-start flex-col xl:flex-col lg:items-start'>
      <TextArea />
      <TextView />
    </div>
  );
}

export default Left;
