# 🗨️ Forum Discussion App (React + Dicoding Forum API)

This project is a **Forum Discussion Application** built using **React** that utilizes the **Dicoding Forum API**.  
It allows users to register, log in, create and view discussion threads, and interact with comments within threads.  
We encourage creativity in your implementation, but make sure the app fulfills all the required criteria described below.

---

## 🚀 Base URL
https://forum-api.dicoding.dev/v1

---

## 🎯 Main Criteria 1: Application Functionality

- Users can **register** for an account.  
- Users can **log in** to an account.  
- Display a **list of threads**.  
- When a thread is selected, display its **details and comments**.  
- Authenticated users can **create new threads**.  
- Authenticated users can **post comments** in a thread.  
- Display a **Loading Indicator** when fetching data from the API.

### 📝 Important Notes

Authorization in accessing thread resources is flexible:
- Viewing threads **may** or **may not** require login.
- However, creating threads or comments **requires authentication**.

Each **thread item** on the thread list page must display:
- Thread **title**  
- Snippet of **thread body** (optional)  
- **Creation time**  
- **Comment count**  
- Thread author information: **Name** and **Avatar** (optional)

Each **thread detail** page must display:
- Thread **title**  
- Thread **body**  
- **Creation time**  
- Thread author information: **Name** and **Avatar**  
- **Comments** under the thread  

Each **comment** must at least display:
- **Comment content**  
- **Creation time**  
- Comment author information: **Name** and **Avatar** (optional)

---

## 🐞 Main Criteria 2: Bugs Highlighting

- Must use **ESLint** in the project source code.  
  > Indication: an `.eslintrc` configuration file must exist in the project root.  
- Follow one of these **JavaScript Style Guides**:
  - Dicoding Academy JavaScript Style Guide  
  - AirBnB JavaScript Style Guide  
  - Google JavaScript Style Guide  
  - StandardJS Style Guide  
- **No ESLint errors** should appear.  
- Must use **React Strict Mode**.

---

## 🧱 Main Criteria 3: Application Architecture

- Most of the **application state** (especially data fetched from the API) must be stored in the **Redux Store**.  
- **Form inputs** or **controlled components** can manage their own local state.  
- **No REST API calls** should be made directly in component lifecycle methods or effects.  
- Separate **UI code** and **State management code** into different folders.  
- **React components** must be **modular and reusable**.

---

## 🌟 Make Your Project Outstanding!

In addition to the main criteria, you can implement the following features to make your project stand out and score higher.

---

### 🗳️ Suggestion 1: Voting Feature on Threads and Comments

- Add buttons for **upvoting/downvoting** threads and comments.  
- Display a **visual indicator** when the user has already voted (e.g., change the button color from gray to red).  
- Enhance **user experience** by implementing **Optimistic UI Updates**.  
- Display the **vote count** on threads and comments.

---

### 🏆 Suggestion 2: Leaderboard Feature

- Add a **Leaderboard Page** showing top users.  
- Each leaderboard item must include:
  - **User name**  
  - **User avatar**  
  - **Score**

---

### 🧩 Suggestion 3: Filter Threads by Category

- Add a feature to **filter thread items** displayed on the thread list page **by category**.  
- ⚠️ Note: Since the API does **not** provide an endpoint for filtering threads, this feature must be implemented entirely on the **Front-End** by manipulating the app’s state.

---

## 🛠️ Tech Stack

- **React 18+**
- **Redux Toolkit**
- **React Router**
- **Axios / Fetch API**
- **ESLint** (AirBnB / StandardJS / Google / Dicoding Style Guide)
- **React Strict Mode**
- **Tailwind CSS / Styled Components** (optional for UI styling)
