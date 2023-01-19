import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import produce from 'immer';
import { RootState } from '../../app/store';
import { fetchPost, createPost, destroyPost } from "./postAPI";

export enum Statuses {
    Initial = "Not fetched",
    Loading = "Loading...",
    UpToDate = "Up to date",
    Deleted = "Deleted",
    Error = "Error"
}

export interface PostFormData {
    post: {
        id?: string;
        title: string;
        body: string;
    }
}

export interface PostState{
    id?: number;
    title?: string;
    body?: string;
    created_at?: any;
    updated_at?: any;

}

export interface UpDateData{
    post_id: number;
    post: PostState;
}

export interface PostDelteData{
    post: {
        post_id: number;

    }
}


export interface PostsState {
    posts: PostState[];
    status: string;
}

const initialState: PostsState = {
    posts: [
        {
            id: 0,
            title: "",
            body: "",
            created_at: "",
            updated_at: "",
        }
    ],
    status: Statuses.Initial
}

export const fetchPostsAsync = createAsyncThunk(
    'posts/fetchPosts',
    async () => {
        const response = await fetchPost();
        return response;
    }
)

export const createPostAsync = createAsyncThunk(
    '/posts/createPost',
    async (payload: PostFormData) => {
        const response = await createPost(payload);

        return response;

    }
)

export const destroyPostAsync = createAsyncThunk(
    '/posts/destroyPost',
    async (payload: PostDelteData) => {
        const response = await destroyPost(payload)

    }
)

export const postSlice = createSlice({
    name: "posts",
    initialState,
    /**
     * Synchronous actions
     */
    reducers: {},
    extraReducers: (builder) => {
        builder
        // waiting
        .addCase(fetchPostsAsync.pending, (state) => {
                return produce(state, (draftState) => {
                    draftState.status = Statuses.Loading;
                })
            })
        // getting
        .addCase(fetchPostsAsync.fulfilled, (state, action) => {
                return produce(state, (draftState) => {
                    draftState.posts = action.payload;
                    draftState.status = Statuses.UpToDate;
                })
            })
        // error
        .addCase(fetchPostsAsync.rejected, (state) => {
            return produce(state, (draftState) => {
                draftState.status = Statuses.Error
            })
        })

        // Update section

        .addCase(createPostAsync.pending, (state) => {
            return produce(state, (draftState) => {
                draftState.status = Statuses.Loading;
            })
        })
    .addCase(createPostAsync.fulfilled, (state, action) => {
            return produce(state, (draftState) => {
                draftState.posts.push(action.payload);
                draftState.status = Statuses.UpToDate;
            })
        })
    .addCase(createPostAsync.rejected, (state) => {
        return produce(state, (draftState) => {
            draftState.status = Statuses.Error
        })
    })

     // Destroy section

     .addCase(destroyPostAsync.pending, (state) => {
        return produce(state, (draftState) => {
            draftState.status = Statuses.Loading;
        })
    })
.addCase(destroyPostAsync.fulfilled, (state, action) => {
        return produce(state, (draftState) => {
            draftState.posts = action.payload;
            draftState.status = Statuses.UpToDate;
        })
    })
.addCase(destroyPostAsync.rejected, (state) => {
    return produce(state, (draftState) => {
        draftState.status = Statuses.Error
    })
})
    }
})

export const {} = postSlice.actions;

export const selectPosts = (state: RootState) => state.posts.posts;

export const selectStatus = (state: RootState) => state.posts.status;

export default postSlice.reducer;
