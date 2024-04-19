import "./app.css";
import Left from "./components/Left";
import Right from "./components/Right";

function App() {
  return (
    <main className='font-main p-5 border border-orange-400 m-3 rounded-3xl min-h-[95dvh]'>
      <nav className='ml-3'>
        <h1 className='text-2xl md:text-3xl font-semibold text-orange-500'>
          ReactFlow Menu Extraction and Visualization 🔖
        </h1>
      </nav>
      <div className='flex flex-col gap-10 md:flex-row gap-x-10 mt-4 '>
        <Left />
        <Right />
      </div>
    </main>
  );
}

export default App;
