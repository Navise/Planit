import DateTime from "./DateTime";
import { FaCalendarAlt } from 'react-icons/fa';

function Nav({ selectedDate, setShowCalendar }) {
  return (
    <div className="w-full bg-black flex justify-between items-center px-6 py-2">
      <h1 className="text-white font-bold text-2xl">Plannit</h1>

      <DateTime />

      <div 
        className="text-white flex items-center space-x-4 cursor-pointer"
        onClick={() => setShowCalendar(true)}
      >
        <FaCalendarAlt className="text-xl" />
      </div>
    </div>
  );
}

export default Nav;
