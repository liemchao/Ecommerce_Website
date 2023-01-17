import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';

//Boostrap Libs
import 'bootstrap/dist/js/bootstrap.bundle.min';

// Prime Libs
import "primeflex/primeflex.css";
import "primereact/resources/themes/saga-blue/theme.css";
import "primereact/resources/primereact.min.css";
import "primeicons/primeicons.css";

//SBAdmin2 Style
import './assets/scss/sb-admin-2.scss';

// Attendant Style
import './assets/css/sb-admin-2.css';
import './assets/css/sb-admin-2.min.css';

//Redux
import { Provider } from 'react-redux';
import { Store } from './redux/store';

ReactDOM.render(
    <>
        <Provider store={Store}>
           
                <App />
            
        </Provider>
    </>, document.getElementById('root'));