/**
 * 合并两个有序链表
 * 
 * 将两个升序链表合并为一个新的 升序 链表并返回。新链表是通过拼接给定的两个链表的所有节点组成的。 
 * 
 * 示例 1：
 *  输入：l1 = [1,2,4], l2 = [1,3,4]
 *  输出：[1,1,2,3,4,4]
 * 
 * 示例 2：
 *  输入：l1 = [], l2 = []
 *  输出：[]
 * 
 * 示例 3：
 *  输入：l1 = [], l2 = [0]
 *  输出：[0]
 */

/**
 * 解题思路：
 * 1、新建一个空链表curr
 * 2、当l1和l2都不为空时，判断l1和l2的值的大小，如果l1.val < l2.val,那么将curr.next指向l1，并且将l1的节点后移一位，否则将curr.next指向l2，并且将l2的节点后移一位
 * 3、第2步循环结束时将curr的节点后移一位
 * 4、当l1和l2有一个为空时，将不为空的那个链表剩余的节点连接至curr.next
 * 5、操作结束返回链表curr即可
 */

/**
 * 结果链表：
 * 1 -> 1 -> 2 -> 3 -> 4 -> 4
 */

function ListNode(val, next) {
    this.val = (val === undefined ? 0 : val)
    this.next = (next === undefined ? null : next)
}


var mergeTwoLists = function(l1, l2) {
    var curr = new ListNode();

    while (l1 !== null && l2 !== null ) {
        if (l1.val < l2.val) {
            curr.next = l1;
            l1 = l1.next;
        }
        else {
            curr.next = l2;
            l2 = l2.next;
        }

        curr = curr.next;
    }

    if (l1 === null) {
        curr.next = l2;
    }

    if (l2 === null) {
        curr.next = l1;
    }

    return curr
}