import "./App.css";
import React, { Suspense } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { Provider } from "react-redux";
import store from "./redux/store";
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { PersistGate } from "redux-persist/integration/react";
import { persistStore } from "redux-persist";
import Loadinglogin from "./components/Loadinglogin";
import Loadingpath from "./components/Loadingpath";
import Updateitem from "./components/Updateitem";
import Addnewitem from "./components/Addnewitem";
import Scan from "./components/Scan";

// use lazy for every loading path
const Home = React.lazy(() => import("./components/Home"));
const Addnewpost = React.lazy(() => import("./components/Addnewpost"));
const Updatepost = React.lazy(() => import("./components/Updatepost"));
const Viewpost = React.lazy(() => import("./components/Viewpost"));
const Login = React.lazy(() => import("./components/Login"));
const Userprofile = React.lazy(() => import("./components/Userprofile"));
const Adminworkspace = React.lazy(() => import("./components/Adminworkspace"));
const Userprofileonline = React.lazy(() => import("./components/Userprofileonline"));
const Products = React.lazy(() => import("./components/Products"));

function App() {
  let persistor = persistStore(store);
  return (
    <Provider store={store}>
      <PersistGate loading={<Loadinglogin/>} persistor={persistor}>
        <BrowserRouter>
          <Routes>
            <Route
              path="/"
              element={
                <Suspense fallback={<Loadingpath/>}>
                  <Login />
                </Suspense>
              }
            />
            <Route
              path="/home"
              element={
                <Suspense fallback={<Loadingpath/>}>
                  <Home />
                </Suspense>
              }
            />
            <Route
              path="/userprofile"
              element={
                <Suspense fallback={<Loadingpath/>}>
                  <Userprofile />
                </Suspense>
              }
            />
            <Route
              path="/userprofileonline"
              element={
                <Suspense fallback={<Loadingpath/>}>
                  <Userprofileonline />
                </Suspense>
              }
            />
            <Route
              path="/viewpost"
              element={
                <Suspense fallback={<Loadingpath/>}>
                  <Viewpost />
                </Suspense>
              }
            />
            <Route
              path="/addnewpost"
              element={
                <Suspense fallback={<Loadingpath/>}>
                  <Addnewpost />
                </Suspense>
              }
            />
            <Route
              path="/updatepost"
              element={
                <Suspense fallback={<Loadingpath/>}>
                  <Updatepost />
                </Suspense>
              }
            />
            <Route
              path="/adminworkspace"
              element={
                <Suspense fallback={<Loadingpath/>}>
                  <Adminworkspace />
                </Suspense>
              }
            />
             <Route
              path="/updateitem"
              element={
                <Suspense fallback={<Loadingpath/>}>
                  <Updateitem />
                </Suspense>
              }
            />
            <Route
              path="/addnewitem"
              element={
                <Suspense fallback={<Loadingpath/>}>
                  <Addnewitem />
                </Suspense>
              }
            />
             <Route
              path="/scan"
              element={
                <Suspense fallback={<Loadingpath/>}>
                  <Scan />
                </Suspense>
              }
            />
             <Route
              path="/products"
              element={
                <Suspense fallback={<Loadingpath/>}>
                  <Products />
                </Suspense>
              }
            />
          </Routes>
          
        </BrowserRouter>
      </PersistGate>
    </Provider>
  );
}

export default App;
