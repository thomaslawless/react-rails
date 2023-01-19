import React, { useEffect} from 'react'
import { useDispatch } from 'react-redux';
import { useAppDispatch, useAppSelector } from '../../app/hooks'
import { AppDispatch } from '../../app/store';
import { selectPosts, fetchPostsAsync, Statuses, selectStatus } from './PostSlice'

function Post() {
    const posts = useAppSelector(selectPosts);
    const status = useAppSelector(selectStatus)
    const dispatch = useDispatch<AppDispatch>();

    useEffect(() => {
        dispatch(fetchPostsAsync());
    }, [dispatch])

    let contents;
    if (status != Statuses.UpToDate){
        contents = <div> {status} </div>
    }else {
        contents =
        <div className='card'>
            <h3>{status}</h3>
            {/** form goes here */}
            {posts && posts.length > 0 && posts.map(post => {
                return <div key={post.id} style={{margin: "5em"}}>
                <h3>{post.title}</h3>
                </div>
            })}
        </div>
    }
  return (
    <div>
    </div>
  )
}

export default Post;
