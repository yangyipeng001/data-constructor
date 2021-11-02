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

    // 1.追加方法
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

    // 3. insert
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

            newtNode.next = current
            previous.next = newNode
        }
    }
}

// 测试代码
// 1. 创建linkedList
var list = new linkedList()

// 2. 测试append方法
list.append('123')
list.append('1231')
list.append('1232')

console.log(list.toString())