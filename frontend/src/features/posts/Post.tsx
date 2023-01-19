/* eslint-disable @typescript-eslint/no-unused-vars */
//import { isEditable } from '@testing-library/user-event/dist/types/utils';
import React, { useEffect, useState } from 'react'
import ButtonGroup from './ButtonGroup';

function Post(props:any) {
  const [title, setTitle] = useState(props.post.title);
  const [body, setBody] = useState(props.post.body);
  const [isEditing, setIsEditing] = useState(props.postToEdit === props.post.id);
  useEffect(() => {
    setIsEditing(props.postToEdit === props.post.id);
  }, [props.postToEdit, props.post.id])
function submitHandler(e:any){
  e.preventDefault();
  const formData = {
      post: {
        id: props.post.id,
        title: title,
        body: body,
      }
    }
    props.submitEdit(FormData)
    resetState();
  }
  function resetState(){
    setTitle(props.post.title);
    setBody(props.post.body);
  }
}


  const titleElement = <h2 className="title text-start">{props.post.title}</h2>;
  const bodyElement = <p className="card-text text-start">{props.post.body}</p>;


  const editableTitle = <input
  type="text"
  className='form-control text-start'
  value= {title}
  onChange={(e) => setTitle(e.target.value)} />;

  const editableBody = <textarea
  className='form-control text-start'
  value = {body}
  onChange={(e) => setTitle(e.target.value)} />;

  const submitButton = <button
  type="submit"
  className='form-control'
  onChange={(e) => submitHandler(e)}></button>;

  return (
    <div>
      <div className="row">
        <div className='col-8'>
          {isEditing ? editableTitle : titleElement }
        </div>
        <div className="col-4">
          <ButtonGroup
          post_id={props.post.id}
          dispach={props.dispach}
          />
        </div>

      </div>
      <div className='row'>
        <div className="col-8">
          {isEditing ? editableBody : bodyElement}
        </div>
      </div>
      <div className='row'>
        <div className='col-2'>
          {isEditing? submitButton : ""}
          </div>
      </div>
    </div>
  )
}

export default Post;
