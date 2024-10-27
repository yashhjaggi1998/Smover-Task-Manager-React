"use client";

import { useState, useEffect } from "react";
import { Task } from "../../src/typings";
import { 
  TaskItem, 
  TaskForm
} from "../../src/app/components";

const Home: React.FC = () => {
  const [tasks, setTasks] = useState<Task.Task[]>([]);
  const [refetchTasks, setRefetchTasks] = useState<boolean>(false);
  const [showTaskForm, setShowTaskForm] = useState<boolean>(false);

  const [currentTask, setCurrentTask] = useState<Task.Task | null>(null);

  async function handleDelete(id: number) {
    const result = await fetch(`/api/tasks?id=${id}`, {
      method: 'DELETE',
    });
    if (!result.ok)
      return alert('Failed to delete task');

    setRefetchTasks(!refetchTasks);
  }

  async function handleEdit(task: Task.Task | null) {
    setCurrentTask(task);
    setShowTaskForm(true);
  }

  async function handleSubmit(task: Task.Task) {
    if (task.id !== 0) {
      const result = await fetch(`/api/tasks?id=${task.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      if (!result.ok)
        return alert('Failed to update task');
    }
    else {
      const result = await fetch('/api/tasks', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(task),
      });
      if (!result.ok)
        return alert('Failed to create task');
    }
    setRefetchTasks(!refetchTasks);
    setShowTaskForm(false);
  }

  useEffect(() => {
    async function fetchTasks() {
      const res = await fetch('/api/tasks');
      const tasks = await res.json();
      setTasks(tasks);
    }

    fetchTasks();
  }, [refetchTasks]);

  return (
    <div className="container mx-auto w-2/4 p-8">
      {showTaskForm ? (
        <div>
          <TaskForm.TaskForm currentTask={currentTask} setCurrentTask={setCurrentTask} handleSubmit={handleSubmit}/>
          <button 
            className="bg-red-800 text-white rounded px-3 py-2 mt-4"
            onClick={() => setShowTaskForm(false)}
          >
            Cancel
          </button>
        </div>
      ) : (
        <div>
          <h1 className="text-4xl font-bold text-slate-800">Tasks</h1>
          <button 
            className="bg-blue-800 text-white rounded px-3 py-2 mt-4"
            onClick={() => {handleEdit(null)}}
          >
            + Add Task
          </button>

          {tasks.map(task => (
            <TaskItem.TaskItem
              key={task.id} 
              task={task} 
              handleEdit={() => handleEdit(task)}
              handleDelete={handleDelete}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default Home;
