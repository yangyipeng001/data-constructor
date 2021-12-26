/**
 * 资料：https://juejin.cn/post/6844904063650234375
 * 
 * 先序：考察到一个节点后，即刻输出该节点的值，并继续遍历其左右子树。(根左右)
 * 中序：考察到一个节点后，将其暂存，遍历完左子树后，再输出该节点的值，然后遍历右子树。(左根右)
 * 后序：考察到一个节点后，将其暂存，遍历完左右子树后，再输出该节点的值。(左右根)
 * 
 * 
 * 二叉树的中序遍历
 * 
 * 给定一个二叉树的根节点 root ，返回它的 中序 遍历。
 * 
 * 示例1：
 *  输入：root = [1,null,2,3]
 *  输出：[1,3,2]
 * 
 * 示例2：
 *  输入：root = []
 *  输出：[]
 * 
 * 示例3：
 *  输入：root = [1]
 *  输出：[1]
 * 
 * 示例4：
 *  输入：root = [1,2]
 *  输出：[2,1]
 * 
 * 示例5：
 *  输入：root = [1,null,2]
 *  输出：[1,2]
 * 
 */

function TreeNode(val, left, right) {
    this.val = (val===undefined ? 0 : val)
    this.left = (left===undefined ? null : left)
    this.right = (right===undefined ? null : right)
}

var inorderTraversal = function(root) {
    const res = [];

    // 递归函数
    function _inorder(node) {
      if (!node) return;

      _inorder(node.left);

      res.push(node.val);

      _inorder(node.right);
    }

    _inorder(root);

    return res;
};

console.log(inorderTraversal)