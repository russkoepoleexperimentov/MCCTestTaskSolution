import { Component } from "react";
import TreeNodeView from "./treeNodeView";

export default class TreeView extends Component {
    constructor(props) {
        super(props);
        this.onResetButtonClick = this.onResetButtonClick.bind(this);
        this.onDumpButtonClick = this.onDumpButtonClick.bind(this);
    }

    onResetButtonClick() {
        this.props.resetState();
    }

    // https://stackoverflow.com/questions/55613438/reactwrite-to-json-file-or-export-download-no-server
    onDumpButtonClick(){
        const json = this.props.dump();
        const blob = new Blob([json], { type: "application/json" });
        const href = URL.createObjectURL(blob);

        const link = document.createElement("a");
        link.href = href;
        link.download = "dump.json";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        URL.revokeObjectURL(href);
    }

    render() {
        return(
            <div className="tree">
                <h2 className="text-center">Tree view</h2>
                <TreeNodeView 
                    key={0}
                    node={this.props.root}
                    getNode={this.props.getNode}
                    createNode={this.props.createNode}
                    renameNode={this.props.renameNode}
                    removeNode={this.props.removeNode}
                />
                <button className="w-100 red" onClick={this.onResetButtonClick}>Reset</button>
                <button className="w-100" onClick={this.onDumpButtonClick}>Export to JSON</button>
            </div>
        )
    }
}