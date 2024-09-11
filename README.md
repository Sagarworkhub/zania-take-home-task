# Zania Take-Home Task

This project demonstrates a simple yet interactive card management application built with Vite, React, and TypeScript. The application features draggable cards, image display, and persistent state management.

## Features

- **Drag-and-Drop Functionality**: Cards can be reordered using a drag handle at the top right corner. This is implemented using `@dnd-kit/core` and `@dnd-kit/sortable`.
- **Random Cat Images**: Each card displays a random cat image fetched from `thecatapi`. Clicking on the image opens a dialog box to view the full image.
- **Dialog Box**: A modal dialog allows users to view the full cat image. The dialog can be closed by clicking outside, pressing the Esc key, or using the close button.
- **Data Fetching and Persistence**: Data is fetched from a mocked API using `msw` and managed with TanStack Query (`@tanstack/react-query`). The app uses optimistic updates to handle card reordering and persists data in local storage using TanStack Query's persist functionality.

## Branches

- **main**: Implements debounce updates for handling card reordering.
- **optimistic-updates**: Implements optimistic updates instead of debounce updates for a more responsive user experience.

## Technologies Used

- **React**: UI library
- **TypeScript**: For type safety
- **Vite**: Build tool and development server
- **Shadcn/UI**: Design components
- **dndkit**: Drag-and-drop functionality
- **msw**: Mocking API requests
- **thecatapi**: Source of random cat images
- **TanStack Query**: Data fetching, caching, and persistence

## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/SagarBarpete03/zania-take-home-task.git
   ```

2. Navigate to the project directory:

   ```bash
   cd zania-take-home-task
   ```

3. Install the dependencies using pnpm:

   ```bash
   pnpm install
   ```

4. Start the development server:
   ```bash
   pnpm run dev
   ```

## Usage

- **Drag and Drop**: Use the drag handle on the top right corner of each card to reorder them.
- **View Full Image**: Click on a cat image to open it in a dialog box.

## Scripts

- `pnpm run dev`: Starts the development server.
- `pnpm run build`: Builds the project for production.
- `pnpm run preview`: Previews the production build.
- `pnpm run format`: Formats the codebase using Prettier.
- `pnpm run lint`: Lints the codebase using ESLint.

## Dependencies

- **React** and **React DOM**: For building the user interface.
- **dndkit**: For drag-and-drop functionality.
- **Shadcn/UI**: For design components.
- **msw**: For mocking API requests.
- **TanStack Query**: For data management and persistence.
- **@tanstack/query-sync-storage-persister**: For persisting query data in local storage.

## Dev Dependencies

- **TypeScript**: For type safety.
- **Vite**: For development and build.
- **ESLint**: For linting the code.
- **Prettier**: For code formatting.

---

Let me know if you need any further adjustments!
