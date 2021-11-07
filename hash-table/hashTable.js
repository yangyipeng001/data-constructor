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
}