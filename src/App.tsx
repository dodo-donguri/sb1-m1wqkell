import React, { useState } from 'react'
import { Plus, Trash2, CheckCircle } from 'lucide-react'

interface Task {
  id: number
  text: string
  completed: boolean
}

function App() {
  const [tasks, setTasks] = useState<Task[]>([])
  const [newTask, setNewTask] = useState('')

  const addTask = () => {
    if (newTask.trim() !== '') {
      setTasks([...tasks, { id: Date.now(), text: newTask, completed: false }])
      setNewTask('')
    }
  }

  const toggleTask = (id: number) => {
    setTasks(tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    ))
  }

  const deleteTask = (id: number) => {
    setTasks(tasks.filter(task => task.id !== id))
  }

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h1 className="text-2xl font-bold mb-4 text-center">タスク管理ツール</h1>
        <div className="flex mb-4">
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            className="flex-grow p-2 border rounded-l-md focus:outline-none focus:ring-2 focus:ring-blue-300"
            placeholder="新しいタスクを入力..."
          />
          <button
            onClick={addTask}
            className="bg-blue-500 text-white p-2 rounded-r-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-300"
          >
            <Plus size={24} />
          </button>
        </div>
        <ul>
          {tasks.map(task => (
            <li key={task.id} className="flex items-center justify-between bg-gray-50 p-3 rounded-md mb-2">
              <span
                className={`flex-grow cursor-pointer ${task.completed ? 'line-through text-gray-500' : ''}`}
                onClick={() => toggleTask(task.id)}
              >
                {task.text}
              </span>
              <div className="flex space-x-2">
                <button
                  onClick={() => toggleTask(task.id)}
                  className={`p-1 rounded-full ${task.completed ? 'text-green-500 hover:text-green-600' : 'text-gray-400 hover:text-gray-500'}`}
                >
                  <CheckCircle size={20} />
                </button>
                <button
                  onClick={() => deleteTask(task.id)}
                  className="text-red-500 p-1 rounded-full hover:text-red-600"
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}

export default App