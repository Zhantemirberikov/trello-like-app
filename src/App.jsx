import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import BoardPage from './pages/BoardPage';
import Login from './components/Login';

const getRandomColor = () => {
  const colors = ['#6366f1', '#06b6d4', '#f472b6', '#facc15', '#10b981'];
  return colors[Math.floor(Math.random() * colors.length)];
};

const App = () => {
  const [boards, setBoards] = useState([]);
  const [boardTitle, setBoardTitle] = useState('');
  const [user, setUser] = useState('');

  // Загрузка пользователя и досок
  useEffect(() => {
    const storedUser = localStorage.getItem('username');
    if (storedUser) {
      setUser(storedUser);
      const savedBoards = localStorage.getItem(`boards_${storedUser}`);
      if (savedBoards) {
        setBoards(JSON.parse(savedBoards));
      }
    }
  }, []);

  // Сохраняем доски при изменении
  useEffect(() => {
    if (user) {
      localStorage.setItem(`boards_${user}`, JSON.stringify(boards));
    }
  }, [boards, user]);

  const handleLogin = (name) => {
    setUser(name);
    const userBoards = localStorage.getItem(`boards_${name}`);
    setBoards(userBoards ? JSON.parse(userBoards) : []);
  };

  const logout = () => {
    localStorage.removeItem('username');
    localStorage.removeItem(`boards_${user}`);
    setBoards([]);
    setUser('');
  };

  const addBoard = () => {
    if (!boardTitle.trim()) return;
    const newBoard = {
      id: Date.now(),
      title: boardTitle,
      color: getRandomColor(),
      columns: [],
      isEditing: false,
    };
    setBoards([...boards, newBoard]);
    setBoardTitle('');
  };

  const deleteBoard = (id) => setBoards(boards.filter((b) => b.id !== id));
  const updateBoardTitle = (id, newTitle) => {
    setBoards(boards.map((b) => (b.id === id ? { ...b, title: newTitle } : b)));
  };
  const toggleEditing = (id) => {
    setBoards(boards.map((b) => (b.id === id ? { ...b, isEditing: !b.isEditing } : b)));
  };

  if (!user) return <Login onLogin={handleLogin} />;

  return (
      <Router>
        <Routes>
          <Route
              path="/"
              element={
                <div className="min-h-screen p-6 bg-[#0f172a] text-white">
                  <div className="flex justify-between items-center mb-6">
                    <h1 className="text-3xl font-bold text-indigo-400 flex items-center gap-2">
                      🧠 Task Board
                    </h1>
                    <button
                        onClick={logout}
                        className="text-sm px-3 py-1 rounded-lg bg-pink-600 hover:bg-pink-500 transition text-white"
                    >
                      Выйти ({user})
                    </button>
                  </div>

                  <div className="flex justify-center gap-3 mb-8">
                    <input
                        type="text"
                        placeholder="Название доски"
                        value={boardTitle}
                        onChange={(e) => setBoardTitle(e.target.value)}
                        className="px-4 py-2 rounded-lg border border-gray-700 bg-[#1f2937] text-white shadow-inner focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />
                    <button
                        onClick={addBoard}
                        className="bg-indigo-500 hover:bg-indigo-600 text-white px-4 py-2 rounded-lg transition shadow-md"
                    >
                      + Добавить
                    </button>
                  </div>

                  <div className="grid gap-6 grid-cols-[repeat(auto-fit,minmax(260px,1fr))]">
                    {boards.map((board) => (
                        <div
                            key={board.id}
                            className="relative p-5 rounded-2xl bg-[#1f2937] border border-gray-700
                      shadow-[inset_3px_3px_10px_#0f172a,inset_-3px_-3px_10px_#374151]
                      hover:shadow-[0_0_12px_#6366f1] transition-all duration-300"
                        >
                          {board.isEditing ? (
                              <input
                                  type="text"
                                  value={board.title}
                                  onChange={(e) => updateBoardTitle(board.id, e.target.value)}
                                  className="w-full mb-3 px-3 py-2 text-white text-sm rounded-lg border bg-[#111827] focus:outline-none"
                              />
                          ) : (
                              <h2 className="text-xl text-indigo-300 font-semibold text-center mb-4">
                                {board.title}
                              </h2>
                          )}

                          <div className="flex justify-center gap-2">
                            {!board.isEditing && (
                                <Link
                                    to={`/board/${board.id}`}
                                    className="bg-indigo-500 hover:bg-indigo-600 text-white text-sm px-4 py-1 rounded-lg transition"
                                >
                                  Открыть
                                </Link>
                            )}

                            {board.isEditing ? (
                                <button
                                    onClick={() => toggleEditing(board.id)}
                                    className="bg-green-500 hover:bg-green-600 text-white text-sm px-3 py-1 rounded-lg transition"
                                >
                                  ✔
                                </button>
                            ) : (
                                <button
                                    onClick={() => toggleEditing(board.id)}
                                    className="bg-yellow-400 hover:bg-yellow-500 text-white text-sm px-3 py-1 rounded-lg transition"
                                >
                                  ✏️
                                </button>
                            )}

                            <button
                                onClick={() => deleteBoard(board.id)}
                                className="bg-red-500 hover:bg-red-600 text-white text-sm px-3 py-1 rounded-lg transition"
                            >
                              🗑
                            </button>
                          </div>
                        </div>
                    ))}
                  </div>
                </div>
              }
          />
          <Route
              path="/board/:id"
              element={<BoardPage boards={boards} setBoards={setBoards} />}
          />
        </Routes>
      </Router>
  );
};

export default App;
