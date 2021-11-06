// 封装集合类
function Set() {
    // 属性
    this.items = {}

    // 方法
    // add
    Set.prototype.add = function(value) {
        // 判断当前集合中是否已经包含了该元素
        if (this.has(value)) {
            return false
        }

        // 将元素添加到集合中
        this.items[value] = value
        return true
    }

    // has
    Set.prototype.has = function(value) {
        return this.items.hasOwnProperty(value)
    }

    // remove
    Set.prototype.remove = function(value) {
        // 1. 判断该集合中是否包含该元素
        if (!this.has(value)) {
            return false
        }

        // 2.将元素从属性中删除
        delete this.items[value]
        return true
    }

    // clear
    Set.prototype.clear = function() {
        this.items = {}
    }

    // size
    Set.prototype.size = function() {
        return Object.keys(this.items).length
    }

    // values 获取集合中的所有值
    Set.prototype.values = function() {
        return Object.keys(this.items)
    }


    /**
     * 集合间的操作
     */
    // 并集
    Set.prototype.union = function(otherSet) {
        // this：集合对象A
        // otherSet：集合对象B

        // 1. 创建新的集合
        var unionSet = new Set()

        // 2. 将A集合中的所有的元素添加到新的集合中
        var values = this.values()
        for (var i = 0; i < values.length; i++) {
            unionSet.add(values[i])
        }

        // 3. 取出B集合中的元素，判断是否需要添加到新集合
        values = otherSet.values()
        for (var j = 0; j < values.length; j++) {
            unionSet.add(values[j])
        }

        return unionSet
    }

    // 交集
    Set.prototype.intersection = function(otherSet) {
        // this：集合对象A
        // otherSet：集合对象B

        // 1. 创建新的集合
        var intersectionSet = new Set()

        // 2. 从A集合中取出一个个元素，判断是否同时存在于B集合中，存在放入新的集合中
        var values = this.values()
        for (var i = 0; i < values.length; i++) {
            var item = values[i]

            if (otherSet.has(item)) {
                intersectionSet.add(item)
            }
        }

        return intersectionSet
    }

    // 差集
    Set.prototype.difference = function(otherSet) {
        // this：集合对象A
        // otherSet：集合对象B

        // 1. 创建新的集合
        var differenceSet = new Set()

        // 2. 取出A集合一个个元素，判断是否同时存在于B中，不存在B中，则添加到A中
        var values = this.values()
        for (var i = 0; i < values.length; i++) {
            var item = values[i]

            if (!otherSet.has(item)) {
                differenceSet.add(item)
            }
        }

        return differenceSet
    }

    // 子集
    Set.prototype.subset = function(otherSet) {
        // this：集合对象A
        // otherSet：集合对象B
        // 遍历集合A中的所有元素，如果发现，集合A中的元素，在集合B中不存在，则返回false
        // 如果遍历完了整个集合，依然没有返回false，那么返回true 

        var values = this.values()
        for (var i = 0; i < values.length; i++) {
            var item = values[i]

            if (!otherSet.has(item)) {
                return false
            }
        }

        return true
    }
}

// 测试
// var set = new Set()

// add
// set.add('a')
// set.add('a')
// console.log(set.values())


// 测试 并集
// var setA = new Set()
// setA.add('a')
// setA.add('b')
// setA.add('c')

// var setB = new Set()
// setB.add('a')
// setB.add('e')
// setB.add('f')
// console.log(setA.union(setB).values())

// 测试 交集
// var setA = new Set()
// setA.add('a')
// setA.add('b')
// setA.add('c')

// var setB = new Set()
// setB.add('a')
// setB.add('e')
// setB.add('f')
// console.log(setA.intersection(setB).values())

// 测试 差集
// var setA = new Set()
// setA.add('a')
// setA.add('b')
// setA.add('c')

// var setB = new Set()
// setB.add('a')
// setB.add('e')
// setB.add('f')
// console.log(setA.difference(setB).values())

// 测试 子集
var setA = new Set()
setA.add('a')
setA.add('e')
setA.add('c')

var setB = new Set()
setB.add('a')
setB.add('e')
setB.add('f')
console.log(setA.subset(setB))