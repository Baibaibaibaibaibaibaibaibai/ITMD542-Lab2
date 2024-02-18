/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./views/**/*.pug",
        "./public/**/*.html",
        "./src/**/*.{js,jsx,ts,tsx,vue}",
        // 其他包含 Tailwind 类的文件路径
    ],
    theme: {
        extend: {},
    },
    plugins: [],
}

