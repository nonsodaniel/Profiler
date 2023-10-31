# Part 2

DO NOT USE ANY WEB OR OTHER RESOURCE.

## 1. What is the difference between Component and PureComponent? an example where it might break my app.

- `React.PureComponent` implements `shouldComponentUpdate(`) lifecyle method by comparing the
  current state and props with the new `state` and `props`.
  This shallow comparison is done to remove unecessary re-render and determine the re-rendering of the component,
  thereby leading to an increase in performance of the Application.
- `Component` doesn't implement `shouldComponentUpdate()` lifecyle method and no shallow comparison is done,
  which causes re-render whenever there's a change in props.

  Example: If an application, **NOT** using `React.PureComponent`, contains expensive computations
  which causes it to re-render, the re-rendering can lead to an **Infinite loop** which
  can result in **breaking the application and even crash the device the application is running on**.

## 2. Context + ShouldComponentUpdate might be dangerous. Why is that?

`ShouldComponentUpdate()` depends on using props and state to determine component re-rendering.
Using `ShouldComponentUpdate()` + `context` could introduce a bug as result of the component failing to update, when there's a change in the value of the `context`.
The component will not re-render in such occurence.

## 3. Describe 3 ways to pass information from a component to its PARENT.

1.

- Create a callback function inside the parent component to get the data coming from the child component.
- Inside the parent component, pass the callback function to the child component, but as a props.
- The parent component can now access the data when the callback function is call called from the child component.

2. Using Context Api

3. Using React-Redux store

## 4. Give 2 ways to prevent components from re-rendering.

1. Making use of React Hooks like `useMemo` and `useCallback` which reduces re-rendering by caching the results of expensive computations and returning the same result if the inputs are the same.
2. Making use of `React.PureComponent` which implements the `shouldComponentUpdate()` lifecyle method to detects changes in `state` or `props` and render only when there is change.

## 5. What is a fragment and why do we need it? Give an example where it might break my app.

React `Fragment` is a feature in react that allows the grouping of multiple elements without adding extra elements/nodes to the DOM.
Example:

```jsx
<React.Fragment>
  <h1> My Profile </h1>
  <p>My name is Nonso</p>
  <p>I love React!</p>
</React.Fragment>
```

Giving the we want to return a user Profile, if `React.Fragment` is not used to wrap all other elements in a the component, this will result in an error that
looks like this `Adjacent JSX elements must be wrapped in an enclosing tag. Did you want a JSX fragment <>...</>?`.
To avoid this error, when multiple elements are returned in a component that has no container wrapper like div or section, `<React.Fragment>` is used to wrap all other elements.

## 6. Give 3 examples of the HOC pattern.

To the best of my knowledge, HOC itself is an example of React Design pattern. Based on my past experience working with

There are libraries leveraging HOC design pattern such as:

1. Redux connect HOC
2. WithRouter HOC
3. react-virtualized

## 7. What's the difference in handling exceptions in promises, callbacks and async…await?

### 1. When an error is thrown in an `async` function, you can catch it with a `try {} catch {}`.

```jsx
const fetchAPI = async () => {
  try {
    await getAPI();
  } catch (e) {
    console.log("request failed", e);
  }
};
```

### 2. In promises, errors are handled using the `reject()` function. `try {} catch {}` can also be used to handle exceptions in Promises.

Example:

```jsx
function fetchSomething() {
  return new Promise((resolve, reject) => {
    if ("computation") {
      reject(new Error("Doesn't meet requirements"));
    } else {
      resolve("meets requirement");
    }
  });
}
```

### 3. Handling exceptions in callbacks is done using the error argument of the `callback` function.

The callback function contains 2 arguments: error and data which is the data returned when the action is successful.

Example:

```jsx
function querySomething(queryString) {
  query(queryString, function (error, data) {
    if (error) return errorHandler(error);
    console.log(data);
  });
}
```

## 8. How many arguments does setState take and why is it async.

`setState` takes two arguments:

1. Object or function for updating the state.
2. A function that is called after the setState is triggered.

### Why is setState Async?

Since `setState` changes the state and causes re-rendering, when there are multiple setState calls,
it batches the state updates and calls into a single update containing the new state to be rendered for performance.

## 9. List the steps needed to migrate a Class to Function Component.

1. Change the class to a function
   From

```jsx
class ComponentName extends React.Component {
  //do something
}
```

to

```jsx
const ComponentName = (props) => {
  //do something
};
```

2. Remove the render method but keep the return to wrap the jsx

From

```jsx
  render() {
    return (<h1>This is my Header</h1>);
  }
```

To

```jsx
function ComponentName(props) {
  return <h1>This is my header</h1>;
}
```

3. Convert class methods to functions

From

```jsx
onselect(event){
    //do something
}
```

To

```jsx
const onselect = (event) => {
  //do something
};
```

4 Remove `constructor`, `this` on state, props and event handlers and . Replace `constructor` with `useState` or `useRef`

From

```jsx
 class ComponentName extends React.Component {
   constructor(props) {
				super(props)
       this.handleClick = this.handleClick.bind(this);
       this.state = {
         counter: 0,
         name: "nonso"
       }
     }
     changeName() {
      this.setState(name: 'daniel')
     }

     handleClick(e) {
       this.changeName();
     }
     render() {
       return (<div>
           <button onClick={this.handleClick}>Change my name</button>
           <h1>My Name is: {this.state.name}</h1>
       </div>);
     }
  }
```

To

```jsx
function MyComponent(props) {
  const [name, setName] = useState("nonso");
  function handleClick() {
    setName("daniel");
  }

  return (
    <div>
      <button onClick={handleClick}></button>
      <h1>My Name is: {name}</h1>
    </div>
  );
}
```

5 Replace lifecycle methods like `shouldComponentUpdate`, `componentDidMount` with Hooks like `useffect`, `useRef`.

## 10. List a few ways styles can be used with components.

1. Using Inline Style inside the React Component:

```jsx
<p style={{ color: "red" }}> This is a red description!</p>
```

2. Adding Global Style to “index.html”
   3 Importing your style File directly inside the Components
3. Making use of style objects which can easily be passed in the style props:

```jsx
let myComponentStyle = {
  p: {
    color: "red",
  },
  h1: {
    color: "green"
  }
}
<React.Fragment>
      <h1 style={myComponentStyle.h1}> My Profile </h1>
        <p style={myComponentStyle.p}>My name is Nonso</p>
      <p style={myComponentStyle.p}>I love React!</p>
 </React.Fragment>
```

5. Making use of `CSS modules`
6. Making use of libraries like `styled-component`.

## 11. How to render an HTML string coming from the server:

1.  Making use of `dangerouslySetInnerHTML`
2.  `html-react-parser` library can also be used to replace `dangerouslySetInnerHTML` due to it's high level of exposure to `XSS attack`
