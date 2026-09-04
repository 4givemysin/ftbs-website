@echo off
setlocal EnableDelayedExpansion
cd /d "%~dp0"

echo Installing/updating PyInstaller and runtime deps...
python -m pip install pyinstaller pyautogui pillow opencv-python numpy pynput keyboard mss
if errorlevel 1 (
  echo pip install failed.
  exit /b 1
)

set DATA=
for %%f in (*.png) do (
  set DATA=!DATA! --add-data "%%f;."
)

echo Building PackMacro.exe (one-file, windowed)...
python -m PyInstaller --noconfirm --clean --onefile --windowed --name PackMacro ^
  --runtime-hook dpi_hook.py ^
  --collect-all cv2 ^
  --collect-all pynput ^
  --hidden-import pyautogui ^
  --hidden-import PIL ^
  --hidden-import numpy ^
  --hidden-import cv2 ^
  --hidden-import pynput ^
  --hidden-import pynput.keyboard._win32 ^
  --hidden-import keyboard ^
  --hidden-import mss ^
  !DATA! ^
  main.py

if errorlevel 1 (
  echo PyInstaller failed.
  exit /b 1
)

if exist dist\PackMacro.exe (
  copy /Y dist\PackMacro.exe PackMacro.exe >nul
  echo.
  echo Built:
  echo   %cd%\dist\PackMacro.exe
  echo   %cd%\PackMacro.exe
) else (
  echo dist\PackMacro.exe was not created.
  exit /b 1
)
