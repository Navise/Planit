import { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import './cal.css';
import ToDo from './ToDo';

function Cal() {
  const [date, setDate] = useState(new Date());

  return (
    <div className='w-full flex'>
      <div className='text-xl font-bold w-1/3 flex'>
        <Calendar onChange={setDate} value={date} />
      </div>
      <div className='w-2/3'>
        <ToDo selectedDate={date} />
      </div>
    </div>
  );
}

export default Cal;
