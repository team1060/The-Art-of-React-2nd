# 08. Hooks

## 08-1. useState

useState는 가장 기본적인 Hook이며, 함수 컴포넌트에서도 가변적인 상태를 지닐 수 있게 해 줍니다. 함수 컴포넌트에서 상태를 관리해야 한다면 이 Hook을 사용하면 됩니다.

```jsx
import { useState } from "react";

const Counter = () => {
  const [value, setValue] = useState(0);
  return (
    <div>
      <p>
        현재 카운터 값은 <b>{value}</b> 입니다.
      </p>
      <button onClick={() => setValue(value + 1)}> +1 </button>
      <button onClick={() => setValue(value - 1)}> -1 </button>
    </div>
  );
};

export default Counter;
```

useState는 코드 상단에서 import 구문을 통해 불러오고, 다음과 같이 사용합니다.

> ```jsx
> const [value, setValue] = useState[0];
> ```

useState 함수의 파라미터에는 상태의 기본값을 넣어 줍니다. 현재 0을 넣어 주었는데, 결국 카운터의 기본값을 0으로 설정하겠다는 의미입니다.
이 함수가 호출되면 배열을 반환하는데요. 그 배열의 첫 번째 원소는 상태 값, 두 번째 원소는 상태를 설정하는 함수입니다.
이 함수에 파라미터를 넣어서 호출하면 전달받은 파라미터로 값이 바뀌고 컴포넌트가 정상적으로 리렌더링됩니다.

### (1) useState를 여러 번 사용하기

하나의 useState 함수는 하나의 상태 값만 관리할 수 있습니다. 컴포넌트에서 관리해야 할 상태가 여러 개라면 useState를 여러 번 사용하면 됩니다.

```jsx
import { useState } from "react";

const Info = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  return (
    <div>
      <div>
        <input value={name} onChange={onChangeName} />
        <input value={nickname} onChange={onChangeNickname} />
      </div>
      <div>
        <div>
          <b>이름:</b> {name}
        </div>
        <div>
          <b>닉네임:</b> {nickname}
        </div>
      </div>
    </div>
  );
};

export default Info;
```

## 08-2. useEffect

useEffect는 리액트 컴포넌트가 렌더링될 때마다 특정 작업을 수행하도록 설정할 수 있는 Hook입니다.
기존에 만들었던 Info 컴포넌트에 useEffect를 한번 적용해 보겠습니다.

```jsx
import { useState, useEffect } from "react";

const Info = () => {
  const [name, setName] = useState("");
  const [nickname, setNickname] = useState("");
  useEffect(() => {
    console.log("렌더링이 완료되었습니다.");
    console.log({
      name,
      nickname,
    });
  });

  const onChangeName = (e) => {
    setName(e.target.value);
  };
  const onChangeNickname = (e) => {
    setNickname(e.target.value);
  };

  return (
    <div>
      <div>
        <input value={name} onChange={onChangeName} />
        <input value={nickname} onChange={onChangeNickname} />
      </div>
      <div>
        <div>
          <b>이름:</b> {name}
        </div>
        <div>
          <b>닉네임:</b> {nickname}
        </div>
      </div>
    </div>
  );
};

export default Info;
```

결과물을 보면, 컴포넌트가 처음 나타났을 때 '렌더링이 완료되었습니다!' 라는 문구가 두 번 출력이 되었습니다.
이는 React.StrictMode가 적용된 개발 환경에서만 발생하는 현상인데요. useEffect를 사용한 코드에 문제가 있는지 없는지 감지하기 위하여 두 번 실행이 된다고 합니다.
컴포넌트가 나타날 때 useEffect가 두 번 실행이 되어도 컴포넌트 작동 방식에 문제가 없어야 추후 호환이 제대로 이루어진다고 합니다.

### (1) 마운트될 때만 실행하고 싶을 때

useEffect에서 설정한 함수를 컴포넌트가 화면에 맨 처음 렌더링될 때만 실행하고, 업데이트될 때는 실행하지 않으려면 함수의 두 번째 파라미터로 비어 있는 배열을 넣어 주면 됩니다.

> ```jsx
> useEffect(() => {
>   console.log("마운트될 때만 실행됩니다.");
> }, []);
> ```

### (2) 특정 값이 업데이트될 때만 실행하고 싶을 때

useEffect를 사용할 때, 특정 값이 변경될 때만 호출하고 싶을 경우도 있겠지요? 이러한 작업을 useEffect에서 해야 한다면, 어떻게 해야 할까요?

> ```jsx
> useEffect(() => {
>   console.log(name);
> }, [name]);
> ```

대부분의 경우, useEffect를 사용할 때는 이렇게 배열에 의존하는 값을 넣어줍니다. 빈 배열이나 의존 값이 들어있는 배열을 넣는 경우는 있어도, 배열을 아예 생략하는 상황은 거의 없다고 생각하면 됩니다.

### (3) 뒷정리하기

useEffect는 기본적으로 렌더링되고 난 직후마다 실행되며, 두번째 마라미터 배열에 무엇을 넣는지에 따라 실행되는 조건이 달라집니다.
컴포넌트가 언마운트되기 전이나 업데이트되기 직전에 어떠한 작업을 수행하고 싶다면 useEffect에서 뒷정리(cleanup) 함수를 반환해주어야 합니다.

> ```jsx
> useEffect(() => {
>   console.log("effect");
>   console.log(name);
>   return () => {
>     console.log("cleanup");
>     console.log(name);
>   };
> }, [name]);
> ```

```jsx
"cleanup" : 12
"effect" : 123
```

이제 App 컴포넌트에서 Info 컴포넌트의 가시성을 바꿀 수 있게 해 봅시다. 이번에도 useState를 사용하여 상태를 관리해 보세요!

```jsx
import { useState } from "react";
import Info from "./Info";

function App() {
  const [visible, setVisible] = useState(false);
  return (
    <div>
      <button
        onClick={() => {
          setVisible(!visible);
        }}
      >
        {visible ? "숨기기" : "보이기"}
      </button>
      <hr />
      {visible && <Info />}
    </div>
  );
}

export default App;
```

현재 React.StrictMode가 활성화되어 있기 때문에, 보이기 버튼을 눌렀을 때 컴포넌트가 두 번 마운트되면서 effect, cleanup, effect가 출력됩니다.
그 다음에 숨기기를 누르면 컴포넌트가 언마운트되면서 cleanup이 호출됩니다.

렌더링될 때마다 뒷정리 함수가 계속 나타나는 것을 확인할 수 있습니다. 그리고 뒷정리 함수가 호출될 때는 업데이트되기 직전의 값을 보여 줍니다.
오직 언마운트될 때만 뒷정리 함수를 호출하고 싶다면 useEffect 함수의 두 번째 파라미터에 비어 있는 배열을 넣으면 됩니다.

> ```jsx
> useEffect(() => {
>   console.log("effect");
>   return () => {
>     console.log("unmount");
>   };
> }, []);
> ```

## 08-3. useReducer

useReducer는 useState보다 더 다양한 컴포넌트 상황에 따라 다양한 상태를 다른 값으로 업데이트해 주고 싶을 때 사용하는 Hook입니다.
리듀서는 현재 상태, 그리고 업데이트를 위해 필요한 정보를 담은 액션 값을 전달받아 새로운 상태를 반환하는 함수입니다.
리듀서 함수에서 새로운 상태를 만들 때는 반드시 불변성을 지켜주어야 합니다.

> ```jsx
> function reducer(state, action) {
>   return { ... }; // 불변성을 지키면서 업데이트한 새로운 상태를 반환합니다.
> }
> ```

액션 값은 주로 다음과 같은 형태로 이루어져 있습니다.

> ```jsx
> {
>   type: 'INCREAMENT',
>   // 다른 값들이 필요하다면 추가로 들어감
> }
> ```

17장에서 다룰 리덕스에서 사용하는 액션 객체에는 어떤 액션인지 알려주는 type 필드가 꼭 있어야 하지만, useReducer에서 사용하는 액션 객체는 반드시 type을 지니고 있을 필요가 없습니다.
심지어 객체가 아니라 문자열이나 숫자여도 상관없습니다.

### (1) 카운터 구현하기

먼저 useReducer를 사용하여 기존의 Counter 컴포넌트를 다시 구현해 보세요.

```jsx
import { useReducer } from "react";

function reducer(state, action) {
  // action.type에 따라 다른 작업 수행
  switch (action.type) {
    case "INCREMENT":
      return { value: state.value + 1 };
    case "DECREMENT":
      return { value: state.value - 1 };
    default:
      // 아무것도 해당되지 않을 때 기존 상태 반환
      return state;
  }
}

const Counter = () => {
  const [state, dispatch] = useReducer(reducer, { value: 0 });

  return (
    <div>
      <p>
        현재 카운터 값은 <b>{state.value}</b> 입니다.
      </p>
      <button onClick={() => dispatch({ type: "INCREMENT" })}> +1 </button>
      <button onClick={() => dispatch({ type: "DECREMENT" })}> -1 </button>
    </div>
  );
};

export default Counter;
```

useReducer의 첫 번째 파라미터에는 리듀서 함수를 넣고, 두 번째 파라미터에는 해당 리듀서의 기본값을 넣어줍니다.
이 Hook을 사용하면 state 값과 dispatch 함수를 받아 오는데요.

여기서 state는 현재 가리키고 있는 상태고, dispatch는 액션을 발생시키는 함수입니다.
dispatch(action)과 같은 형태로, 함수 안에 파라미터로 액션 값을 넣어 주면 리듀서 함수가 호출되는 구조입니다.

useReducer를 사용했을 때의 가장 큰 장점은 컴포넌트 업데이트 로직을 컴포넌트 바깥으로 빼낼 수 있다는 것입니다.

### (2) 인풋 상태 관리하기

이번에는 useReducer를 사용하여 Info 컴포넌트에서 인풋 상태를 관리해 보겠습니다. 기존에는 인풋이 여러 개여서 useState를 여러 번 사용했는데요.
useReducer를 사용하면 기존에 클래스형 컴포넌트에서 input 태그에 name 값을 할당하고 e.target.name을 참조하여 setState를 해 준 것과 유사한 방식으로 작업을 처리할 수 있습니다.

```jsx
import { useState, useReducer } from "react";

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

const Info = () => {
  const [state, dispatch] = useReducer(reducer, {
    name: "",
    nickname: "",
  });
  const { name, nickname } = state;

  const onChange = (e) => {
    dispatch(e.target);
  };

  return (
    <div>
      <div>
        <input name="name" value={name} onChange={onChange} />
        <input name="nickname" value={nickname} onChange={onChange} />
      </div>
      <div>
        <div>
          <b>이름:</b> {name}
        </div>
        <div>
          <b>닉네임:</b> {nickname}
        </div>
      </div>
    </div>
  );
};

export default Info;
```

useReducer에서의 액션은 그 어떤 값도 사용 가능합니다. 그래서 이번에는 이벤트 객체가 지니고 있는 e.target 값 자체를 액션 값으로 사용했습니다.
이런 식으로 인풋을 관리하면 아무리 인풋의 개수가 많아져도 짧고 깔끔하게 유지할 수 있습니다.

## 08-4. useMemo

useMemo를 사용하면 함수 컴포넌트 내부에서 발생하는 연산을 최적화할 수 있습니다. 먼저 리스트에 숫자를 추가하면 추가된 숫자들의 평균을 보여 주는 함수 컴포넌트를 작성해 봅시다.

```jsx
import { useState } from "react";

const getAverage = (numbers) => {
  console.log("평균값 계산 중 ..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");

  const onChange = (e) => {
    setNumber(e.target.value);
  };

  const onInsert = (e) => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
  };
  return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값:</b> {getAverage(list)}
      </div>
    </div>
  );
};

export default Average;
```

이 때 숫자를 등록할 때 뿐만 아니라 인풋 내용이 수정될 때도 getAverage 함수가 호출되는 확일할 수 있습니다. 인풋 내용이 바뀔 때는 평균값을 다시 계산할 필요가 없는데, 이렇게 렌더링할 때마다 계산 하는 것은 낭비겠지요?

useMemo를 사용하면 이러한 작업을 최적화 할 수 있습니다. 렌더링하는 과정에서 특정 값이 바뀌었을 때만 연산을 실행하고, 원하는 값이 바뀌지 않았다면 이전에 연산했던 결과를 다시 사용하는 방식입니다.

```jsx
import { useState, useMemo } from "react";

const getAverage = (numbers) => {
  console.log("평균값 계산 중 ..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");

  const onChange = (e) => {
    setNumber(e.target.value);
  };

  const onInsert = (e) => {
    const nextList = list.concat(parseInt(number));
    setList(nextList);
    setNumber("");
  };

  const avg = useMemo(() => getAverage(list), [list]);
  return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값:</b> {avg}
      </div>
    </div>
  );
};

export default Average;
```

이제 list 배열의 내용이 바뀔 때만 getAverage 함수가 호출됩니다.

## 08-5. useCallback

useCallback은 useMemo와 상당히 비슷한 함수입니다. 주로 렌더링 성능을 최적화해야 하는 상황에서 사용하는데요, 이 Hook을 사용하면 만들어 놨던 함수를 재사용할 수 있습니다.

방금 구현한 Average 컴포넌트에서 onChange와 onInsert라는 함수를 선언해 주었지요? 이렇게 선언하면 컴포넌트가 리렌더링될 때마다 새로 만들어진 함수를 사용하게 됩니다. 대부분의 경우 이러한 방식이 문제없지만, 컴포넌트의 렌더링이 자주 발생하거나, 렌더링해야 할 컴포넌트의 개수가 많아지면 이 부분을 최적화해주는 것이 좋습니다.

```jsx
import { useState, useMemo, useCallback } from "react";

const getAverage = (numbers) => {
  console.log("평균값 계산 중 ..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");

  const onChange = useCallback((e) => {
    setNumber(e.target.value);
  }, []); // 컴포넌트가 처음 렌더링될 때만 함수 생성

  const onInsert = useCallback(
    (e) => {
      const nextList = list.concat(parseInt(number));
      setList(nextList);
      setNumber("");
    },
    [number, list]
  ); // number 또는 list가 바뀌었을 때만 함수 생성

  const avg = useMemo(() => getAverage(list), [list]);

  return (
    <div>
      <input value={number} onChange={onChange} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값:</b> {avg}
      </div>
    </div>
  );
};

export default Average;
```

useCallback의 첫 번째 파라미터에는 생성하고 싶은 함수를 넣고, 두 번째 파라미터에는 배열을 넣으면 됩니다. 이 배열에는 어떤 값이 바뀌었을 때 함수를 새로 생성해야 하는지 명시해야 합니다.

onChange처럼 비어 있는 배열을 넣게 되면 컴포넌트가 렌더링될 때 만들었던 함수를 계속해서 재사용하게 되며,
onInsert처럼 배열 안에 number, list를 넣게 되면 인풋 내용이 바뀌거나 새로운 항목이 추가될 때 새로 만들어진 함수를 사용하게 됩니다.

함수 내부에서 상태 값에 의존해야 할 때는 그 값을 반드시 두 번째 파라미터 안에 포함시켜 주어야 합니다.
예를 들어 onChange의 경우 기존의 값을 조회하지 않고 바로 설정만 하기 때문에 배열이 비어 있어도 상관없지만,
onInsert는 기존의 number와 list를 조회해서 nextList를 생성하기 때문에 배열 안에 number와 list를 꼭 넣어 주어야 합니다.

## 08-6. useRef

useRef Hook은 함수 컴포넌트에서 ref를 쉽게 사용할 수 있도록 해 줍니다. Average 컴포넌트에서 등록 버튼을 눌렀을 때 포커스가 인풋 쪽으로 넘어가도록 코드를 작성해 보겠습니다.

```jsx
import { useState, useMemo, useCallback, useRef } from "react";

const getAverage = (numbers) => {
  console.log("평균값 계산 중 ..");
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((a, b) => a + b);
  return sum / numbers.length;
};

const Average = () => {
  const [list, setList] = useState([]);
  const [number, setNumber] = useState("");
  const inputEl = useRef(null);

  const onChange = useCallback((e) => {
    setNumber(e.target.value);
  }, []); // 컴포넌트가 처음 렌더링될 때만 함수 생성

  const onInsert = useCallback(
    (e) => {
      const nextList = list.concat(parseInt(number));
      setList(nextList);
      setNumber("");
      inputEl.current.focus();
    },
    [number, list]
  ); // number 또는 list가 바뀌었을 때만 함수 생성

  const avg = useMemo(() => getAverage(list), [list]);

  return (
    <div>
      <input value={number} onChange={onChange} ref={inputEl} />
      <button onClick={onInsert}>등록</button>
      <ul>
        {list.map((value, index) => (
          <li key={index}>{value}</li>
        ))}
      </ul>
      <div>
        <b>평균값:</b> {avg}
      </div>
    </div>
  );
};

export default Average;
```

### (1) 로컬 변수 사용하기

추가로 컴포넌트 로컬 변수를 사용해야 할 때도 useRef를 활용할 수 있습니다. 여기서 로컬 변수란 렌더링과 상관 없이 바뀔 수 있는 값을 의미합니다.

```jsx
import { useRef } from "react";

const RefSmaple = () => {
  const id = useRef(1);
  const setId = (n) => {
    id.current = n;
  };
  const printId = () => {
    console.log(id.current);
  };
  return <div>RefSmaple</div>;
};

export default RefSmaple;
```

이렇게 ref 값이 바뀌어도 컴포넌트가 렌더링되지 않는다는 점에는 주의해야 합니다. 렌더링과 관련되지 않은 값을 관리할 때만 이러한 방식으로 코드를 작성하세요.

## 08-7. 커스텀 Hooks 만들기

여러 컴포넌트에서 비슷한 기능을 공유할 경우, 이를 본인만의 Hook으로 작성하여 로직을 재사용할 수 있습니다.
기존에 Info 컴포넌트에서 여러 개의 인풋을 관리하기 위해 useReducer로 작성했던 로직을 useInputs라는 Hook으로 따로 분리해 보겠습니다.

```jsx
import { useReducer } from "react";

function reducer(state, action) {
  return {
    ...state,
    [action.name]: action.value,
  };
}

export default function useInputs(initialForm) {
  const [state, dispatch] = useReducer(reducer, initialForm);

  const onChange = (e) => {
    dispatch(e.target);
  };

  return [state, onChange];
}
```

이 Hook을 Info 컴포넌트에서 사용해 보겠습니다.

```jsx
import useInputs from "./custom/useInputs";

const Info = () => {
  const [state, onChange] = useInputs({
    name: "",
    nickname: "",
  });
  const { name, nickname } = state;

  return (
    <div>
      <div>
        <input name="name" value={name} onChange={onChange} />
        <input name="nickname" value={nickname} onChange={onChange} />
      </div>
      <div>
        <div>
          <b>이름:</b> {name}
        </div>
        <div>
          <b>닉네임:</b> {nickname}
        </div>
      </div>
    </div>
  );
};

export default Info;
```

이렇게 하면 훨씬 깔끔해진 것을 확인할 수 있습니다.

## 08-8. 정리

리액트에서 Hooks 패턴을 사용하면 대부분의 기능을 구현할 수 있습니다.

다른 개발자가 만든 다양한 Hooks 리스트는 다음 링크에서 확인할 수 있습니다.

- [1](https://nikgraf.github.io/react-hooks)
- [2](https://github.com/rehooks/awesome-react-hooks)
