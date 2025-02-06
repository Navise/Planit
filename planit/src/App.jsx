import { useState } from 'react';
import Nav from './NavBar';
import ToDo from './ToDo';
import CalendarModal from './CalendarModal';

function App() {
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [showCalendar, setShowCalendar] = useState(false); 

  return (
    <div>
      <Nav selectedDate={selectedDate} setShowCalendar={setShowCalendar} />

      <ToDo selectedDate={selectedDate} />

      {showCalendar && (
        <CalendarModal 
          selectedDate={selectedDate} 
          setSelectedDate={setSelectedDate} 
          setShowCalendar={setShowCalendar} 
        />
      )}
    </div>
  );
}

export default App;
