import React, { useState } from 'react';
import { Draggable, Droppable } from 'react-beautiful-dnd';
import TaskCard from './TaskCard';

const Column = ({ column, index, updateColumn }) => {
    const [taskTitle, setTaskTitle] = useState('');
    const [taskDesc, setTaskDesc] = useState('');
    const [editColTitle, setEditColTitle] = useState(column.title);
    const [isEditingCol, setIsEditingCol] = useState(false);

    const addTask = () => {
        if (!taskTitle.trim()) return;
        const newTask = {
            id: Date.now(),
            title: taskTitle,
            description: taskDesc,
            done: false
        };
        const updated = {
            ...column,
            tasks: [...column.tasks, newTask]
        };
        updateColumn(column.id, updated);
        setTaskTitle('');
        setTaskDesc('');
    };

    const updateTask = (taskId, updates) => {
        const updatedTasks = column.tasks.map(t =>
            t.id === taskId ? { ...t, ...updates } : t
        );
        updateColumn(column.id, { ...column, tasks: updatedTasks });
    };

    const deleteTask = (taskId) => {
        const filtered = column.tasks.filter(t => t.id !== taskId);
        updateColumn(column.id, { ...column, tasks: filtered });
    };

    const saveColumnTitle = () => {
        updateColumn(column.id, { ...column, title: editColTitle });
        setIsEditingCol(false);
    };

    return (
        <Draggable draggableId={String(column.id)} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    className="w-[300px] flex flex-col rounded-xl p-4 bg-[#1f2937] text-white shadow-[inset_4px_4px_10px_#111827,inset_-4px_-4px_10px_#374151] transition-all duration-300"
                >
                    {/* Header */}
                    <div
                        className="flex justify-between items-center mb-4 bg-gradient-to-r from-indigo-500/20 to-purple-500/20 rounded-lg px-3 py-2 backdrop-blur-sm shadow-lg"
                        {...provided.dragHandleProps}
                    >
                        {isEditingCol ? (
                            <>
                                <input
                                    value={editColTitle}
                                    onChange={(e) => setEditColTitle(e.target.value)}
                                    className="px-2 py-1 w-full rounded-md border bg-[#111827] text-white text-sm shadow-inner"
                                />
                                <button
                                    onClick={saveColumnTitle}
                                    className="ml-2 text-xs bg-green-500 text-white px-2 py-1 rounded-md hover:bg-green-600"
                                >
                                    ✔
                                </button>
                            </>
                        ) : (
                            <>
                                <h2 className="font-bold text-sm text-indigo-300">{column.title}</h2>
                                <button
                                    onClick={() => setIsEditingCol(true)}
                                    className="text-sm text-indigo-400 hover:text-indigo-300"
                                >
                                    ✏️
                                </button>
                            </>
                        )}
                    </div>

                    {/* Tasks */}
                    <Droppable droppableId={String(column.id)} type="TASK">
                        {(provided2) => (
                            <div
                                ref={provided2.innerRef}
                                {...provided2.droppableProps}
                                className="flex flex-col gap-3 min-h-[60px] mb-4"
                            >
                                {column.tasks.map((task, i) => (
                                    <TaskCard
                                        key={task.id}
                                        task={task}
                                        index={i}
                                        updateTask={updateTask}
                                        deleteTask={deleteTask}
                                    />
                                ))}
                                {provided2.placeholder}
                            </div>
                        )}
                    </Droppable>

                    {/* Add task */}
                    <input
                        value={taskTitle}
                        onChange={(e) => setTaskTitle(e.target.value)}
                        placeholder="Заголовок"
                        className="mb-1 px-2 py-1 text-sm border rounded-md bg-[#111827] text-white shadow-inner"
                    />
                    <textarea
                        value={taskDesc}
                        onChange={(e) => setTaskDesc(e.target.value)}
                        placeholder="Описание"
                        className="mb-2 px-2 py-1 text-sm border rounded-md resize-none bg-[#111827] text-white shadow-inner"
                        rows={2}
                    />
                    <button
                        onClick={addTask}
                        className="text-sm px-3 py-1 rounded-md bg-indigo-500 text-white hover:bg-indigo-600 transition"
                    >
                        + Добавить задачу
                    </button>
                </div>
            )}
        </Draggable>
    );
};

export default Column;
