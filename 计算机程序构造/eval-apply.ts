/** 
 * - https://github.com/1eeing/Nvwa.js
 * @param node  当前遍历的AST树节点
 * @param scope 当前环境
 */
const evaluate = (node, scope) => {
  const evalFunc = evaluateMap[node.type];
  if (!evalFunc) throw `${node.loc} ${node.type} 还未实现`;
  return evalFunc(node, scope);
}

/** 
 * evaluateMap 是所有实现的节点类型集合
 * 根据 @babel/types 我们可以把节点类型分为几类：
 * File
 * Program
 * Identifier （标识符）当遍历到这类节点时，需要从环境中取值
 * Literal    （字面量）当遍历到这类节点时，直接返回值即可
 * Statement  （语句）  当遍历到这类节点时，就要根据环境去执行语句了。会递归调用evaluate来计算语句中的每一部分
 * Expression （表达式）当遍历到这类节点时，跟Statement类似，需要去递归计算每一部分，然后执行对应的表达式
 * Declaration (声明)  当遍历到这类节点时，需要在scope中完成声明。声明分为两类，函数声明和变量声明
 */
const evaluateMap = {
  File(node, scope) {
    evaluate(node.program, scope);
  },

  Program(node, scope) {
    for (const n of node.body) {
      evaluate(n, scope);
    }
  },

  /** 
   * var a = 'hello';
   * console.log(a);
   * 这个a对应的ast树节点类型就是Identifier类型
   */
  Identifier(node, scope) {
    const $var = scope.$find(node.name);
    if (!$var) throw `[Error] ${node.loc}, '${node.name}' 未定义`;
    return  $var.$get();
  },

  StringLiteral(node, scope) {
    return node.value;
  },

  NumericLiteral(node, scope) {
    return node.value;
  },

  BooleanLiteral(node, scope) {
    return node.value;
  },

  NullLiteral(node, scope) {
    return null;
  },

  FunctionDeclaration(node, scope) {
    const func = evaluateMap.FunctionExpression(node, scope);
    scope.$var(node.id.name, func);
  },

  FunctionExpression(node, scope) {
    
  },

  VariableDeclaration(node, scope) {
    const { kind, declarations } = node;
    for (const decl of declarations) {
      const varName = decl.id.name;
      const value = decl.init ? evaluate(decl.init, scope) : void 0;
      if (!scope.$define(kind, varName, value)) {
        throw `[Error] ${varName} 重复定义`
      }
    }
  },

  IfStatement(node, scope) {
    if (evaluate(node.test, scope)) {
      return evaluate(node.consequent, scope);
    }

    if (node.alternate) {
      const ifScope = new Scope('block', scope, true);
      return evaluate(node.alternate, ifScope)
    }
  },

  LogicalExpression(node, scope) {
    const { left, right, operator } = node;
    const expressionMap = {
      '&&': () => evaluate(left, scope) && evaluate(right, scope),
      '||': () => evaluate(left, scope) || evaluate(right, scope),
    }
    return expressionMap[operator]();
  }
};

class Scope {
  public readonly variables = Object.create(null);
  constructor(
    private readonly scopeType,
    private parent = null,
    public readonly shared = false,
  ) {}
}














