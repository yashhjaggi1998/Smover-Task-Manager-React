import { Task } from "@/typings";

interface TaskFormProps {
    currentTask: Task.Task | null;
    setCurrentTask: (task: Task.Task | null) => void;
    handleSubmit: (task: Task.Task) => void;
}

export const TaskForm: React.FC<TaskFormProps> = ({currentTask, setCurrentTask, handleSubmit}) => {
    return (
        <div>
            <h1 className="text-4xl font-bold text-slate-800">Add Task</h1>
            <div className="flex flex-col">
                <label htmlFor="title" className="text-slate-800">Title</label>
                <input 
                    type="text" 
                    id="title" 
                    className="border rounded-md px-3 py-2 mt-2"
                    defaultValue={currentTask?.title}
                    onChange={(e) => setCurrentTask({ ...currentTask, title: e.target.value, id: currentTask?.id || 0, description: currentTask?.description || "", status: currentTask?.status || Task.Status.Pending })}
                />
            </div>
            <div className="flex flex-col mt-4">
                <label htmlFor="description" className="text-slate-800">Description</label>
                <textarea 
                    id="description" 
                    className="border rounded-md px-3 py-2 mt-2" 
                    defaultValue={currentTask?.description}
                    onChange={(e) => setCurrentTask({ ...currentTask, description: e.target.value, id: currentTask?.id || 0, title: currentTask?.title || "", status: currentTask?.status || Task.Status.Pending })}
                />
            </div>
            {currentTask?.id ? (
                <div className="flex flex-col mt-4">
                    <label htmlFor="status" className="text-slate-800">Status</label>
                    <select
                        id="status"
                        className="border rounded-md px-3 py-2 mt-2"
                        defaultValue={currentTask?.status}
                        onChange={(e) => setCurrentTask({ ...currentTask, status: e.target.value as Task.Status, id: currentTask?.id || 0, title: currentTask?.title || "", description: currentTask?.description || "" })}
                    >
                        <option value={Task.Status.Pending}>Pending</option>
                        <option value={Task.Status.InProgress}>In Progress</option>
                        <option value={Task.Status.Completed}>Completed</option>
                    </select>
                </div>
            ) : null}
            <button 
                className="bg-blue-800 text-white rounded px-3 py-2 mt-4"
                onClick={() => handleSubmit(currentTask as Task.Task)}
            >
                Submit
            </button>
        </div>
    );
}