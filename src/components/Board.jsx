import React, { useState } from 'react';
import Column from './Column';
import { DragDropContext, Droppable } from 'react-beautiful-dnd';

const Board = ({ board, updateBoard }) => {
  const [columnTitle, setColumnTitle] = useState('');

  const handleAddColumn = () => {
    if (!columnTitle.trim()) return;
    const newColumn = {
      id: Date.now(),
      title: columnTitle,
      tasks: [],
    };
    updateBoard({ ...board, columns: [...board.columns, newColumn] });
    setColumnTitle('');
  };

  const updateColumn = (colId, newColData) => {
    const newColumns = board.columns.map(col =>
        col.id === colId ? newColData : col
    );
    updateBoard({ ...board, columns: newColumns });
  };

  const handleDragEnd = (result) => {
    const { source, destination, type } = result;
    if (!destination) return;

    if (type === 'COLUMN') {
      const cols = Array.from(board.columns);
      const [moved] = cols.splice(source.index, 1);
      cols.splice(destination.index, 0, moved);
      updateBoard({ ...board, columns: cols });
    }

    if (type === 'TASK') {
      const cols = [...board.columns];
      const sourceCol = cols.find(c => c.id === +source.droppableId);
      const destCol = cols.find(c => c.id === +destination.droppableId);
      const [movedTask] = sourceCol.tasks.splice(source.index, 1);
      destCol.tasks.splice(destination.index, 0, movedTask);
      updateBoard({ ...board, columns: cols });
    }
  };

  return (
      <div>
        <div className="flex items-center gap-2 mb-4">
          <input
              type="text"
              placeholder="Новая колонка"
              value={columnTitle}
              onChange={(e) => setColumnTitle(e.target.value)}
              className="px-2 py-1 border rounded text-black"
          />
          <button
              onClick={handleAddColumn}
              className="bg-indigo-500 text-white px-3 py-1 rounded hover:bg-indigo-600"
          >
            + Добавить колонку
          </button>
        </div>

        <DragDropContext onDragEnd={handleDragEnd}>
          <Droppable droppableId="board" direction="horizontal" type="COLUMN">
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="flex gap-4 overflow-x-auto pb-4"
                >
                  {board.columns.map((col, index) => (
                      <Column
                          key={col.id}
                          column={col}
                          index={index}
                          updateColumn={updateColumn}
                      />
                  ))}
                  {provided.placeholder}
                </div>
            )}
          </Droppable>
        </DragDropContext>
      </div>
  );
};

export default Board;
