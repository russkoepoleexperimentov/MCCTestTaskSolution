import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import store from './store/store';


const root = ReactDOM.createRoot(document.getElementById('root'));

function renderAll()
{
  root.render(
    <React.StrictMode>
      <App 
        data={store.getState()}
        getNode={store.getNode.bind(store)}
        createNode={store.createNode.bind(store)}
        renameNode={store.renameNode.bind(store)}
        removeNode={store.removeNode.bind(store)}
        resetState={store.resetState.bind(store)}
        dump={store.dump.bind(store)}
      />
    </React.StrictMode>
  );
}

store.subscribe(renderAll);
store.resetState();

reportWebVitals();
