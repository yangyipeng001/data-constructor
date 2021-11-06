// 双向链表封装
function DoublyLinkedList() {
    // 内部类：节点类
    function Node(data) {
        this.data = data
        this.prev = null
        this.next = null
    }

    // 属性
    this.head = null
    this.tail = null
    this.length = 0

    // 常见的操作：方法
    // 1. append - 向列表尾部添加一个新的项
    DoublyLinkedList.prototype.append = function(data) {
        // 1. 创建新节点
        var newNode = new Node(data)

        // 2. 判断是否添加的是第一个节点
        if (this.length === 0) {
           this.head = newNode
           this.tail = newNode
        }
        else {
            newNode.prev = this.tail
            this.tail.next = newNode
            this.tail = newNode
        }

        // 3. length+1
        this.length += 1
    }

    // 2. insert - 向列表的特定位置插入一个新的项
    DoublyLinkedList.prototype.insert = function(position, data) {
        // 1. 越界判断
        if (position < 0 || position > this.length) {
            return false
        }

        // 2. 根据data创建新的节点
        var newNode = new Node(data)

        // 3. 判断原来的列表是否为空
        if (this.length === 0) {
            this.head = newNode
            this.tail = newNode
        }
        else {
            // 3.1 判断position是否为0
            if (position === 0) {
                this.head.prev = newNode
                newNode.next = this.head
                this.head = newNode
            }
            // 3.2 position 为最后一个
            else if (position === this.length) {
                newNode.prev = this.tail
                this.tail.next = newNode
                this.tail = newNode
            }
            // 3.3 其他位置
            else {
                var current = this.head
                var index = 0

                while(index++ < position) {
                    current = current.next
                }

                // 修改指针
                newNode.next = current
                newNode.prev = current.prev
                current.prev.next = newNode
                current.prev = newNode
            }
        }

        // 4. length+1
        this.length += 1

        return true
    }

    // 3. get - 获取对应位置的元素
    DoublyLinkedList.prototype.get = function(position) {
        // 1. 越界判断
        if (position < 0 || position >= this.length) {
            return null
        }

        /**
         * position <= this.length / 2 从前往后
         * position > this.length / 2 从后往前
         */

        var isForward = position <= (this.length / 2)

        // 2. 获取元素
        var current = isForward ? this.head : this.tail
        var index = isForward ? 0 : this.length - 1

        if (isForward) {
            while(index++ < position) {
                current = current.next
            }
        }
        else {
            while(index-- > position) {
                current = current.next
            }
        }

        return current.data
    }

    // 4. indexOf - 返回元素在列表中的索引，如果列表中没有该元素则返回-1
    DoublyLinkedList.prototype.indexOf = function(data) {
        // 1. 定义变量
        var current = this.head
        var index = 0

        // 2. 查找和data相同的节点
        while(current) {
            if (current.data === data) {
                return index
            }

            current = current.next
            index += 1
        }

        return -1
    }

    // 5. update - 修改某个位置的元素
    DoublyLinkedList.prototype.update = function(position, newData) {
        // 1. 越界判断
        if (position < 0 || position >= this.length) {
            return false
        }

        /**
         * position <= this.length / 2 从前往后
         * position > this.length / 2 从后往前
         * @TODO: 待补充
         */

        // 2. 寻找正确的节点
        var current = this.head
        var index = 0

        while(index++ < position) {
            current = current.next
        }

        // 3. 修改找到的节点的data信息
        current.data = newData

        return true
    }

    // 6. removeAt - 从列表中的特定位置移除一项
    DoublyLinkedList.prototype.removeAt = function(position) {
        // 1. 越界判断
        if (position < 0 || position >= this.length) {
            return null
        }

        var current = this.head
        // 2.判断是否只有一个节点
        if (this.length === 1) {
            this.head = null
            this.tail = null
        }
        else {
            // 判断是否删除的是第一个节点
            if (position === 0) {
                this.head.next.prev = null
                this.head = this.head.next
            }
            // 最后一个节点
            else if (position === this.length - 1) {
                current = this.tail
                this.tail.prev.next = null
                this.tail = this.tail.prev
            }
            // 中间节点
            else {
                var index = 0

                while(index++ < position) {
                    current = current.next
                }

                current.prev.next = current.next
                current.next.prev = current.prev

            }
        }

        // 3. length-1
        this.length -= 1

        return current.data
    }

    // 7. remove - 从列表中移除一项
    DoublyLinkedList.prototype.remove = function(data) {
        // 1. 根据data获取下标值
        var index = this.indexOf(data)

        // 2. 根据index删除对应位置的节点
        return this.removeAt(index)
    }

    // 8. isEmpty - 如果链表中不包含任何元素，返回true，如果链表长度大于0，则返回false
    DoublyLinkedList.prototype.isEmpty = function() {
        return this.length === 0
    }

    // 9. size - 获取链表的长度
    DoublyLinkedList.prototype.size = function() {
        return this.length
    }

    // 10. toString
    DoublyLinkedList.prototype.toString = function() {
        return this.backwardString()
    }

    // 11. forwardString - 正向遍历的节点字符串形式 <---
    DoublyLinkedList.prototype.forwardString = function() {
        // 1. 定义变量
        var current = this.tail
        var resultString = ''

        // 2. 依次向前遍历，获取每一个节点
        while(current) {
            resultString += current.data + ' '
            current = current.prev
        }

        return resultString
    }

    // 12. backwardString - 反向遍历的节点字符串形式 --->
    DoublyLinkedList.prototype.backwardString = function() {
        // 1. 定义变量
        var current = this.head
        var resultString = ''

        // 2. 依次向后遍历，获取每一个节点
        while(current) {
            resultString += current.data + ' '
            current = current.next
        }

        return resultString
    }

    // 13. 获取链表的第一个元素
    DoublyLinkedList.prototype.getHead = function() {
        return this.head.data
    }

    // 14. 获取链表的最后一个元素
    DoublyLinkedList.prototype.getTail = function() {
        return this.tail.data
    }
}

// 测试
var list = new DoublyLinkedList()

// 1. 测试append方法
list.append('aaa')
list.append('bbb')
list.append('ccc')

// 2. 测试string方法
// console.log('backwardString', list.backwardString())
// console.log('forwardString', list.forwardString())
// console.log('toString', list.toString())

// 3. 测试insert方法
list.insert(0, '11')
list.insert(2, '22')
list.insert(5, '33')
// console.log('toString', list.toString())

// 4. 测试get方法
// console.log(list.get(0))
// console.log(list.get(2))
// console.log(list.get(5))

// 5. 测试indexof方法
// console.log(list.indexOf('aaa'))
// console.log(list.indexOf('22'))

// 5. 测试update方法
// list.update(0, 'qq')
// list.update(2, 'ww')
// console.log(list.toString())

// 6. 测试removeAt方法
// console.log(list.removeAt(1))
// console.log(list.removeAt(0))

// 7. 测试remove方法
// console.log(list.remove('bbb'))
// console.log(list.remove('222'))
// console.log(list.toString())

// 8. 测试其他方法
console.log(list.isEmpty())
console.log(list.size())
console.log(list.getHead())
console.log(list.getTail())