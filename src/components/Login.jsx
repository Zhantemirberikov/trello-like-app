import React, { useState } from 'react';

const Login = ({ onLogin }) => {
    const [username, setUsername] = useState('');

    const handleSubmit = (e) => {
        e.preventDefault();
        if (!username.trim()) return;
        localStorage.setItem('username', username.trim());
        onLogin(username.trim());
    };

    return (
        <div className="min-h-screen flex items-center justify-center
            bg-gradient-to-br from-[#0f172a] via-[#1f2937] to-[#111827]
            bg-[length:200%_200%] animate-soft-bg text-white transition-all relative">

            {/* 🐱 Котик теперь ВНЕ формы — стоит на свечении */}
            <img
                src="/cat.gif"
                alt="walking cat"
                className="absolute top-[calc(50%-320px)] left-1/2 transform -translate-x-1/2 h-52 pointer-events-none z-30"

            />

            {/* Форма логина */}
            <div className="w-full max-w-md p-8 pt-20 rounded-2xl bg-[#1f2937]/90 backdrop-blur-md
                border border-indigo-500 shadow-[0_0_20px_#6366f1] animate-pulse-neon relative z-10">

                <h2 className="text-3xl font-bold text-center text-indigo-400 mb-2">
                    👋 Добро пожаловать
                </h2>
                <p className="text-center text-gray-400 mb-6">
                    Введите ваше имя, чтобы начать
                </p>

                <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                    <input
                        type="text"
                        placeholder="Ваше имя"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="px-4 py-2 rounded-md bg-[#111827] text-white border border-gray-700
                            focus:outline-none focus:ring-2 focus:ring-indigo-500 shadow-inner
                            transition-all duration-300 placeholder:text-gray-500 focus:placeholder:text-indigo-300"
                    />
                    <button
                        type="submit"
                        className="bg-indigo-500 hover:bg-indigo-600 text-white py-2 rounded-md transition
                            shadow-[0_0_15px_#6366f1] hover:shadow-[0_0_25px_#6366f1]"
                    >
                        🚀 Войти
                    </button>
                </form>

            </div>
        </div>
    );
};

export default Login;
