import React from 'react'

function Nav({ setSelect }) {
    return (
        <div>
            <button onClick={() => { setSelect("All") }}>All</button>
            <button onClick={() => { setSelect("General") }}>General</button>
            <button onClick={() => { setSelect("React") }}>React</button>
            <button onClick={() => { setSelect("Javascript") }}>Javascript</button>
            <button onClick={() => { setSelect("CSS") }}>CSS</button>
            <button onClick={() => { setSelect("Styled Components") }}>Styled Components</button>
        </div>
    )
}

export default Nav
