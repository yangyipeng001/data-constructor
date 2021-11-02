
// 封装栈
function Stack() {
    // 栈中的属性
    this.items = []

    // 栈的相关操作
    // 1.将元素压入栈
    Stack.prototype.push = function(element) {
        this.items.push(element)
    }

    // 2.从栈中取出元素
    Stack.prototype.pop = function() {
        return this.items.pop()
    }

    // 3.查看一下栈顶元素
    Stack.prototype.peek = function() {
        return this.items[this.items.length - 1]
    }

    // 4.判断栈是否为空
    Stack.prototype.isEmpty = function() {
        return this.items.length === 0
    }

    // 5.获取栈中元素的个数
    Stack.prototype.size = function() {
        return this.items.length
    }

    // 6.toSring方法
    Stack.prototype.toString = function() {
        var resultString = ''
        for(var i = 0; i < this.items.length; i++) {
            resultString += this.items[i] + ' '
        }

        return resultString
    }
}

// 栈的使用
var s = new Stack()


// 函数： 将十进制转成二进制
function dec2bin(decNumber) {
    // 1.定义对象
    var stact = new Stack()

    // 2.循环操作
    while(decNumber > 0) {
        // 2.1 获取榆树，并且放入到栈中
        stack.push(decNumber % 2)

        // 2.2 获取整除后的结果，作为下一次运行的数字
        decNumber = Math.floor(decNumber / 2)
    }

    // 3.从栈中取出0 1
    var binaryString = ''
    while(!stact.isEmpty()) {
        binaryString += stack.pop()
    }
    return binaryString
}