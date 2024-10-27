export enum Status {
    Pending = 'Pending',
    InProgress = 'In Progress',
    Completed = 'Completed',
}

export interface Task {
    id: number;
    title: string;
    description: string;
    status: Status;
}