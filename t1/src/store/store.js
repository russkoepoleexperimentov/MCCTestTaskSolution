import TreeNode from "./data/treeNode";

let store = {
    _state: {},

    getState(){
        return this._state;
    },

    createNode(parentNodeId){
        this._state.lastNodeId += 1;
        let newId = this._state.lastNodeId;
        this._state.tree[newId] = new TreeNode(`Node ${newId}`, newId, parentNodeId, false);
        this._state.tree[parentNodeId].children.push(newId);
        this.notifySubscriber();

        console.log(`Node ${newId} created. State is:`);
        console.log(this.getState());
    },

    renameNode(id, title){
        this._state.tree[id].title = title
        this.notifySubscriber();
    },

    getNode(id){
        return this._state.tree[id];
    },

    removeNode(id){
        const node = this.getNode(id);

        const siblingIndex = this._state.tree[node.parentId].children.indexOf(id);
        if (siblingIndex > -1) {
            this._state.tree[node.parentId].children.splice(siblingIndex, 1);
        }

        this._removeTreeRecursive(id);

        this.notifySubscriber();

        console.log(`Node ${id} deleted. State is:`);
        console.log(this.getState());
    },

    _removeTreeRecursive(id){
        const node = this.getNode(id);

        node.children.forEach(child => {
            this._removeTreeRecursive(child);
            delete this._state.tree[child];
        });

        delete this._state.tree[id];
    },

    resetState(){
        this._state = {
            tree: { 0: new TreeNode("Root node", 0, null, true) },
            lastNodeId: 0
        }
        this.notifySubscriber();
    },

    dump(){
        return JSON.stringify(this._getChildren(this._state.tree[0]), null, 2);
    },

    _getChildren(node){
        if(node.children)
        {
            return {
                title: node.title,
                children: [...node.children.map(i => this._getChildren(this.getNode(i)))]
            }
        }
        else
        {
            return {
                title: node.title,
                children: []
            }
        }
    },

    notifySubscriber() { 
        console.log("Nobody subscribed to this store"); 
    },

    subscribe(observer){
        this.notifySubscriber = observer;
    }
}

export default store;