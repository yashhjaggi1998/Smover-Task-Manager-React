import { NextApiRequest, NextApiResponse } from "next";
import { 
    Task, 
    Http_SC
} from "../../src/typings";


let tasks_db: Task.Task[] = [
    {
        id: 1,
        title: "Task 1",
        description: "Description 1",
        status: Task.Status.Pending,
    },
    {
        id: 2,
        title: "Task 2",
        description: "Description 2",
        status: Task.Status.InProgress,
    },
    {
        id: 3,
        title: "Task 3",
        description: "Description 3",
        status: Task.Status.Completed,
    },
];

export default function handler(req: NextApiRequest, res: NextApiResponse) {
    if(req.method === 'GET') {
        return res.status(Http_SC.HTTP_STATUS_CODES.OK).json(tasks_db);
    }
    else if(req.method === 'POST') {
        let { title, description } = req.body;

        if(!title) 
            return res.status(Http_SC.HTTP_STATUS_CODES.BAD_REQUEST).json({ message: 'Title is required' });

        const newTask: Task.Task = {
            id: tasks_db.length + 1,
            title,
            description,
            status: Task.Status.Pending,
        };
        tasks_db.push(newTask);
        return res.status(Http_SC.HTTP_STATUS_CODES.CREATED).json(newTask);
    }
    else if(req.method === 'PUT') {
        let { id, title, description, status } = req.body;

        if(!id)
            return res.status(Http_SC.HTTP_STATUS_CODES.BAD_REQUEST).json({ message: 'Id is required' });

        let task = tasks_db.find(task => task.id === id);
        if(!task)
            return res.status(Http_SC.HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'Task not found' });

        tasks_db = tasks_db.map(task => {
            if(task.id === id) {
                return {
                    id,
                    title: title || task.title,
                    description: description || task.description,
                    status: status || task.status,
                };
            }
            return task;
        });

        return res.status(Http_SC.HTTP_STATUS_CODES.OK).json(task);
    }
    else if (req.method === 'DELETE') {
        let id = Number(req.query.id);

        if(!id)
            return res.status(Http_SC.HTTP_STATUS_CODES.BAD_REQUEST).json({ message: 'Id is required' });

        let task = tasks_db.find(task => task.id === id);
        if(!task)
            return res.status(Http_SC.HTTP_STATUS_CODES.NOT_FOUND).json({ message: 'Task not found' });

        tasks_db = tasks_db.filter(task => task.id !== id);

        return res.status(Http_SC.HTTP_STATUS_CODES.OK).json({ message: 'Task deleted' });
    }
}