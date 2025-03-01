import './App.css';
import { Component } from 'react';
import TreeView from './components/treeView';

export default class App extends Component {
    render() {
      return (
        <div className="col">
          <div className='grow'></div>
          <div className="row">
            <TreeView 
              root={this.props.getNode(0)} 
              getNode={this.props.getNode}
              createNode={this.props.createNode}
              renameNode={this.props.renameNode}
              removeNode={this.props.removeNode}
              resetState={this.props.resetState}
              dump={this.props.dump}
            />
          </div>
          <div className='grow'></div>
        </div>
      );
    }
}
