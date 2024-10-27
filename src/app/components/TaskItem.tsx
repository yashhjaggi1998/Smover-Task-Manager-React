import { Task } from "@/typings";

interface TaskItemProps {
    task: Task.Task;
    handleEdit: (task: Task.Task) => void;
    handleDelete: (id: number) => void;
}

export const TaskItem: React.FC<TaskItemProps> = ({
    task,
    handleEdit,
    handleDelete,
}) => {
    return (
        <div key={task.id} className="mt-8">
            <div className="flex items-start justify-between text-slate-700 border rounded-md px-8 py-4">
            <div>
                <h2 className="text-2xl font-bold">{task.title}</h2>
                <p>{task.description}</p>
            </div>
            <div className="ml-auto">
                <button className = {`rounded-lg ${task.status === Task.Status.Pending ? "bg-orange-400" : task.status === Task.Status.InProgress ? "bg-yellow-400" : "bg-green-400"} text-white px-2`} disabled>
                    {task.status}
                </button>
            </div>
            </div>
            <div className="mt-2">
            <button 
                className="bg-slate-200 text-black rounded px-2 ml-2"
                onClick={() => handleEdit(task)}
            >
                Edit
            </button>
            <button 
                className="bg-black text-white rounded px-2 ml-2"
                onClick={() => handleDelete(task.id)}
            >
                Delete
            </button>
            </div>
        </div>
    );
}