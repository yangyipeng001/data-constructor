/**
 * 给定一个 32 位有符号整数，将整数中的数字进行反转。要求如下：
 * 1.只翻转数字，符号位不进行翻转。
 * 2.假设我们的环境只能存储 32 位有符号整数，其数值范围是\small [-2^{31}, 2^{31}-1]。如果反转后的整数溢出，则返回 0。
 * 3.不能借助JS原生的 reverse 函数。
 * 
 * 示例1：
 * 输入：x = 123
 * 输出：321
 * 
 * 示例2：
 * 输入：x = -123
 * 输出：-321
 * 
 * 示例3：
 * 输入：x = 120
 * 输出：21
 * 
 * 示例4：
 * 输入：x = 0
 * 输出：0
 */

var reverse = function(x) {
    var resArr = []
    var str = x.toString()

    for (var i = str.length - 1; i >= 0; i--) {
        resArr.push(str[i])
    }

    if (str[0] === '-') {
        resArr.unshift(str[0])
    }

    var resultNum = parseInt(resArr.join(''))

    if (resultNum <= Math.pow(-31) || resultNum >= Math.pow(31)) {
        return 0
    }

    return resultNum
};

console.log(reverse(-120))