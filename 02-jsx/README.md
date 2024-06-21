# 02. JSX

```jsx title="JSX"
// import : 특정 파일을 불러오는 것
import "./App.css";

function App() {
  const name = "리액트";
  return (
    <div className="App">
      <>
        <h1>{name} 안녕!</h1>
        <h2>잘 작동하니?</h2>
      </>
    </div>
  );
}

export default App;
```

```jsx title="조건부 연산자"
import "./App.css";

function App() {
  const name = "리액트";
  return (
    <div className="App">
      {name === "리액트" ? <h1>리액트입니다.</h1> : <h1>리액트가 아닙니다.</h1>}
    </div>
  );
}

export default App;
```

```jsx title="조건부 연산자 2"
import "./App.css";

function App() {
  const name = "리액트";
  return (
    <div className="App">{name === "리액트" && <h1>리액트입니다.</h1>}</div>
  );
}

export default App;
```

```jsx title="undefined"
import "./App.css";

function App() {
  const name = undefined;
  return <div className="App">{name || "값이 undefined입니다"}</div>;
}

export default App;
```

```jsx title="주석"
import "./App.css";

function App() {
  return (
    <div className="App">
      <h1>주석</h1>
      {/* 주석은 이렇게 작성합니다. */}
      /* 이런 주석은 보여요 */
    </div>
  );
}

export default App;
```
