import React, { useState } from 'react';
import { Droppable, Draggable } from '@hello-pangea/dnd';

const Board = ({ board, onDelete, onUpdate }) => {
  const [columnTitle, setColumnTitle] = useState('');
  const [taskInputs, setTaskInputs] = useState({});

  const addColumn = () => {
    if (!columnTitle.trim()) return;
    const newColumn = {
      id: Date.now(),
      title: columnTitle,
      tasks: []
    };
    onUpdate(board.id, [...board.columns, newColumn]);
    setColumnTitle('');
  };

  const addTask = (columnId) => {
    const taskText = taskInputs[columnId]?.trim();
    if (!taskText) return;
    const updatedColumns = board.columns.map(col => {
      if (col.id === columnId) {
        return {
          ...col,
          tasks: [...col.tasks, { id: Date.now(), text: taskText }]
        };
      }
      return col;
    });
    onUpdate(board.id, updatedColumns);
    setTaskInputs({ ...taskInputs, [columnId]: '' });
  };

  const deleteTask = (columnId, taskId) => {
    const updatedColumns = board.columns.map(col => {
      if (col.id === columnId) {
        return {
          ...col,
          tasks: col.tasks.filter(task => task.id !== taskId)
        };
      }
      return col;
    });
    onUpdate(board.id, updatedColumns);
  };

  return (
    <div
      className="rounded-xl shadow-lg p-4 min-w-[320px] max-w-full"
      style={{ backgroundColor: board.color }}
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-bold">{board.title}</h2>
        <button onClick={onDelete} className="bg-red-500 text-white px-2 py-1 rounded hover:bg-red-600">
          Удалить
        </button>
      </div>

      <div className="flex gap-2 mb-4">
        <input
          type="text"
          placeholder="Новая колонка"
          className="flex-1 px-2 py-1 rounded border"
          value={columnTitle}
          onChange={(e) => setColumnTitle(e.target.value)}
        />
        <button
          onClick={addColumn}
          className="bg-green-600 hover:bg-green-700 text-white px-3 py-2 rounded-md"
        >
          + Добавить колонку
        </button>
      </div>

      <Droppable droppableId={board.id.toString()} direction="horizontal" type="COLUMN">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex gap-4 overflow-x-auto"
          >
            {board.columns.map((column, colIndex) => (
              <Draggable
                key={`${board.id}-${column.id}`}
                draggableId={`${board.id}-${column.id}`}
                index={colIndex}
              >
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                    className="bg-white rounded p-3 shadow min-w-[250px] w-[250px]"
                  >
                    <h3 className="font-medium mb-2">{column.title}</h3>
                    <div className="flex mb-2 gap-2">
                      <input
                        type="text"
                        placeholder="Задача"
                        className="flex-1 px-2 py-1 border rounded"
                        value={taskInputs[column.id] || ''}
                        onChange={(e) => setTaskInputs({ ...taskInputs, [column.id]: e.target.value })}
                      />
                      <button
                        onClick={() => addTask(column.id)}
                        className="bg-indigo-500 text-white px-2 py-1 rounded hover:bg-indigo-600"
                      >
                        +
                      </button>
                    </div>
                    <Droppable droppableId={column.id.toString()} type="TASK">
                      {(provided) => (
                        <ul
                          ref={provided.innerRef}
                          {...provided.droppableProps}
                          className="space-y-1 min-h-[10px]"
                        >
                          {column.tasks.map((task, index) => (
                            <Draggable
                              key={task.id}
                              draggableId={task.id.toString()}
                              index={index}
                            >
                              {(provided) => (
                                <li
                                  ref={provided.innerRef}
                                  {...provided.draggableProps}
                                  {...provided.dragHandleProps}
                                  className="bg-gray-100 px-3 py-1 rounded flex justify-between items-center"
                                >
                                  <span>{task.text}</span>
                                  <button
                                    onClick={() => deleteTask(column.id, task.id)}
                                    className="text-red-600 hover:text-red-800 text-lg font-bold leading-none"
                                  >
                                    ×
                                  </button>
                                </li>
                              )}
                            </Draggable>
                          ))}
                          {provided.placeholder}
                        </ul>
                      )}
                    </Droppable>
                  </div>
                )}
              </Draggable>
            ))}
            {provided.placeholder}
          </div>
        )}
      </Droppable>
    </div>
  );
};

export default Board;
