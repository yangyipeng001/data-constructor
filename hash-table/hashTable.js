/**
 * 哈希表封装
 * 采用链地址法
 * 
 * 数据格式类似：[[[k, v], [k, v], [k, v]], [[k, v], [k, v], [k, v]]]
 */
function HashTable() {
    // 属性
    // 存储数组
    this.storage = []

    // 当前哈希表存放的多少元素，用来计算当前的装填因子
    this.count = 0
    /**
     * loadFactor(装填因子) > 0.75 对数组进行扩容
     * loadFactor(装填因子) < 0.25 对数组进行减容
     */

    // 哈希表数组的总长度
    this.limit = 7


    // 方法
    // 哈希函数
    HashTable.prototype.hashFunc = function(str, size) {
        // 定义hashCode变量
        var hashCode = 0
    
        // 2. 霍纳算法，来计算hashCode值，37是常用的质数
        // eg: cats --> unicode编码
        for (var i = 0; i < str.length; i++) {
            hashCode = 37 * hashCode + str.charCodeAt(i)
        }
    
        // 3. 取余操作
        var index = hashCode % size
    
        return index
    }

    /**
     * 插入&修改
     * 1. 根据key获取索引值， 目的：将数据插入到对应的位置。
     * 
     * 2. 根据索引值取出桶（bucket）.
     *  2.1 如果桶不存在，创建桶，并且放置该索引的位置。
     * 
     * 3. 判断新增还是修改原来的值。
     *  3.1 如果已经有值了，那么就修改值。
     *  3.2 如果没有，执行后续的添加操作。
     * 
     * 4. 新增操作
     */
    HashTable.prototype.put = function(key, value) {
        // 1. 根据key获取对应的index
        var index  =this.hashFunc(key, this.limit)

        // 2. 根绝index取出对应的bucket
        var bucket = this.storage[index]

        // 3. 判断该bucket是否为null
        if (bucket === null || bucket === undefined) {
            bucket = []
            this.storage[index] = bucket
        }

        // 4. 判断是否是修改数据
        for (var i = 0; i < bucket.length; i++) {
            var tuple = bucket[i]

            if (tuple[0] === key) {
                tuple[1] = value
                return
            }
        }

        // 5. 进行添加操作
        bucket.push([key, value])
        this.count += 1

        // 6.判断是否需要扩容操作
        if (this.count > this.limit * 0.75) {
            // 重新计算质数
            var newSize = this.limit * 2
            var newPrime = this.getPrime(newSize)

            this.resize(newPrime)
        }
    }

    /**
     * 获取方法：get
     * 
     * 1. 根据key获取相应的index。
     * 2. 根据index获取对应的bucket。
     * 3. 判断bucket是否为null。
     *  3.1 如果为null。直接返回null。
     * 4. 线性查找bucket中每一个key是否等于传入的key。
     *  4.1 如果等于，那么直接返回对应的value。
     * 5. 遍历完后，依然没有找到对应的key，直接返回null。
     */
    HashTable.prototype.get = function(key) {
        // 1. 根据key获取相应的index。
        var index = this.hashFunc(key, this.limit)

        // 2. 根据index获取对应的bucket。
        var bucket = this.storage[index]

        // 3. 判断bucket是否为null。
        if (bucket === null || bucket === undefined) {
            return null
        }

        // 4. 有bucket，那么线性查找
        for (var i = 0; i < bucket.length; i++) {
            var tuple = bucket[i]
            
            if (tuple[0] === key) {
                return tuple[1]
            }
        }

        // 5. 依然没有找到，那么返回null
        return null
    }

    /**
     * 删除操作：remove
     * 
     * 1. 根据key获取相应的index。
     * 2. 根据index获取对应的bucket。
     * 3. 判断bucket是否存在，如果不存在，那么直接返回null。
     * 4. 线性查找bucket，寻找对应的数据，并且删除。
     * 5. 依然没有找到，直接返回null。 
     */
    HashTable.prototype.remove = function(key) {
        // 1. 根据key获取相应的index。
        var index = this.hashFunc(key, this.limit)

        // 2. 根据index获取对应的bucket。
        var bucket = this.storage[index]

        // 3. 判断bucket是否为null。
        if (bucket === null || bucket === undefined) {
            return null
        }

        // 4. 有bucket， 那么就进行线性查找，并且删除。
        for (var i = 0; i < bucket.length; i++) {
            var tuple = bucket[i]

            if (tuple[0] === key) {
                bucket.splice(i, 1)
                this.count -= 1

                // 缩小容量
                if (this.limit > 7 && this.count < this.limit * 0.25) {
                    // 重新计算质数
                    var newSize = Math.floor(this.limit / 2)
                    var newPrime = this.getPrime(newSize)

                    this.resize(newPrime)
                }

                return tuple[1]
            }
        }

        // 5. 依然没有找到，那么返回null
        return null
    }

    // 其他方法
    // 判断哈希表是否为null
    HashTable.prototype.isEmpty = function() {
        return this.count === 0
    }

    // 获取哈希表的长度
    HashTable.prototype.size = function() {
        return this.count
    }

    // 哈希表的扩容
    HashTable.prototype.resize = function(newLimit) {
        // 1. 保存旧的数组内容
        var oldStorage = this.storage

        // 2. 重置所有的属性
        this.storage = []
        this.count = 0
        this.limit = newLimit

        // 3. 遍历oldStorage的所有的bucket
        for (var i = 0; i < oldStorage.length; i++) {
            // 3.1 取出对应的bucket
            var bucket = oldStorage[i]

            // 3.2 判断bucket是否为null
            if (bucket === null || bucket === undefined) {
                continue
            }

            // 3.3 bucket中有数据，那么取出数据，重新插入
            for (var j = 0; j < bucket.length; j++) {
                var tuple = bucket[j]
                this.put(tuple[0], tuple[1])
            }
        }
    }

    // 判断某个数字是否是质数
    HashTable.prototype.isPrime = (num) => {
        // 1. 获取num的平方根
        var temp = parseInt(Math.sqrt(num))

        // 2. 循环判断
        for (var i = 2; i <= temp; i++) {
            if (num % i === 0) {
                return false
            }
        }

        return true
    }

    // 获取质数的方法
    HashTable.prototype.getPrime = function(num) {
        // 14 -> 17
        // 34 -> 37
        while(!this.isPrime(num)) {
            num++
        }

        return num
    }
}

// 测试哈希表
// 1. 创建哈希表
var ht = new HashTable()

// 2. 插入数据
ht.put('abc', '123')
ht.put('cba', '321')
ht.put('nba', '521')
ht.put('mba', '520')

// 3. 获取数据
console.log(ht.get('abc'))

// 4. 修改方法
ht.put('abc', '111')
console.log(ht.get('abc'))

// 5. 删除方法
ht.remove('abc')
console.log(ht.get('abc'))