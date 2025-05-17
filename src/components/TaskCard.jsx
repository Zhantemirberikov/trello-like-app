import React, { useState } from 'react';
import { Draggable } from 'react-beautiful-dnd';

const TaskCard = ({ task, index, updateTask, deleteTask }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [title, setTitle] = useState(task?.title || '');
    const [description, setDescription] = useState(task?.description || '');

    if (!task || typeof task !== 'object') return null;

    const handleSave = () => {
        if (!title.trim()) return;
        try {
            updateTask(task.id, {
                title: title.trim(),
                description: description.trim()
            });
            setIsEditing(false);
        } catch (err) {
            console.error('Ошибка при обновлении задачи:', err);
            alert('Произошла ошибка при сохранении задачи.');
        }
    };

    return (
        <Draggable draggableId={String(task.id)} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className={`p-4 rounded-xl transition-all duration-300 bg-[#1f2937]
            hover:scale-[1.015] text-white
            shadow-[inset_2px_2px_5px_#0f172a,inset_-2px_-2px_5px_#374151]
            hover:shadow-[0_0_10px_#6366f1]`}
                >
                    {isEditing ? (
                        <div className="flex flex-col gap-2">
                            <input
                                value={title}
                                onChange={(e) => setTitle(e.target.value)}
                                placeholder="Название задачи"
                                className="border px-2 py-1 rounded-md bg-[#111827] text-white shadow-inner focus:outline-none"
                            />
                            <textarea
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                placeholder="Описание задачи"
                                className="border px-2 py-1 rounded-md resize-none bg-[#111827] text-white shadow-inner focus:outline-none"
                                rows={2}
                            />
                            <div className="flex gap-2">
                                <button
                                    onClick={handleSave}
                                    className="bg-indigo-500 text-white px-3 py-1 rounded-md hover:bg-indigo-600 text-xs"
                                >
                                    Сохранить
                                </button>
                                <button
                                    onClick={() => setIsEditing(false)}
                                    className="text-xs text-gray-300 hover:underline"
                                >
                                    Отмена
                                </button>
                            </div>
                        </div>
                    ) : (
                        <div className="flex justify-between items-start gap-2">
                            <div className="flex gap-2 items-start">
                                <input
                                    type="checkbox"
                                    checked={task.done}
                                    onChange={() =>
                                        updateTask(task.id, { done: !task.done })
                                    }
                                    className="accent-indigo-500 mt-1"
                                />
                                <div>
                                    <p
                                        className={`font-medium ${
                                            task.done ? 'line-through text-gray-500' : ''
                                        }`}
                                    >
                                        {task.title}
                                    </p>
                                    {task.description && (
                                        <p
                                            className={`text-gray-400 text-xs ${
                                                task.done ? 'line-through' : ''
                                            }`}
                                        >
                                            {task.description}
                                        </p>
                                    )}
                                </div>
                            </div>
                            <div className="flex flex-col gap-1 text-xs">
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="text-indigo-400 hover:underline"
                                >
                                    ✏️
                                </button>
                                <button
                                    onClick={() => deleteTask(task.id)}
                                    className="text-red-400 hover:underline"
                                >
                                    🗑
                                </button>
                            </div>
                        </div>
                    )}
                </div>
            )}
        </Draggable>
    );
};

export default TaskCard;