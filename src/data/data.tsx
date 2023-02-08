import { createSlice, PayloadAction } from '@reduxjs/toolkit'

let month1 = createSlice({
    name: "month1",
    initialState :[],
    reducers : {


        addPost(state, action: PayloadAction<any>){
            state.push(action.payload)
        },
        deletePost(state, action: PayloadAction<any>){
            var delete_ = state.filter((x :any) => x.id !== action.payload.id);
            return delete_
        },
        editPost(state, action: PayloadAction<any>){
            var foundItem :any = state.find((x :any) => x.id === action.payload.id);
            foundItem.title = action.payload.title;
            foundItem.content = action.payload.content;
            foundItem.date = action.payload.date;
            foundItem.month = action.payload.month;
            action.payload.image == null ||action.payload.image == undefined
            ?foundItem.image = foundItem.image
            : (foundItem.image = action.payload.image);
            // console.log(foundItem.image);
        }
        
    }
})


export let { addPost, deletePost, editPost } = month1.actions

export default month1.reducer;