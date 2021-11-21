/**
 * 图论
 * 
 * 封装图的结构
 */

// 创建字典的构造函数
function Dictionay() {
    // 字典属性
    this.items = {}

    // 字典的操作方法
    // 在字典中添加键值对
    Dictionay.prototype.set = function(key, value) {
        this.items[key] = value
    }

    // 判断字典中是否含有某个key
    Dictionay.prototype.has = function(key) {
        return this.items.hasOwnProperty(key)
    }

    // 从字典中移除元素
    Dictionay.prototype.remove = function(key) {
        // 1.判断字典中是否含有这个key
        if (!this.has(key)) {
            return false
        }

        // 从字典中移除key
        delete this.items[key]

        return true
    }

    // 根据key去获取value
    Dictionay.prototype.get = function(key) {
        return this.has(key) ? this.items[key] : undefined
    }

    // 获取所有的keys
    Dictionay.prototype.keys = function() {
        return Object.keys(this.items)
    }
}

// 封装队列 - 基于数组实现
function Queue() {
    // 属性
    this.items = []

    // 方法
    // 1. 将元素加入到队列中
    Queue.prototype.enqueue = function(element) {
        this.items.push(element)
    }

    // 2. 从队列中删除前端元素
    Queue.prototype.dequeue = function() {
        return this.items.shift()
    }

    // 3. 查看前端元素
    Queue.prototype.front = function() {
        return this.items[0]
    }

    // 4. 查看队列是否为空
    Queue.prototype.isEmpty = function() {
        return this.items.length === 0
    }

    // 5. 查看队列中元素的个数
    Queue.prototype.size = function() {
        return this.items.length
    }

    // 6. toString
    Queue.prototype.toString = function() {
        var resultString = ''
        for(var i = 0; i < this.items.length; i++) {
            resultString += this.items[i] + ' '
        }

        return resultString
    }
}

function Graph() {
    // 属性：顶点（数组）/ 边（字典）
    // 顶点
    this.vertexes = []
    // 边
    this.edges = new Dictionay()

    // 方法
    // 1. 添加方法
    // 1.1 添加顶点的方法
    Graph.prototype.addVertex = function(v) {
        this.vertexes.push(v)
        this.edges.set(v, [])
    }

    // 1.2 添加边的方法
    Graph.prototype.addEdge = function(v1, v2) {
        this.edges.get(v1).push(v2)
        this.edges.get(v2).push(v1)
    }

    // 2. 实现toString方法
    Graph.prototype.toString = function() {
        // 1. 定义字符串，保存最终结果
        var resultString = ''

        // 2. 遍历所有的顶点，以及顶点对应的边
        for (var i = 0; i < this.vertexes.length; i++) {
            resultString += this.vertexes[i] + '->'
            var vEdges = this.edges.get(this.vertexes[i])

            for (var j = 0; j < vEdges.length; j++) {
                resultString += vEdges[j] + ' '
            }

            resultString += '\n'
        }

        return resultString
    }

    // 遍历
    // 初始化状态颜色
    Graph.prototype.initializeColor = function() {
        var colors = []

        for (var i = 0; i < this.vertexes.length; i++) {
            colors[this.vertexes[i]] = 'white'
        }

        return colors
    }

    // 实现广度优先搜索(BFS)
    Graph.prototype.bfs = function(initV, handler) {
        // 1.初始化颜色
        var colors = this.initializeColor()

        // 2.创建队列
        var queue = new Queue()

        // 3.将顶点加入到队列中
        queue.enqueue(initV)

        // 4.循环从队列中取出
        while(!queue.isEmpty()) {
            // 4.1 从队列中取出一个顶点
            var v = queue.dequeue()

            // 4.2 获取和顶点相连的另外的顶点
            var vList = this.edges.get(v)

            // 4.3 将v的颜色设置为灰色
            colors[v] = 'gray'

            // 4.4 遍历所有的节点，并且加入到队列中
            for (var i = 0; i < vList.length; i++) {
                var e = vList[i]

                if (colors[e] === 'white') {
                    colors[e] = 'gray'
                    queue.enqueue(e)
                }
            }

            // 4.5 访问节点
            handler(v)

            // 4.6 将顶点设置为黑色
            colors[v] = 'black'

        }
    }

    // 实现深度优先搜索(DFS)
    Graph.prototype.dfs = function(initV, handler) {
        // 1. 初始化颜色
        var colors = this.initializeColor()

        // 2. 从某个顶点依次开始递归访问
        this.dfsVList(initV, colors, handler)
    }
    Graph.prototype.dfsVList = function(v, colors, handler) {
        // 1. 将颜色设置为灰色
        colors[v] = 'gray'

        // 2. 处理v顶点
        handler(v)

        // 3. 访问v相连的顶点
        var vList = this.edges.get(v)
        for (var i = 0; i < vList.length; i++) {
            var e = vList[i]

            if (colors[e] === 'white') {
                this.dfsVList(e, colors, handler)
            }
        }

        // 4. 将v设置为黑色
        colors[v] = 'black'
    }
}

// 测试代码
// 1. 创建图结构
var g = new Graph()

// 2.添加顶点
var myVertexes = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I']
for (var i = 0; i < myVertexes.length; i++) {
    g.addVertex(myVertexes[i])
}

// 3. 添加边
g.addEdge('A', 'B')
g.addEdge('A', 'C')
g.addEdge('A', 'D')
g.addEdge('C', 'D')
g.addEdge('C', 'G')
g.addEdge('D', 'G')
g.addEdge('D', 'H')
g.addEdge('B', 'E')
g.addEdge('B', 'F')
g.addEdge('E', 'I')

// 4. 测试结果
// console.log(g.toString())
/**
 * A->B C D 
 * B->A E F 
 * C->A D G 
 * D->A C G H 
 * E->B I 
 * F->B 
 * G->C D 
 * H->D 
 * I->E 
 */

// 5. 测试bfs
// var result = ''
// g.bfs(g.vertexes[0], function(v) {
//     result += v + ' '
// })
// console.log(result)

// 6. 测试dfs
var result = ''
g.dfs(g.vertexes[0], function(v) {
    result += v + ' '
})
console.log(result)
