/**
 * 排序算法
 */

// 创建列表类
function ArrayList() {
    // 属性
    this.array = []

    // 方法
    // 将数据可以插入到数组中的方法
    ArrayList.prototype.insert = function(item) {
        this.array.push(item)
    }

    // toString
    ArrayList.prototype.toString = function() {
        return this.array.join('-')
    }

    /**
     * 排序算法
     */
    // 交换两个位置的数据
    ArrayList.prototype.swap = function(m, n) {
        var temp = this.array[m]
        this.array[m] = this.array[n]
        this.array[n] = temp
    }

    // 冒泡排序
    ArrayList.prototype.bubbleSort = function() {
        // 1.获取数组的长度
        var length = this.array.length

        /**
         * 第一次：j = length - 1, 比较到倒数第一个位置
         * 第二次：j = length - 2, 比较到倒数第二个位置
         * ...
         * 
         */
        for (var j = length - 1; j >= 0; j--) {
            /**
             * 第一次进来: i = 0, 比较 0 和 1 位置的两个数据，如果0位置数据大于1位置的数据
             * 最后一次进来: i = length - 2, 比较length-2和length-1的两个数据
             */
            for (var i = 0; i < j; i++) {
                if (this.array[i] > this.array[i + 1]) {
                    this.swap(i, i + 1)
                }
            }
        }
    }

    // 选择排序
    ArrayList.prototype.selectionSort = function() {
        // 1. 获取数组长度
        var length = this.array.length

        // 2. 外层循环：从0位置开始取数据
        for (var j = 0; j < length - 1; j++) {
            // 内层循环：从i+1位置开始，和后面的数据进行比较
            var min = j

            for (var i = min + 1; i < length; i++) {
                if (this.array[min] > this.array[i]) {
                    min = i
                }
            }

            this.swap(min, j)
        }
    }

    // 插入排序
    ArrayList.prototype.insertionSort = function() {
        // 1.获取数组的长度
        var length = this.array.length

        // 2.外层循环：从第1个位置开始获取数据，向前面局部有序进行插入
        for (var i = 1; i < length; i++) {
            // 3.内层循环：获取i位置的元素，和前面的数据依次进行比较
            var temp = this.array[i]
            var j = i 

            while (this.array[j - 1] > temp && j > 0) {
                this.array[j] = this.array[j - 1]
                j--
            }

            // 4.将j位置的数据，放置temp就可以le
            this.array[j] = temp
        }
    }

    // 希尔排序
    ArrayList.prototype.shellSort = function() {
        // 1.获取数组的长度
        var length = this.array.length

        // 2.初始化的增量（gap -> 间隔/间隙）
        var gap = Math.floor(length / 2)

        // 3.while循环（gap不断的减小）
        while(gap >= 1) {
            // 4.以gap作为间隔，进行分组，对分组进行插入排序
            for (var i = gap; i < length; i++) {
                var temp = this.array[i]
                var j = i

                while(this.array[j - gap] > temp && j > gap - 1) {
                    this.array[j] = this.array[j - gap]
                    j -= gap
                }

                // 5.将j位置的元素赋值temp
                this.array[j] = temp
            }

            // 6.增量变化
            gap = Math.floor(gap / 2)
        }
    }

    // 快速排序
    // 1.选择枢纽
    ArrayList.prototype.median = function(left, right) {
        // 1.取出中间的位置
        var center = Math.floor((left + right) / 2)

        // 2.判断大小，并且进行交换
        if (this.array[left] > this.array[center]) {
            this.swap(left, center)
        }

        if (this.array[left] > this.array[right]) {
            this.swap(left, right)
        }

        if (this.array[center] > this.array[right]) {
            this.swap(center, right)
        }

        // 3.将center换到right-1的位置
        this.swap(center, right - 1)

        return this.array[right - 1]
    }

    ArrayList.prototype.quickSort = function() {
        this.quick(0, this.array.length - 1)
    }

    ArrayList.prototype.quick = function(left, right) {
        // 1.结束条件
        if (left >= right) {
            return
        }

        // 2.获取枢纽
        var pivot = this.median(left, right)

        // 3.定义变量，用于记录当前找到的位置
        var i = left
        var j = right - 1

        // 4.开始进行交换
        while(i < j) {
            while(this.array[++i] < pivot) {}
            while(this.array[--j] > pivot) {}

            if (i >= j) {
                // 5.将枢纽放置在正确的位置，i的位置
                this.swap(i, right - 1)
                break
            }

            this.swap(i, j)
        }

        // 6.分而治之
        this.quick(left, i - 1)
        this.quick(i + 1, right)
    }
}

// 测试类
var list = new ArrayList()

// 插入元素
list.insert(66)
list.insert(88)
list.insert(12)
list.insert(87)
list.insert(100)
list.insert(5)
list.insert(566)
list.insert(23)
list.insert(600)
list.insert(2)
list.insert(80)
list.insert(99)
console.log('list-origin', list.toString())

// 冒泡排序
// list.bubbleSort()
// console.log('bubble', list.toString())

// 选择排序
// list.selectionSort()
// console.log('selectionSort', list.toString())

// 希尔排序
// list.shellSort()
// console.log('shellSort', list.toString())

// 快速排序
list.quickSort()
console.log('quickSort', list.toString())