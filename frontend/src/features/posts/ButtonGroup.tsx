import { destroyPostAsync } from './PostSlice';

function ButtonGroup(props:any) {
    function handleClick(e:any){
        const payload = {
            post: {
                post_id: props.post_id
            }
        }
        props.dispach(destroyPostAsync(payload));
    }
  return (
    <div className='btn-group float-end'>
        <button className='btn btn-warning'>Edit</button>
        <button className='btn btn-danger' onClick={(e) => handleClick(e)}> Delete</button>
    </div>
  )
}

export default ButtonGroup
