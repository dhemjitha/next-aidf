import React from 'react'

function Greeting(props) {
  return (
    <div>
        <h1 className="text-blue-500 text-xl font-bold">Hello, I'm {props.name}, {props.age} years old.</h1>
    </div>
  )
}

export default Greeting