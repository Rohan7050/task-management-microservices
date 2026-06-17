import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import PreLoginGuard from "./shared/guards/PreLogin.guard";
import PageWrapper from "./shared/components/PageWrapper/PageWrapper";
import LandingPage from "./features/landing/page/LandingPage";
import LoginPage from "./features/auth/pages/Login/LoginPage";
import RegisterPage from "./features/auth/pages/Register/RegisterPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <PageWrapper />,
    children: [
      { 
        element: <PreLoginGuard />, 
        children: [
          {
            index: true,
            element: <LandingPage/>
          },
          {
            path: "login",
            element: <LoginPage/>
          },
          {
            path: "register",
            element: <RegisterPage/>
          }
        ] 
      },
      // {
      //   element: <AuthGuard/>,
      //   children: [
      //     { path: "boards", element: <BoadsPage /> },
      //     { path: "boards/:id", element: <BoardDetailPage />},
      //   ]
      // },
      // { path: "*", element: <NotFoundPage /> },
    ],
  },
]);

function App() {

  return (
    <>
      <RouterProvider router={router}></RouterProvider>
    </>
  );
}

export default App;
