import * as React from "react";
import * as ReactDOM from "react-dom/client";
import { RouterProvider } from "react-router-dom";
import "./index.css";
import store from "./redux/store";
import { Provider } from "react-redux";
import MainRoutes from "./routes/mainRoutes/MainRoutes";
// import Lottie from "lottie-react";
// import spin from './json/loading.json';

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
  <Provider store={store}>
    <React.StrictMode>
      <RouterProvider
        router={MainRoutes}
      />
    </React.StrictMode>
  </Provider>
);
