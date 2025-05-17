import React from 'react';
import { useParams, Link } from 'react-router-dom';
import Board from '../components/Board';

const BoardPage = ({ boards, setBoards }) => {
    const { id } = useParams();
    const board = boards.find((b) => b.id === +id);

    if (!board) {
        return (
            <div className="p-6 text-center text-white bg-[#111827] min-h-screen">
                <p className="text-xl mb-4">Доска не найдена.</p>
                <Link to="/" className="text-indigo-400 underline hover:text-indigo-300">
                    ← Назад
                </Link>
            </div>
        );
    }

    const updateBoard = (updatedBoard) => {
        setBoards((prevBoards) =>
            prevBoards.map((b) => (b.id === board.id ? updatedBoard : b))
        );
    };

    return (
        <div className="min-h-screen px-6 py-8 bg-[#0f172a] text-white transition-all duration-300">
            <div className="flex justify-between items-center mb-6 px-4 py-3 bg-[#1f2937]/80 backdrop-blur-md rounded-xl shadow-lg border border-gray-700">
                <h1 className="text-xl font-bold text-indigo-300">{board.title}</h1>
                <Link
                    to="/"
                    className="text-sm px-4 py-1 bg-gray-700 text-white rounded-lg hover:bg-gray-600 transition"
                >
                    ← Назад
                </Link>
            </div>

            <div className="p-4 rounded-xl bg-[#1f2937] shadow-[inset_4px_4px_12px_#0f172a,inset_-4px_-4px_12px_#374151]">
                <Board board={board} updateBoard={updateBoard} />
            </div>
        </div>
    );
};

export default BoardPage;
