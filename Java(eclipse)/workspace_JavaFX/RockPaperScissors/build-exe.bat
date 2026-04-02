@echo off

REM ====== ê›íË ======
set APP_NAME=RockPaperScissors
set MAIN_JAR=RockPaperScissors-1.0.jar
set MAIN_CLASS=com.example.RockPaperScissors.Main
set JAVAFX_PATH=C:\javafx-sdk-21\lib

REM ====== é¿çs ======
jpackage ^
  --type exe ^
  --name %APP_NAME% ^
  --input target ^
  --main-jar %MAIN_JAR% ^
  --main-class %MAIN_CLASS% ^
  --module-path "%JAVAFX_PATH%" ^
  --add-modules javafx.controls,javafx.fxml ^
  --win-console ^
  --verbose

echo.
echo ============================
echo   EXE çÏê¨Ç™äÆóπÇµÇ‹ÇµÇΩÅI
echo   èoóÕêÊ: %cd%\%APP_NAME%.exe
echo ============================
pause