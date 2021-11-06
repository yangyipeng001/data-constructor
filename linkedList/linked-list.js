/**
 * 单向链表
 */

// 封装链表类
function linkedList() {
    // 内部类：节点类
    function Node(data) {
        this.data = data

        // 指向下一个节点的指针
        this.next = null
    }

    // 属性
    this.head = null
    // 链表的长度
    this.length = 0

    // 1. append - 向链表尾部插入元素
    linkedList.prototype.append = function(data) {
        // 1. 创建新节点
        var newNode = new Node(data)

        // 2. 判断是否添加的是第一个节点
        // 2.1 是第一个节点
        if (this.length === 0) {
            this.head = newNode
        }
        // 2.2 不是第一个节点
        else {
            // 找到最后一个节点
            var current = this.head
            while(current.next) {
                current = current.next
            }

            // 最后节点的next指向新的节点
            current.next = newNode
        }

        // 3. length+1
        this.length += 1
    }

    // 2. toString方法
    linkedList.prototype.toString = function() {
        // 1. 定义变量
        var current = this.head
        var listString = ''

        // 2.循环获取一个个的节点
        while(current) {
            listString += current.data + ' '
            current = current.next
        }

        return listString
    }

    // 3. insert - 向链表特定位置插入元素
    linkedList.prototype.insert = function(position, data) {
        // 1. 对position进行越界判断
        if (position < 0 || position > this.length) {
            return false
        }

        // 2. 根据data创建newNode
        var newNode = new Node(data)

        // 3. 判断插入的位置是否为第一个
        if (position === 0) {
            newNode.next = this.head
            this.head = newNode
        }
        else {
            var index = 0
            var current = this.head
            var previous = null

            while(index++ < position) {
                previous = current
                current = current.next
            }

            newNode.next = current
            previous.next = newNode
        }

        // 4. length+1
        this.length += 1
        
        return true
    }

    // 4. get - 获取对应的位置的元素
    linkedList.prototype.get = function(position) {
        // 1. 越界处理
        if (position < 0 || position >= this.length) {
            return null
        }

        // 2. 获取对应位置的数据
        var current = this.head
        var index = 0

        while(index++ < position) {
            current = current.next
        }

        return current.data
    }

    // 5. indexOf - 返回元素在链表中的索引，如果没有该元素则返回-1
    linkedList.prototype.indexOf = function(data) {
        // 1. 定义变量
        var current = this.head
        var index = 0

        // 2. 开始查找
        while(current) {
            if (current.data === data) {
                return index
            }

            current = current.next
            index += 1
        }

        // 3. 找到最后没有找到，返回-1
        return -1
    }

    // 6. update - 修改某个位置的元素
    linkedList.prototype.update = function(position, newData) {
        // 1.越界判断
        if (position < 0 || position >= this.length) {
            return false
        }

        // 2. 查找正确的节点
        var current = this.head
        var index = 0
        while(index++ < position) {
            current = current.next
        }

        // 3. 将position位置的node的data修改为newData
        current.data = newData
        
        return true
    }

    // 7. removeAt - 从列表的特定位置移除一项
    linkedList.prototype.removeAt = function(position) {
        // 1.越界判断
        if (position < 0 || position >= this.length) {
            return null
        }

        // 2. 判断是否删除的是第一个节点
        var current = this.head
        if (position === 0) {
            this.head = this.head.next
        }
        else {
            var index = 0
            var previous = null

            while(index++ < position) {
                previous = current
                current = current.next
            }

            // 前一个节点的next指向，current的指向即可
            previous.next = current.next
        }

        // 3. length-1
        this.length -= 1

        return current.data
    }

    // 8. remove - 从列表中移除一项
    linkedList.prototype.remove = function(data) {
        // 1. 获取data在列表中的位置
        var position = this.indexOf(data)

        // 2. 根据位置信息删除节点
        return this.removeAt(position)
    }

    // 9. isEmpty - 是否为空
    linkedList.prototype.isEmpty = function() {
        return this.length === 0
    }

    // 9. size - 链表长度
    linkedList.prototype.size = function() {
        return this.length
    }
}

// 测试代码
// 1. 创建linkedList
var list = new linkedList()

// 2. 测试append方法
list.append('123')
list.append('1231')
list.append('1232')
// console.log(list.toString())

// 3. 测试insert方法
list.insert(0, 'a')
list.insert(3, 'b')
list.insert(5, 'c')
// console.log(JSON.stringify(list))

// 4. 测试get方法
// console.log(list.get(0))
// console.log(list.get(3))
// console.log(list.get(5))

// 5. 测试indexOf方法
// console.log(list.indexOf('a'))
// console.log(list.indexOf('b'))
// console.log(list.indexOf('c'))

// 6. 测试update方法
list.update(0, 'nnn')
list.update(3, 'ddd')
// console.log(JSON.stringify(list))

// 7. 测试removeAt方法
list.removeAt(0)
// console.log(JSON.stringify(list))

// 8. 测试remove方法
list.remove('ddd')
// console.log(JSON.stringify(list))

// 9. 测试isEmpty, size方法
// list.remove('ddd')
console.log(list.isEmpty(), list.size())