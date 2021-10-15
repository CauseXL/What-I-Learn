import * as React from 'react';
import { FC, useState, useCallback } from 'react';

interface CompProps {
  name: string;
}

const getDefaultUser = () => {
  console.log(123);
  return {
    gender: 'xx',
    age: 30,
  };
};

export const Comp: FC<CompProps> = ({ name }) => {
  /** 自动推导类型 */
  const [isLoading, setIsloading] = useState(false);
  const [user] = useState(() => getDefaultUser());

  const showUser = useCallback((obj: typeof user) => {
    console.log(321);
    return `My gender is ${obj.gender}, My age is ${obj.age}`;
  }, []);

  /**
   * Event 事件对象类型
   * ClipboardEvent<T = Element> 剪切板事件对象
   * DragEvent<T =Element> 拖拽事件对象
   * ChangeEvent<T = Element> Change事件对象
   * KeyboardEvent<T = Element> 键盘事件对象
   * MouseEvent<T = Element> 鼠标事件对象
   * TouchEvent<T = Element> 触摸事件对象
   * WheelEvent<T = Element> 滚轮时间对象
   * AnimationEvent<T = Element> 动画事件对象
   * TransitionEvent<T = Element> 过渡事件对象
   */
  const handleClick = useCallback<React.MouseEventHandler<HTMLButtonElement>>(
    (e) => {
      console.log(e.type);
    },
    []
  );

  /**
   * 如果不太关心事件的类型，可以直接使用 React.SyntheticEvent (合成事件)
   * 如果目标表单有想要访问的自定义命名输入，可以使用类型扩展
   */
  const handleSubmit = (e: React.SyntheticEvent) => {
    const target = e.target as typeof e.target & {
      /** 类型扩展 */
      age: { value: number };
    };
    const age = target.age.value;
  };

  return (
    <div>
      <h3>Hello, {name}</h3>
      <button onClick={handleClick}>click</button> {isLoading.toString()}
      <p>user: {showUser(user)}</p>
      <AlertButton>alert</AlertButton>
      <Button onSubmit={handleSubmit}>submit</Button>
    </div>
  );
};

const App: React.FC<{}> = () => 'hello' as unknown as JSX.Element;

/**
 * 某些场景下我们在引入第三方的库时会发现想要使用的组件并没有导出我们需要的组件参数类型或者返回值类型，
 * 这时候我们可以通过 ComponentProps/ ReturnType 来获取到想要的类型。
 */
import { Button } from 'antd'; // 但是未导出props type

// ！====== 获取参数类型

type ButtonProps = React.ComponentProps<typeof Button>;

type AlertButtonProps = Omit<ButtonProps, 'onClick'>;

const AlertButton: FC<AlertButtonProps> = (props) => {
  return <Button onClick={() => alert('hello')} {...props} />;
};

// ！====== 获取返回值

function foo() {
  return { baz: 1 };
}

type FooReturn = ReturnType<typeof foo>;

// ====== TS 练习

const defaultUser = {
  gender: 'xx',
  age: 30,
};

type UserWithName = CompProps &
  (ReturnType<typeof getDefaultUser> | typeof defaultUser);

const user: UserWithName = {
  gender: 'xx',
  age: 30,
  name: 'yy',
};

// ======

/**
 * 使用Type还是Interface？
 * 有几种常用规则：
 * 在定义公共 API 时(比如编辑一个库）使用 interface，这样可以方便使用者继承接口
 * 在定义组件属性（Props）和状态（State）时，建议使用 type，因为 type的约束性更强
 * type 在使用的过程中，hover 对应类型会有detail展示
 */

// ======

const id1: <T>(arg: T) => T = (arg) => arg;

function id2<T>(arg: T): T {
  return arg;
}
