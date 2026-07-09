@echo off
chcp 65001 >nul

echo 前回の Streamlit を強制終了します
taskkill /IM python.exe /F >nul 2>&1

set CSV=%1

if "%CSV%"=="" (

    echo 引数なし → 通常モードで起動します
    streamlit run app.py
    exit /b 1
) else (

    echo 引数あり → CSV=%CSV%
    streamlit run app.py -- --csv %CSV%
    exit /b %errorlevel%
)