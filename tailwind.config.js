/** @type {import('tailwindcss').Config} */
export default {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            animation: {
                'fade-in': 'fadeIn 1s ease-out forwards',
                'slide-glow': 'slideGlow 0.8s ease-out forwards',
                'pulse-neon': 'pulseNeon 2s ease-in-out infinite',
                'soft-bg': 'bgShift 12s ease infinite',
            },
            keyframes: {
                fadeIn: {
                    '0%': { opacity: '0', transform: 'scale(0.97)' },
                    '100%': { opacity: '1', transform: 'scale(1)' },
                },
                slideGlow: {
                    '0%': { opacity: '0', transform: 'translateY(30px) scale(0.95)' },
                    '100%': { opacity: '1', transform: 'translateY(0px) scale(1)' },
                },
                pulseNeon: {
                    '0%, 100%': {
                        boxShadow: '0 0 10px #6366f1, 0 0 30px #6366f1',
                    },
                    '50%': {
                        boxShadow: '0 0 20px #8b5cf6, 0 0 40px #8b5cf6',
                    },
                },
                bgShift: {
                    '0%, 100%': { backgroundPosition: '0% 0%' },
                    '50%': { backgroundPosition: '100% 100%' },
                },
            },
        },
    },
    plugins: [],
};
