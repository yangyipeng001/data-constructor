/**
 * 质数
 * 
 * 封装函数：判断传入的数字是否为质数
 * 特点：只能被1和自己整除，不能被2到num-1之间的数字整除
 * 效率不是很高
 */
// function isPrime(num) {
//     for (var i = 2; i < num; i++) {
//         if (num % i === 0) {
//             return false
//         }
//     }

//     return true
// }

// 优质 - 判断传入的数字是否为质数
function isPrime(num) {
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



// 验证函数
console.log(isPrime(3))
console.log(isPrime(11))
console.log(isPrime(123))
console.log(isPrime(41))