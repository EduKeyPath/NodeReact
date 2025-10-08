import React from 'react';
import ReactDOM from 'react-dom';
import { ApolloProvider } from "@apollo/client";
import { createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import { Provider } from 'react-redux';
import {rootReducer} from './redux/reducers';
import {projectContext} from './redux/project-context';
import client from "./apolloClient";
const store = createStore(rootReducer, applyMiddleware(thunk));



ReactDOM.render(
  <React.StrictMode>
       <ApolloProvider client={client}>
          <Provider store={store}>
            <projectContext.Provider value={{ProjectName : 'React Training POC by LM'}}>
              <App />
            </projectContext.Provider>
          </Provider>
        </ApolloProvider>
    </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
