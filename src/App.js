import React, { Component } from "react";
import { HashRouter, Route, Switch } from "react-router-dom";

// Containers
const DashboardLayout = React.lazy(() => import("./layout/DefaultLayout"));
const Verify = React.lazy(() => import("./pages/Confirmation/EmailVerify"));

// Pages
const LandingPage = React.lazy(() => import("./pages/Landing/Public/Public"));
const Page404 = React.lazy(() => import("./pages/NotFound"));
const LoginPage = React.lazy(() => import("./pages/Login/Login"));
const VerifyPage = React.lazy(() => import("./pages/Confirmation/EmailVerify"));

class App extends Component {
  render() {
    return (
      <HashRouter>
        <React.Suspense
          // Load Spinner when in Suspense
          fallback={
            <div className="d-flex justify-content-center">
              <div className="spinner-border text-primary" role="status">
                <span className="sr-only">Loading...</span>
              </div>
            </div>
          }
        >
          <Switch>
            <Route
              exact
              path="/"
              name="Landing"
              render={(props) => <DashboardLayout {...props} />}
            />
            <Route
              path="/Dashboard"
              name="Dashboard"
              render={(props) => <DashboardLayout {...props} />}
            />
            <Route
              path="/Login"
              name="Login"
              render={(props) => <LoginPage {...props} />
            }
            />
            <Route
              path="/Verify"
              name="Verify"
              render={(props) => <VerifyPage {...props} />}
            />
          </Switch>
        </React.Suspense>
      </HashRouter>
    );
  }
}

export default App;
