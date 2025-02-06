import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './cal.css';

function CalendarModal({ selectedDate, setSelectedDate, setShowCalendar }) {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg">
        <h2 className="text-lg font-bold mb-2">Select a Date</h2>
        
        <Calendar 
          onChange={(date) => {
            setSelectedDate(date); 
            setShowCalendar(false); 
          }} 
          value={selectedDate} 
        />
        
        <button 
          className="mt-4 px-4 py-2 bg-red-500 text-white rounded" 
          onClick={() => setShowCalendar(false)} 
        >
          Close
        </button>
      </div>
    </div>
  );
}

export default CalendarModal;
