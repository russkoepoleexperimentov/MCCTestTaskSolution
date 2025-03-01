export default class TreeNode {
    constructor(title, id = 0, parentId = null, persistent = false){
        this.title = title
        this.children = []
        this.id = id
        this.parentId = parentId;
        this.persistent = persistent;
    }
}