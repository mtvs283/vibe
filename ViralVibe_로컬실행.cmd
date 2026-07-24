@echo off
title Viral Vibe Local
cd /d "C:\시나브로-vibe"
start "Viral Vibe Server" cmd /k "npm run dev -- --port 3010"
timeout /t 3 /nobreak >nul
start "" "http://localhost:3010"
exit
