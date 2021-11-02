
// 封装优先级队列
function PriorityQueue() {
    // 在PriorityQueue重新创建了一个类：可以理解成内部类
    function QueueElement(element, priority) {
        this.element = element
        this.priority = priority
    }

    // 封装属性
    this.items = []

    // 1.实现插入方法
    PriorityQueue.prototype.enqueue = function(element, priority) {
        // 1. 创建QueueElement对象
        var queueElement = new QueueElement(element, priority)

        // 2. 判断当前队列是否为空
        if (this.items.length === 0) {
            this.items.push(queueElement)
        }
        else {
            // 有需要中间插入
            var added = false
            for (var i = 0; i < this.items.length; i++) {
                if (queueElement.priority < this.items[i].priority) {
                    this.items.splice(i, 0, queueElement)
                    added = true
                }
            }

            // 无需要中间插入, 优先级最低，直接插入到最后
            if (!added) {
                this.items.push(queueElement)
            }
        }
    }

    // 2. 从队列中删除前端元素
    PriorityQueue.prototype.dequeue = function() {
        return this.items.shift()
    }

    // 3. 查看前端元素
    PriorityQueue.prototype.front = function() {
        return this.items[0]
    }

    // 4. 查看队列是否为空
    PriorityQueue.prototype.isEmpty = function() {
        return this.items.length === 0
    }

    // 5. 查看队列中元素的个数
    PriorityQueue.prototype.size = function() {
        return this.items.length
    }

    // 6. toString
    PriorityQueue.prototype.toString = function() {
        var resultString = ''
        for(var i = 0; i < this.items.length; i++) {
            resultString += this.items[i] + ' '
        }

        return resultString
    }
}

// 测试代码
var pg = new PriorityQueue()