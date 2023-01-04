import React, { useState } from "react";

function IncrementCounter(props) {
    const step = props.step ?? 5
    const [count, setCount] = useState(0)
    const handleIncrement = ()=>{
        setCount(count+step)
    }
    return (
        <React.Fragment>
            <div>Hello from incrementCounter</div>
            <button onClick={handleIncrement}>Increment</button>
            You clicked {count} times
        </React.Fragment>
    )
}

export default IncrementCounter;
