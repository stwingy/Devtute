import React from 'react'
import { ReactComponent as Logo } from '../../rlogo.svg'
import './title.css'
function Title() {
    return (
        <div style={{ marginBottom: '12rem', marginTop: "3rem" }}>
            <div style={{ display: "flex", justifyContent: "center" }}> <span className='neon-blue'>SCALLYWAG</span><span ><Logo style={{ width: "50px", height: "50px" }} /></span></div>
            <div className='neon-blue2'>React Developers</div>
        </div>
    )
}

export default Title
