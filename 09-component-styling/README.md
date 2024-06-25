# 09. 컴포넌트 스타일링

리액트에서 컴포넌트를 스타일링할 때는 다양한 방식을 사용할 수 있습니다. 이 장에서 알아볼 스타일링 방식은 다음과 같습니다.

- 일반 CSS : 컴포넌트를 스타일링하는 가장 기본적인 방식입니다.
- Sass : 자주 사용되는 CSS 전처리기 중 하나로 확장된 CSS 문법을 사용하여 CSS 코드를 더욱 쉽게 작성할 수 있도록 해줍니다.
- CSS Module : 스타일을 작성할 때 CSS 클래스가 다른 CSS 클래스의 이름과 절대 충돌하지 않도록 파일마다 고유한 이름을 자동으로 생성해 주는 옵션입니다.
- styled-components : 스타일을 자바스크립트 파일에 내장시키는 방식으로 스타일을 작성함과 동시에 해당 스타일이 적용된 컴포넌트를 만들 수 있게 해 줍니다.

## 09-1. 일반 CSS

### (1) 이름 짓는 규칙

프로젝트에 자동 생성된 App.css를 읽어 보면 클래스 이름이 컴포넌트 이름-클래스 형태로 지어져 있습니다. 클래스 이름에 컴포넌트 이름을 포함시킴으로써 다른 컴포넌트에서 실수로 중복되는 클래스를 만들어 사용하는 것을 방지할 수 있죠. 비슷한 방식으로 BEM 네이밍이라는 방식도 있습니다. 이름을 지을 때 일종의 규칙을 준수하여 해당 클래스가 어디에서 어떤 용도로 사용되는지 명확하게 작성하는 방식입니다. 예를 들어 .card\_\_tilte-primary처럼 말이죠.

### (2) CSS Selector

CSS Selector를 사용하면 CSS 클래스가 특정 클래스 내부에 있는 경우에만 스타일을 적용할 수 있습니다. 예를 들어 .App 안에 들어있는 .logo에 스타일을 적용하고 싶다면 다음과 같이 작성하면 됩니다.

> ```css
> .App .logo {
>   animation: App-logo-spin infinite 20s linear;
>   height: 40vmin;
> }
> ```

이런 식으로 컴포넌트의 최상위 html 요소에는 컴포넌트의 이름으로 클래스 이름을 짓고(.App), 그 내부에서는 소문자를 입력하거나(.logo), header 같은 태그를 사용하여 클래스 이름이 불필요한 경우에는 아예 생략할 수도 있습니다.

## 09-2. Sass

Sass(Syntactically Awesome Style Sheets)는 CSS 전처리기로 복잡한 작업을 쉽게 할 수 있도록 해 주고, 스타일 코드의 재활용성을 높여 줄 뿐만 아니라 코드의 가독성을 높여서 유지 보수를 더욱 쉽게 해줍니다.

Sass에서는 두 가지 확장자 .scss와 .sass를 지원합니다. Sass가 처음 나왔을 때는 .sass 확장자만 지원되었으나, 나중에 개발자들의 요청에 의해 .scss 확장자도 지원하게 되었습니다.

.scss의 문법과 .sass의 문법은 꽤 다릅니다. 다음 코드를 한번 확인해 보세요.

> ```scss title="sass"
> $font-stack: Helvetica, sans-serif
> $primary-color: #333
>
> body
>   font: 100% $font-stack
>   color: $primary-color
> ```

> ```scss title="scss"
> $font-stack: Helvetica, sans-serif;
> $primary-color: #333;
>
> body {
>   font: 100% $font-stack;
>   color: $primary-color;
> }
> ```

주요 차이점을 살펴보면, .sass 확장자는 중괄호({})와 세미콜론(;)을 사용하지 않습니다. 반면 .scss 확장자는 기존 CSS를 작성하는 방식과 비교해서 문법이 크게 다르지 않습니다.

```scss
// 변수 사용하기
$red: #fa5252;
$orange: #fd7e14;
$yellow: #fcc419;
$green: #40c057;
$blue: #339af0;
$indigo: #5c6cfa;
$violet: #7950f2;

// 믹스인 만들기(재사용되는 스타일 블록을 함수처럼 사용할 수 있음)
@mixin square($size) {
  $calculated: 32px * $size;
  width: $calculated;
  height: $calculated;
}

.SassComponent {
  display: flex;
  .box {
    background: red;
    cursor: pointer;
    transition: all 0.3s ease-in;
    &.red {
      background: $red;
      @include square(1);
    }
    &.orange {
      background: $orange;
      @include square(2);
    }
    &.yellow {
      background: $yellow;
      @include square(3);
    }
    &.green {
      background: $green;
      @include square(4);
    }
    &.blue {
      background: $blue;
      @include square(5);
    }
    &.indigo {
      background: $indigo;
      @include square(6);
    }
    &.violet {
      background: $violet;
      @include square(7);
    }
    &:hover {
      // .box에 마우스를 올렸을 때
      background: black;
    }
  }
}
```

```jsx
import "./SassComponent.scss";

const SassComponent = () => {
  return (
    <div className="SassComponent">
      <div className="box red" />
      <div className="box orange" />
      <div className="box yellow" />
      <div className="box green" />
      <div className="box blue" />
      <div className="box indigo" />
      <div className="box violet" />
    </div>
  );
};

export default SassComponent;
```

### (1) utils 함수 분리하기

여러 파일에서 사용될 수 있는 Sass 변수 및 mixin은 다른 파일로 따로 분리하여 작성한 뒤 필요한 곳에서 쉽게 불러와 사용할 수 있습니다.
src 디렉터리에 styles라는 디렉터리를 생성하고, 그 안에 utils.scss 파일을 만드세요. 그 다음에는 기존 SassComponent.scss에 작성했던 변수와 믹스인을 잘라내서 이동시켜 보세요.

```scss
@import "./style/utils";
.SassComponent {
  display: flex;
  .box {
    background: red;
    cursor: pointer;
    transition: all 0.3s ease-in;
    (...)
  }
}
```

### (2) sass-loader 설정 커스터마이징하기

이 작업은 Sass를 사용할 때 반드시 해야하는 것은 아니지만, 해 두면 유용합니다. 예를 들어 방금 SassComponent에서 utils를 불러올 때

> ```scss
> @import "./style/utils";
> ```

형태로 불러왔는데요. 만약 프로젝트에 디렉터리를 많이 만들어서 구조가 깊어졌다면 해당 파일에서는 다음과 같이 상위 폴더로 한참 거슬러 올라가야 한다는 단점이 있습니다.

> ```scss
> @import "../../../styles/utils";
> ```

이 문제점은 웹팩에서 Sass를 처리하는 sass-loader의 설정을 커스터마이징하여 해결할 수 있습니다. create-react-app으로 만든 프로젝트는 프로젝트 구조의 복잡도를 낮추기 위해 세부 설정이 모두 숨겨져 있습니다. 이를 커스터마이징하려면 프로젝트 디렉터리에서 npm eject 명령어를 통해 세부 섲렁을 모두 밖으로 꺼내 주어야 합니다.
create-react-app에서는 기본적으로 Git 설정이 되어 있는데요, npm eject는 아직 Git에 커밋되지 않은 변화가 있다면 진행되지 않으니, 먼저 커밋해 주어야 합니다.

이제 프로젝트 디렉터리에 config라는 디렉터리가 생성되었을 것입니다. 그 디렉터리 안에 들어있는 webpack.config.js를 열어보세요.
그 파일에서 "sassRegex"라는 키워드를 찾아 보세요. 그러면 다음과 같은 코드가 나타날 것입니다.

```jsx
{
  test: sassRegex,
  exclude: sassModuleRegex,
  use: getStyleLoaders(
    {
      importLoaders: 3,
      sourceMap: isEnvProduction
        ? shouldUseSourceMap
        : isEnvDevelopment,
      modules: {
        mode: 'icss',
      },
    },
    'sass-loader'
  ).concat({
    loader: require.resolve("sass-loader"),
    options: {
      sassOptions: {
        includePaths: [paths.appSrc + "/styles"],
      },
    },
  }),
  sideEffects: true,
},
```

설정 파일을 저장한 후, 서버를 껐다가 재시작하세요. 이제 utils.scss 파일을 불러올 때 현재 수정하고 있는 scss 파일 경로가 어디에 위치하더라도 앞부분에 상대 경로를 입력할 필요 없이 styles 디렉터리 기준 절대 경로를 사용하여 불러올 수 있습니다.

> ```scss
> @import "utils.scss";
> ```

하지만 새 파일을 생성할 때마다 utils.scss를 매번 이렇게 포함시키는 것도 귀찮을 수 있습니다. 그럴 때는 sass-loader의 additionalData 옵션을 설정하면 됩니다. additionalData 옵션을 설정하면 Sass 파일을 불러올 때마다 코드의 맨 윗부분에 특정 코드를 포함시켜 줍니다.
webpack.config.js를 열어서 additionalData 필드를 설정할 수 있습니다.\

```jsx
{
  test: sassRegex,
  exclude: sassModuleRegex,
  use: getStyleLoaders(
    {
      importLoaders: 3,
      sourceMap: isEnvProduction
        ? shouldUseSourceMap
        : isEnvDevelopment,
      modules: {
        mode: 'icss',
      },
    },
    'sass-loader'
  ).concat({
    loader: require.resolve("sass-loader"),
    options: {
      sassOptions: {
        includePaths: [paths.appSrc + "/styles"],
      },
      additionalData: "@import 'utils';",
    },
  }),
  sideEffects: true,
},
```

이렇게 작성하고 개발 서버를 재시작하고 나면 모든 scss 파일에서 utils.scss를 자동으로 불러오므로, Sass에서 맨 윗줄에 있는 import 구문을 지워도 정상적으로 작동할 것입니다.
