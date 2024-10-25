import { createSlice } from '@reduxjs/toolkit';
import { toast } from 'react-toastify';


const removeExtraSpaces =(str)=>{

  return str.trim().split(/\s+/).join(' ')
}



const userSlice = createSlice({
  name: 'users',
  initialState: {
    userList: JSON.parse(localStorage.getItem('users')) || [],
  },
  reducers: {
    addUser: (state, action) => {

      const newUser = {...action.payload,
        name:removeExtraSpaces(action.payload.name),
        email: removeExtraSpaces(action.payload.email),
        age: removeExtraSpaces(action.payload.age),
        password:removeExtraSpaces(action.payload.password), 
        confirmPassword:removeExtraSpaces(action.payload.confirmPassword),
        id:Date.now()}


        const userExists = state.userList.some(user => user.email === newUser.email)
       if(userExists){
        toast.warn("Email is already exits");
        throw new Error("Email is already exists")
       }

       if(newUser.password !== newUser.confirmPassword){
        toast.error("Confirm Password is not matched to the password")
        throw new Error("Plz enter  confirm password same to the password")
       }

        
     
        state.userList.push(newUser);
      localStorage.setItem('users', JSON.stringify(state.userList));
    },
    updateUser: (state, action) => {
      const { index, user } = action.payload;
      state.userList[index] = user;
      localStorage.setItem('users', JSON.stringify(state.userList));
    },
    deleteUser: (state, action) => {
      const index = action.payload;
      state.userList.splice(index, 1);
      localStorage.setItem('users', JSON.stringify(state.userList));
    },
    uploadUserImg:(state,action) =>{
     const{index,image} = action.payload
     state.userList[index].image = image
     localStorage.setItem('users',JSON.stringify(state.userList))
    }
  },
});

export const { addUser, updateUser, deleteUser,uploadUserImg } = userSlice.actions;
export default userSlice.reducer;
