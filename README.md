# TaskFlow — A Cross-Platform To-Do App (React Native + Expo)

**TaskFlow** is a tiny, fully working to-do list mobile application built with
**React Native** and the **Expo CLI** for the Cross Platform Development (CPD)
subject. It runs with a single codebase on **Android, iOS, and the Web**.

---

## Features

- Add new tasks quickly from the top input bar
- Mark tasks as completed (tap the circular checkbox)
- Delete individual tasks (tap the red ✕ button)
- Filter tasks using **All / Active / Done** tabs with live counts
- "Clear completed tasks" shortcut
- Friendly empty-state screen
- **Offline persistence** — tasks are saved on the device using
  AsyncStorage and remain there after closing and reopening the app
- Clean, responsive UI built with React Native core components
- Accessibility labels on all interactive elements

## Tech Stack

| Tool / Library | Version | Purpose |
| --- | --- | --- |
| Expo SDK | ~57.0.24 | Cross-platform development toolkit / CLI |
| React Native | 0.86.3 | UI framework for native apps |
| React | 19.2.3 | Component & hooks library |
| AsyncStorage | 2.2.0 | On-device key–value storage (persistence) |
| react-native-safe-area-context | latest | Safe-area (notch) handling |
| react-native-web | latest | Web target support |
| Node.js | 18+ recommended | JavaScript runtime |

## Project Structure

```
taskflow/
├── App.js                     # Main screen: state, logic, layout
├── app.json                   # Expo configuration
├── index.js                   # App entry point
├── package.json               # Dependencies and scripts
├── assets/                    # App icon and splash images
└── components/
    ├── TaskItem.js            # A single task row (checkbox, text, delete)
    └── FilterTabs.js          # All / Active / Done filter tabs
```

## Getting Started (How to Run)

### 1. Prerequisites

- [Node.js](https://nodejs.org/) (LTS version recommended)
- The **Expo Go** app installed on your Android/iOS phone
  (from the Play Store / App Store)

### 2. Install dependencies

```bash
cd taskflow
npm install
```

### 3. Start the development server

```bash
npx expo start
```

A QR code will appear in the terminal.

### 4. Open the app

- **Android:** open **Expo Go** and scan the QR code
- **iOS:** scan the QR code with the Camera app, then tap the notification
- **Web:** press `w` in the terminal, or run `npx expo start --web`
- **Android emulator:** press `a` (Android Studio + emulator required)

## How to Use

1. Type a task in the input box and press **+** (or Enter).
2. Tap the circle on the left to mark a task as done.
3. Tap the red **✕** on the right to delete a task.
4. Use the **All / Active / Done** tabs to filter tasks.
5. Tap **Clear completed tasks** at the bottom to remove finished tasks.
6. Close and reopen the app — your tasks are still there.

## How Persistence Works

Every time the task list changes, the app serializes it with `JSON.stringify`
and writes it to AsyncStorage under the key `@taskflow/tasks_v1`. On launch it
reads that key and restores the list. AsyncStorage works on Android, iOS, and
web (where it maps to `localStorage`).

## Future Enhancements

- Edit an existing task
- Task due dates and reminders
- Categories / tags and colors
- Dark mode
- Cloud sync with user login

## Author
**Devraj Panchal**
Enrollment No.: **2305101270066**
Subject: Cross Platform Development (CPD)
Worked on this project with:
**Abhishek Kumar** 
Enrollment No.: **2305101270005**

## License

MIT — feel free to use this project for learning purposes.
