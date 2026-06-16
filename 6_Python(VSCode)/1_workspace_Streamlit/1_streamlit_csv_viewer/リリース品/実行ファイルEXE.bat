@echo off
powershell -WindowStyle Hidden -Command "Start-Process streamlit -ArgumentList 'run app.py'"
exit