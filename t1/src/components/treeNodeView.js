import { Component } from "react";

export default class TreeNodeView extends Component {
    constructor(props) {
        super(props);
        this.onRemoveButtonClick = this.onRemoveButtonClick.bind(this);
        this.onAddButtonClick = this.onAddButtonClick.bind(this);
        this.onLabelValueChanged = this.onLabelValueChanged.bind(this);
    }

    onAddButtonClick(){
        this.props.createNode(this.props.node.id);
    }

    onRemoveButtonClick(){
        this.props.removeNode(this.props.node.id);
    }

    onLabelValueChanged(e){
        const newTitle = e.target.value
        const id = this.props.node.id
        this.props.renameNode(id, newTitle)
    }

    render() {
        return(
            <div className="tree-item">
                <div className="tree-item-elements">
                    <input onChange={this.onLabelValueChanged} value={this.props.node.title}/>
                    <button onClick={this.onAddButtonClick}>Add child</button>
                    {
                        !this.props.node.persistent ? 
                        <button className="red" onClick={this.onRemoveButtonClick}>Remove</button> :
                        <div></div>
                    }
                </div>
                <div className="tree-item-list">
                    {
                        this.props.node.children.map(id =>
                            <TreeNodeView 
                                key={id}
                                node={this.props.getNode(id)}
                                getNode={this.props.getNode}
                                createNode={this.props.createNode}
                                renameNode={this.props.renameNode}
                                removeNode={this.props.removeNode}
                            />
                        ) 
                    }
                </div>
            </div>
        )
    }
}