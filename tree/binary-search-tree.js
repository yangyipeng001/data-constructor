// 封装二叉搜索树
function BinarySearchTree() {
    function Node(key) {
        this.key = key
        this.left = null
        this.right = null
    }

    // 属性
    this.root = null

    // 方法
    // 插入数据
    BinarySearchTree.prototype.insert = function(key) {
        // 1. 根据key创建节点
        var newNode = new Node(key)

        // 2. 判断根节点是否有值
        if (this.root === null) {
            this.root = newNode
        }
        else {
            // 采用递归思想
            this.insertNode(this.root, newNode)
        }
    }
    BinarySearchTree.prototype.insertNode = function(node, newNode) {
        // 向左查找
        if (newNode.key < node.key) {
            // 没有左节点
            if (node.left === null) {
                node.left = newNode
            }
            else {
                this.insertNode(node.left, newNode)
            }
        }
        // 向右查找
        else {
            // 没有右节点
            if (node.right === null) {
                node.right = newNode
            }
            else {
                this.insertNode(node.right, newNode)
            }
        }
    }

    // 查找
    // BinarySearchTree.prototype.search = function(key) {
    //     // 1. 获取根节点
    //     var node = this.root

    //     // 2. 循环搜索key
    //     while(node !== null) {
    //         if (key < node.key) {
    //             node = node.left
    //         }
    //         else if (key > node.key) {
    //             node = node.right
    //         }
    //         else {
    //             return true
    //         }
    //     }

    //     return false
    // }

    // 查找 递归实现
    BinarySearchTree.prototype.search = function(key) {
        return this.searchNode(this.root, key)
    }
    BinarySearchTree.prototype.searchNode = function(node, key) {
        // 1. 如果传入的node为null,那就退出递归
        if (node === null) {
            return false
        }

        // 2. 判断node节点的值和传入的key大小
        // 2.1 传入的可以较小，向左继续查找
        if (node.key > key) {
            return this.searchNode(node.left, key)
        }
        // 2.2 传入的可以较大，向右继续查找
        else if (node.key < key) {
            return this.searchNode(node.right, key)
        }
        // 2.3 相同
        else {
            return true
        }
    }
    
    // 中序遍历方式遍历所有节点
    BinarySearchTree.prototype.midOrderTraversal = function(handler) {
        this.midOrderTraversalNode(this.root, handler)
    }
    BinarySearchTree.prototype.midOrderTraversalNode = function(node, handler) {
        if (node !== null) {
            // 1. 查找经过节点的左子节点
            this.preOrderTraversalNode(node.left, handler)

            // 2. 处理经过的节点
            handler(node.key)

            // 3. 查找经过节点的右子节点
            this.preOrderTraversalNode(node.right, handler)
        }
    }

    // 先序遍历方式遍历所有节点
    BinarySearchTree.prototype.preOrderTraversal = function(handler) {
        this.preOrderTraversalNode(this.root, handler)
    }
    /**
     * 第一次：node -> 11
     * 第二次：node -> 7
     * 第三次：node -> 5
     */
    BinarySearchTree.prototype.preOrderTraversalNode = function(node, handler) {
        if (node !== null) {
            // 1. 处理经过的节点
            handler(node.key)

            // 2. 查找经过节点的左子节点
            this.preOrderTraversalNode(node.left, handler)

            // 3. 查找经过节点的右子节点
            this.preOrderTraversalNode(node.right, handler)
        }
    }

    // 后序遍历方式遍历所有节点
    BinarySearchTree.prototype.postOrderTraversal = function(handler) {
        this.postOrderTraversalNode(this.root, handler)
    }
    BinarySearchTree.prototype.postOrderTraversalNode = function(node, handler) {
        if (node !== null) {
            // 1. 查找经过节点的左子节点
            this.preOrderTraversalNode(node.left, handler)

            // 2. 查找经过节点的右子节点
            this.preOrderTraversalNode(node.right, handler)

            // 3. 处理经过的节点
            handler(node.key)
        }
    }

    // @TODO: 层序序遍历方式遍历所有节点，有时间自己补充一下

    // 返回树中最小的值/键
    BinarySearchTree.prototype.min = function() {
        // 1. 获取根节点
        var node = this.root

        // 2. 一次向左不断的查找，直到节点为null
        var key = null
        while(node !== null) {
            key = node.key
            node = node.left
        }

        return key
    }

    // 返回树中最大的值/键
    BinarySearchTree.prototype.max = function() {
        // 1. 获取根节点
        var node = this.root

        // 2. 一次向右不断的查找，直到节点为null
        var key = null
        while(node !== null) {
            key = node.key
            node = node.right
        }

        return key
    }

    // 从树中移除某个键
    BinarySearchTree.prototype.remove = function(key) {
        // 1. 寻找要删除的节点
        // 1.1 定义变量，保存一些信息
        var current = this.root
        var parent = null
        var isLeftChild = true

        // 1.2 开始寻找删除的节点
        while(current.key !== key) {
            parent = current

            if (key < current.key) {
                isLeftChild = true
                current = current.left
            }
            else {
                isLeftChild = false
                current = current.right
            }

            // 某种情况下：已经找到了最后的节点，依然没有找到===key
            if (current === null) {
                return false
            }
        }

        // 找到了current.key === key
        // 2. 根据对应的情况删除节点
        // 2.1 删除的节点是叶子节点（没有子节点）
        if (current.left === null && current.right === null) {
            // 删除的是root节点
            if (current === this.root) {
                this.root = null
            }
            else if (isLeftChild) {
                parent.left = null
            }
            else {
                parent.right = null
            }
        }

        // 2.2 删除的节点有一个子节点
    }
}

// 测试代码
// 1. 创建树
var bst = new BinarySearchTree()
bst.insert(11)
bst.insert(7)
bst.insert(15)
bst.insert(5)
bst.insert(3)
bst.insert(9)
bst.insert(8)
bst.insert(10)
bst.insert(13)
bst.insert(12)
bst.insert(14)
bst.insert(20)
bst.insert(18)
bst.insert(25)
bst.insert(6)
console.log(JSON.stringify(bst))

// 2. 测试遍历
var resultStr = ''
// 先序
// bst.preOrderTraversal(function(key) {
//     resultStr += key + ' '
// })
// 11 7 5 3 6 9 8 10 15 13 12 14 20 18 25 

// 中序
bst.midOrderTraversal(function(key) {
    resultStr += key + ' '
})
// 7 5 3 6 9 8 10 11 15 13 12 14 20 18 25 

// 后序序
bst.postOrderTraversal(function(key) {
    resultStr += key + ' '
})
// console.log('resultStr', resultStr)
console.log('max', bst.max())
console.log('min', bst.min())


// 搜索
console.log(bst.search(25))
console.log(bst.search(24))
console.log(bst.search(7))