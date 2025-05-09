# LMS Frontend

## Layout

- Auth Layout - Default layout
- App Layout - Sidebar and content body

## Pages

### Auth Section

- Login
- Register

### App Section

- Books
- Add/Edit Books
- Members
- Add/Edit Members
- Similarly for Transactions and Users

## Components

- Card
- Input
- Button
- Sidebar
- SidebarItem
- and so on

## Third Party Library and Packages

- Vite - Compiling and Bundling
- Tailwind CSS - for styling
- [React Router](https://reactrouter.com/start/declarative/installation) - for navigating between pages
- Lucide react icons - [Link](https://lucide.dev/guide/packages/lucide-react)
- Axios - [Link](https://axios-http.com/docs/intro)
- jwt-decode - [Link](https://www.npmjs.com/package/jwt-decode)
- react-toastify - [Link](https://www.npmjs.com/package/react-toastify)
- ContextAPI - [Link](https://react.dev/reference/react/createContext)
- Yup - [Link](https://www.npmjs.com/package/yup)
- Redux - [Link](https://redux.js.org/tutorials/quick-start)

## API Methods

- GET
- POST - body
- PATCH/PUT - body
- DELETE

### Redux

- Store
  - central component to link all the reducers
- Actions
  - functions to manipulate slice state data
- Reducers
  - collection of actions
- Slice
  - individual unit of data that is linked to store
- useSelector
  - a hook to access slice data in redux store
- useDispatch
  - a hook to trigger slice actions
