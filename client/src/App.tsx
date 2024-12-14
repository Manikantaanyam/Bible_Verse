import { BibleVerse } from "./components/BibleVerse";
import Navbar from "./components/Navbar";

function App() {
  return (
    <div className="bg-slate-100 h-full">
      <Navbar />
      <BibleVerse />
    </div>
  );
}

export default App;
