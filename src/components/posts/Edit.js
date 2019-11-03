import React from 'react'
import { Button, StyledInput } from '../../style/styles'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import { Editor } from 'react-draft-wysiwyg';
import { convertToRaw, convertFromRaw, EditorState, ContentState } from 'draft-js';
import htmlToDraft from 'html-to-draftjs';
import draftToHtml from 'draftjs-to-html';
import 'react-draft-wysiwyg/dist/react-draft-wysiwyg.css';
import './wysiwyg.css'
const But = styled(Button)`
color:#000;


::before {
 
    border-top-color: rgba(0,0,0,0.5);
    border-bottom-color: rgba(0,0,0,0.5);
   
}

::after {
   
    background-color: rgba(0,0,0,0.1);
}


`
const Input = styled(StyledInput)`

width:82%;
margin:.5em auto;
background-color:rgba(0, 0, 0, 0.1);
box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12) inset;
    color: #555555;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 1em;
    line-height: 1.4em;
    padding: 5px 8px;
    border-color: #ff9999;
    border-image: none;
    border-radius: 3px;
    border-style: none solid solid none;
    border-width: medium 1px 1px medium;
    transition:background-color .3s ease;
    :focus{
background-color:white;
    }
`
const Textarea = styled.textarea`
   margin: .5em auto;
    
    width: 80%;
    height: 100px;
    -moz-border-bottom-colors: none;
    -moz-border-left-colors: none;
    -moz-border-right-colors: none;
    -moz-border-top-colors: none;
    background: none repeat scroll 0 0 rgba(0, 0, 0, 0.07);
    border-color: 	 #ff9999;
    border-image: none;
    border-radius: 6px 6px 6px 6px;
    border-style: none solid solid none;
    border-width: medium 1px 1px medium;
    box-shadow: 0 1px 2px rgba(0, 0, 0, 0.12) inset;
    color: #555555;
    font-family: "Helvetica Neue",Helvetica,Arial,sans-serif;
    font-size: 1em;
    line-height: 1.4em;
    padding: 5px 8px;
    transition: background-color 0.2s ease 0s;
  }
  
  
:focus {
      background: none repeat scroll 0 0 #FFFFFF;
      outline-width: 0;
  }
 `



function Edit({ title, body, editTitle }) {
    const [newTitle, setNewTitle] = React.useState(title)
    const [newBody, setNewBody] = React.useState(body)
    const [editorState, setEditorState] = React.useState(EditorState.createEmpty())
    React.useEffect(() => {
        const contentBlock = htmlToDraft(body);
        if (contentBlock) {
            const contentState = ContentState.createFromBlockArray(contentBlock.contentBlocks);
            const editorState = EditorState.createWithContent(contentState);
            setEditorState(editorState)
        }
    }, [body])



    const onEditorStateChange = (es) => {


        setEditorState(es)


        let contentState = es.getCurrentContent()
        let rawState = convertToRaw(contentState)
        let html = draftToHtml(rawState)

        setNewBody(html)
    }
    return (
        <div style={{ zIndex: 100 }}>
            <Input value={newTitle} type="text" onChange={e => setNewTitle(e.target.value)} />
            <Editor
                editorState={editorState}
                wrapperClassName="myEditor-wrapper"
                editorClassName="myEditor-editor"
                onEditorStateChange={onEditorStateChange}
            />
            <Link to="/"> <But onClick={() => editTitle(newTitle, newBody)} >EDIT</But></Link>
        </div>
    )
}

export default Edit
