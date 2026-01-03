import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./feature/core/layout/layout";
import { TaskScreen } from "./feature/task/presentation/screen/task-screen";

export const router = createBrowserRouter([
   {
    element: <Layout />,
    children: [
      {
        path: "/",
        element: <TaskScreen />
      },
    ]
   }
]);