# Marketplace Website

This project implements a marketplace website using Express.js for the backend API and Next.js for the frontend user interface.

Project Structure

````markdown
```bash
.
├── README.md (This file)
├── backend/ # Express.js backend code
│ ├── prisma/
| |──── Migration../ (migration folders)
| |──── schema.prisma (database schema)
| |── src/
| |──── handlers
│ ├──── routers/
│ ├──── middleware/
| |──── utils/
│ ├── index.ts # Express app entry point
│ |── server.ts
| └── package.json
├── frontend/ # Next.js frontend code
│ ├── components/
│ ├── pages/
│ ├── styles/
│ ├── utils/
│ └── ... (other frontend files)
└── ... (other project files)
```
````

### Dependencies

This project relies on the following dependencies:

Node.js and npm (or yarn)

- _Express.js_
- _Next.js_
- Prisma (or alternative database management tool)
- Check package.json for other dependencies.

## Installation

1. Clone this repository.
   `git clone http://github.com/opaque-maniac/marketplace.git`
2. Install dependencies:
   _Bash_
   `cd marketPlace && cd backend && npm install  && cd ../frontend && npm install && cd ..`
   Use code with caution.
   Dependencies may have vulnerabilities. If you fix the vulnarabilities, the app may not work as well because of the update.
   If so please let me know.

## Running the Application:

1. Start the backend server:
   On one terminal, from the repository directory.
   _Bash_
   `cd backend`
   `npm run dev`
   Use code with caution.
2. Start the development server for the frontend:
   On another terminal, from the repository directory.
   _Bash_
   `cd frontend`
   `npm run dev`
   Use code with caution.
   This will typically start the backend server on port 3000 and the frontend development server on port 3001. You can access the application in your browser at http://localhost:3001.

_**ENJOY MY CODE**_
