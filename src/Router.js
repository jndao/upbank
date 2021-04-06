// react router
import {
    BrowserRouter as Router,
    Switch,
    Route,
    Link
} from "react-router-dom";

import {LoginForm, Header} from './components/Up.js';
import {UpTheme} from './style/UpStyle.js';

/**
 * A router to navigate through react app
 * @returns A navbar Router
 */
export function Navigation() {
    return (
    <>
        <Router>
            <Switch>
                <Route path="/about">
                    <h1>This is the about page</h1>
                </Route>
                <Route path="/">
                    <UpTheme>
                        <Header />
                        <LoginForm/>
                    </UpTheme>
                </Route>
            </Switch>
        </Router>
    </>
    );
}
  