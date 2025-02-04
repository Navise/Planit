import { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaCheckCircle } from 'react-icons/fa';
import { MdDeleteOutline } from 'react-icons/md';
import { TfiSave } from 'react-icons/tfi';
import { RiProgress7Line } from 'react-icons/ri';

export default function ToDo({ selectedDate }) {
  const [task, setTask] = useState('');
  const [list, setList] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [editIndex, setEditIndex] = useState(null);
  const [editText, setEditText] = useState('');

  useEffect(() => {
    axios.get('http://localhost:5000/tasks')
      .then(response => setList(response.data))
      .catch(error => console.error('Error fetching tasks:', error));
  }, []);

  function addTask() {
    if (task.trim()) {
      const newTask = {
        text: task,
        completed: false,
        date: selectedDate.toDateString(),
      };
      axios.post('http://localhost:5000/tasks', newTask)
        .then(response => {
          setList([...list, response.data]);
          setTask('');
        })
        .catch(error => console.error('Error adding task:', error));
    }
  }

  function deleteTask(id) {
    axios.delete(`http://localhost:5000/tasks/${id}`)
      .then(() => setList(list.filter(item => item._id !== id)))
      .catch(error => console.error('Error deleting task:', error));
  }

  function startEditTask(id) {
    setIsEditing(true);
    const taskToEdit = list.find(item => item._id === id);
    setEditText(taskToEdit.text);
    setEditIndex(list.findIndex(item => item._id === id));
  }

  function saveEditTask() {
    const updatedTask = {
      text: editText,
      completed: list[editIndex].completed,
    };
    axios.put(`http://localhost:5000/tasks/${list[editIndex]._id}`, updatedTask)
      .then(response => {
        setList(list.map(item =>
          item._id === list[editIndex]._id ? response.data : item
        ));
        setIsEditing(false);
        setEditIndex(null);
        setEditText('');
      })
      .catch(error => console.error('Error updating task:', error));
  }

  function toggleCompleted(id) {
    const task = list.find(item => item._id === id);
    const updatedTask = { ...task, completed: !task.completed };
    axios.put(`http://localhost:5000/tasks/${id}`, updatedTask)
      .then(response => {
        setList(list.map(item => item._id === id ? response.data : item));
      })
      .catch(error => console.error('Error toggling task:', error));
  }

  const filteredTasks = list
    .filter(item => item.date === selectedDate.toDateString())
    .sort((a, b) => a.completed - b.completed);

  function handleKey(event) {
    if (event.key === 'Enter') {
      if (isEditing) {
        saveEditTask();
      } else if (task.trim()) {
        addTask();
      }
    }
  }

  return (
    <div>
      <div className="flex">
        <input
          className="w-full text-2xl"
          type="text"
          value={task}
          onChange={(e) => setTask(e.target.value)}
          onKeyDown={handleKey}
          placeholder="Enter the task"
        />
        <button
          className="px-5 text-xl text-white bg-slate-900 font-bold"
          onClick={addTask}
        >
          Add
        </button>
      </div>

      <h2 className="text-xl text-white mx-10">
        Tasks for {selectedDate.toDateString()}
      </h2>

      <ol className="list-disc text-center text-2xl text-white ml-7">
        {filteredTasks.map((item, index) => (
          <div className="flex" key={item._id}>
            {isEditing && editIndex === list.findIndex(task => task._id === item._id) ? (
              <input
                type="text"
                className="m-1 font-bold p-1 w-5/6 text-black"
                value={editText}
                onChange={(e) => setEditText(e.target.value)}
                onKeyDown={handleKey}
              />
            ) : (
              <li
                className={`bg-slate-800 m-1 font-bold p-1 w-5/6 ${
                  item.completed ? 'line-through text-gray-500' : ''
                }`}
              >
                {item.text}
              </li>
            )}

            {isEditing && editIndex === list.findIndex(task => task._id === item._id) ? (
              <button
                className="bg-emerald-400 m-1 p-1 font-bold px-5"
                onClick={saveEditTask}
              >
                <TfiSave />
              </button>
            ) : (
              <button
                className="bg-black m-1 p-1 font-bold px-5"
                onClick={() => startEditTask(item._id)}
              >
                <FaEdit />
              </button>
            )}
            <button
              className="bg-red-600 m-1 p-1 font-bold px-5"
              onClick={() => deleteTask(item._id)}
            >
              <MdDeleteOutline />
            </button>
            <button
              className={`m-1 p-1 font-bold px-5 ${
                item.completed ? 'bg-green-600' : 'bg-yellow-400'
              }`}
              onClick={() => toggleCompleted(item._id)}
            >
              {item.completed ? <FaCheckCircle /> : <RiProgress7Line />}
            </button>
          </div>
        ))}
      </ol>
    </div>
  );
}
