import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updateUser, deleteUser } from '../redux/userSlice';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import { toast } from 'react-toastify';

const TableData = () => {
  const users = useSelector((state) => state.users.userList);
  const dispatch = useDispatch();

  // State for the dialog
  const [open, setOpen] = useState(false);
  const [currentUser, setCurrentUser] = useState(null);

  const handleEdit = (index) => {
    setCurrentUser({ ...users[index], index });
    setOpen(true);
  };

  const handleDelete = (index) => {
    dispatch(deleteUser(index));
toast.error("User Deleted Successfully")
  };

  const handleClose = () => {
    setOpen(false);
    setCurrentUser(null);

  };

  const handleSubmit = () => {
    if (currentUser) {
      const { index, name, email, age, image } = currentUser;
      if (!name|| !email || !age) {
        toast.error("Please fill in all fields.")}

        else if(name,email,age){
          dispatch(updateUser({ index, user: { name, email, age, image } }));
          toast.success("Data Updated Successfully!")
    
        
        
          handleClose();
        }
     

    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCurrentUser((prev) => ({ ...prev, [name]: value }));
  };

  return (
    <div className="mx-auto my-5 max-w-2xl border border-gray-300 rounded-lg overflow-hidden ">
      <h2 className="text-center text-2xl font-semibold my-4">User List</h2>
      <table className="w-full border-collapse bg-gradient-to-b from-black via-transparent to-teal-600">
        <thead>
          <tr className="bg-gradient-to-b from-black via-transparent to-teal-600">
            <th className="border border-gray-300 p-2 text-left text-white">UserImg</th>
            <th className="border border-gray-300 p-2 text-left text-white">Name</th>
            <th className="border border-gray-300 p-2 text-left text-white">Email</th>
            <th className="border border-gray-300 p-2 text-left text-white">Age</th>
            <th className="border border-gray-300 p-2 text-left text-white">Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.length > 0 ? (
            users.map((user, index) => (
              <tr key={index} className={index % 2 === 0 ? 'bg-gray-100' : 'bg-white'}>
                <td className="border border-gray-300 p-2 text-left">
                  {user.image ? (
                    <img src={user.image} alt={`Profile of ${user.name}`} className="w-16 h-14 rounded-full mx-auto" />
                  ) : (
                    'No Image'
                  )}
                </td>
                <td className="border border-gray-300 p-2 text-left">{user.name}</td>
                <td className="border border-gray-300 p-2 text-left ">{user.email}</td>
                <td className="border border-gray-300 p-2 text-left ">{user.age}</td>
                <td className="border border-gray-300 p-2 text-left">
                  <button className="bg-blue-300 text-black px-2 py-1 rounded mr-2" onClick={() => handleEdit(index)}>Edit</button>
                  <button className="bg-red-600 text-white px-2 py-1 rounded" onClick={() => handleDelete(index)}>Delete</button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center p-4">No Users found</td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Edit User Dialog */}
      <Dialog open={open} onClose={handleClose} className='border border-spacing-3' >
        <DialogTitle className='bg-teal-600'>Edit User</DialogTitle>
        <DialogContent className='bg-teal-100' >
          <TextField
          className='text-white'
            autoFocus
            margin="dense"
            label="Name"
            type="text"
            name="name"
            fullWidth
            value={currentUser?.name || ''}
            onChange={handleChange}
          />
          <TextField
            
            margin="normal"
            label="Email"
            type="email"
            name="email"
            fullWidth
            value={currentUser?.email || ''}
            onChange={handleChange}
          />
          <TextField
         
          
            margin="normal"
            label="Age"
            type="number"
            name="age"
            fullWidth
            value={currentUser?.age || ''}
            onChange={handleChange}
          />
        </DialogContent>
        <DialogActions className=''>
          <Button className='bg-red-300' onClick={handleClose} >
            Cancel
          </Button>
          <Button onClick={handleSubmit} className='bg-green-200'>
            Save
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default TableData;
