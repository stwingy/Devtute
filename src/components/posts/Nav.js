import React from 'react'
import { withRouter } from 'react-router-dom'
import styled from 'styled-components'

const Div = styled.div`
background-color:#ff8080;

margin:0 auto;
`
const Button = styled.input`

  display: inline-block;
  padding: .2em;
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
  box-shadow: 0 3px 50px rgba(255,61,61,.3);
  border-bottom: 1px solid  #ff3333;
  
  &:hover{
    background: rgb(255,68,68);
    box-shadow: 0 3px 10px rgba(255,61,61,.3);
  border-bottom: 1px solid rgb(200, 0, 0);
    transition: all 0.1s ease-in;
  }
  
  &:active{
    transform:translateY(4px);
    border-bottom-width: 2px;
    box-shadow: none;
  }

`
function Nav({ setSelect, ...props }) {
  console.log("nav ", props)
  return (
    <Div>
      <Button type="button" value="All" onClick={() => { setSelect("All"); props.history.push('/') }} />
      <Button type="button" value="General" onClick={() => { setSelect("General"); props.history.push('/') }} />
      <Button type="button" value="React" onClick={() => { setSelect("React"); props.history.push('/') }} />
      <Button type="button" value="Javascript" onClick={() => { setSelect("Javascript"); props.history.push('/') }} />
      <Button type="button" value="CSS" onClick={() => { setSelect("CSS"); props.history.push('/') }} />
      <Button type="button" value="Styled Components" onClick={() => { setSelect("Styled Components"); props.history.push('/') }} />
    </Div>
  )
}

export default withRouter(Nav)
