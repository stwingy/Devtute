import React from 'react'
import styled from 'styled-components'

const Div = styled.div`
background-color:#ff8080;

margin:0 auto;
`
const Button = styled.input`

  display: inline-block;
  padding: .3em;
  margin:10px 0;
  margin-right: 5px;
  height:20px;
  min-width: 100px;
  background: #ff4d4d;
  border: none;
  outline: none;
  color: white;
  font-family: inherit;
  font-weight: 400;
  font-size: 12px;
  border-radius: 3px;
  box-shadow: 0 5px 0px darken(#ff4d4d,0%);
  border-bottom: 2px solid darken(#ff4d4d,3%);
  
  &:hover{
    background: darken(#ff4d4d,5%);
    box-shadow: 0 4px 1px darken(#ff4d4d,5%);
    border-bottom: 2px solid darken(#ff4d4d,8%);
    transition: all 0.1s ease-in;
  }
  
  &:active{
    transform:translateY(4px);
    border-bottom-width: 2px;
    box-shadow: none;
  }

`
function Nav({ setSelect }) {
    return (
        <Div>
            <Button type="button" value="All" onClick={() => { setSelect("All") }} />
            <Button type="button" value="General" onClick={() => { setSelect("General") }} />
            <Button type="button" value="React" onClick={() => { setSelect("React") }} />
            <Button type="button" value="Javascript" onClick={() => { setSelect("Javascript") }} />
            <Button type="button" value="CSS" onClick={() => { setSelect("CSS") }} />
            <Button type="button" value="Styled Components" onClick={() => { setSelect("Styled Components") }} />
        </Div>
    )
}

export default Nav
