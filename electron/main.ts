import { app, BrowserWindow, ipcMain, screen } from "electron";
// import { createRequire } from 'node:module'
import { fileURLToPath } from "node:url";
import path from "node:path";
import fs from "node:fs";
import { ChildProcess } from "node:child_process";
import child_process from "node:child_process";
process.env["ELECTRON_DISABLE_SECURITY_WARNINGS"] = "true";
import { getSqlite3 } from "./sqlite3";

// const require = createRequire(import.meta.url)
const __dirname = path.dirname(fileURLToPath(import.meta.url));

// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, "..");

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env["VITE_DEV_SERVER_URL"];
export const MAIN_DIST = path.join(process.env.APP_ROOT, "dist-electron");
export const RENDERER_DIST = path.join(process.env.APP_ROOT, "dist");

const env_VITE_PUBLIC = VITE_DEV_SERVER_URL
  ? path.join(process.env.APP_ROOT, "public")
  : RENDERER_DIST;
let win: BrowserWindow | null;
let workerProcess: ChildProcess | null;
function createWindow() {
  win = new BrowserWindow({
    width: 1000,
    // resizable: true,
    // transparent: true,
    // fullscreenable: true,
    // frame: false,
    height: 800,
    icon: path.join(env_VITE_PUBLIC, "electron-vite.svg"),
    titleBarStyle: "hidden",
    titleBarOverlay: {
      color: "rgba(0,0,0,0)",
      height: 35,
      symbolColor: "white",
    },
    webPreferences: {
      preload: path.join(__dirname, "preload.mjs"),
    },
  });

  // Test active push message to Renderer-process.
  win.webContents.on("did-finish-load", () => {
    win?.webContents.send("main-process-message", new Date().toLocaleString());
  });

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL);
    win.webContents.openDevTools();
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, "index.html"));
  }

  // workerProcess = child_process.exec(
  //   "start /b C:\\Users\\Administrator\\.jdks\\openjdk-21.0.1\\bin\\java.exe -jar trading-life-java.jar",
  //   function (error, stdout, stderr) {
  //     if (error) {
  //       console.log("error");
  //       console.log(error.stack);
  //       console.log("Error code: " + error.code);
  //       console.log("Signal received: " + error.signal);
  //     }

  //     console.log("stdout");
  //     console.log("stdout: " + stdout);
  //     console.log("stderr: " + stderr);
  //   }
  // );

  // workerProcess.on("exit", function (code) {
  //   console.log("child_process");
  //   console.log("child_process exit ");
  //   console.log("child_process exit " + code);
  //   console.log("child_process exit ");
  // });

  getSqlite3().then((database) => {
    console.log("database init suc");
    // ensure did-finish-load
    setTimeout(() => {
      win?.webContents.send("main-process-message", "[sqlite3] initialize success :)");
    }, 999);
  });
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    if (workerProcess) {
      let result = workerProcess.kill();

      console.log("result");
      console.log(result);
    }
    app.quit();
    win = null;
  }
});

app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
ipcMain.handle("app_platform", () => {
  return process.platform;
});
app.whenReady().then(createWindow);
