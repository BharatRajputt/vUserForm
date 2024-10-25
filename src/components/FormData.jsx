import React, { useState, useEffect, useRef } from 'react';
import { useDispatch } from 'react-redux';
import { addUser } from '../redux/userSlice';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { gsap } from 'gsap';

const FormData = () => {
  const [data, setData] = useState({ name: '', email: '', age: '', image: '', password: '', confirmPassword: '' });
  const [preview, setPreview] = useState(null);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const formRef = useRef(null); // Create a ref for the form

  const handleChange = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
  };

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setPreview(reader.result);
      setData((prevData) => ({ ...prevData, image: reader.result }));
    };

    if (file) {
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!data.name || !data.email || !data.age || !data.image || !data.password || !data.confirmPassword) {
      toast.error("Please fill in all fields.");
      return;
    }
    
    dispatch(addUser(data));
    toast.success("User added successfully!");

    setData({ name: '', email: '', age: '', image: '', password: '', confirmPassword: '' });
    setPreview(null);
    navigate('/table');
  };

  useEffect(() => {
    gsap.fromTo(formRef.current, 
      { opacity: 0, y: -20 }, 
      { opacity: 1, y: 0, duration: 0.5 }
    );

    return () => {
      gsap.to(formRef.current, { opacity: 0, y: -20, duration: 0.5 });
    };
  }, []);

  return (
    <>
      <h1 className="text-xl font-bold text-center">User Detail</h1>
      <div className="flex justify-center">
        <div className="max-w-sm mx-auto p-4 border border-gray-300 rounded-lg bg-gradient-to-b from-black via-transparent to-teal-600 h-[88vh]">
          <form ref={formRef} onSubmit={handleSubmit}>
            <div className="flex items-center justify-center mb-4">
              <div className="w-24 h-24 border-2 border-dashed border-gray-300 rounded-full flex items-center justify-center bg-white bg-opacity-70 overflow-hidden relative">
                {preview ? (
                  <img src={preview} alt="Preview" className="max-w-[124px] max-h-[120px] object-contain rounded-full" />
                ) : (
                  <div className="text-gray-400 text-sm text-center">Upload Image</div>
                )}
                <input
                  type="file"
                  name='image'
                  id='input-file'
                  onChange={handleImageUpload}
                  accept="image/*"
                  className="absolute inset-0 opacity-0 cursor-pointer z-10"
                />
              </div>
            </div>

            <label className="block mb-0 text-sm text-white">Enter your Name</label>
            <input
              type="text"
              name='name'
              onChange={handleChange}
              value={data.name}
              className="w-11/12 p-2 mb-1 border border-gray-400 rounded text-white"
            />

            <label className="block mb-1 text-sm text-white">Enter your Email</label>
            <input
              type="email"
              name='email'
              onChange={handleChange}
              value={data.email}
              className="w-11/12 p-2 mb-1 border border-gray-400 rounded"
            />

            <label className="block mb-1 text-sm text-white">Enter your Password</label>
            <input
              type="password"
              name='password'
              onChange={handleChange}
              value={data.password}
              className="w-11/12 p-2 mb-1 border border-gray-400 rounded text-white"
            />

            <label className="block mb-1 text-sm text-white">Confirm your Password</label>
            <input
              type="password"
              name='confirmPassword'
              onChange={handleChange}
              value={data.confirmPassword}
              className="w-11/12 p-2 mb-1 border border-gray-400 rounded text-white"
            />

            <label className="block mb-1 text-sm text-white">Enter your Age</label>
            <input
              type="text"
              name='age'
              onChange={handleChange}
              value={data.age}
              className="w-11/12 p-2 mb-4 border border-gray-400 rounded"
            />

            <button
              type='submit'
              className="mx-4 w-36 bg-green-500 p-2 border border-gray-300 rounded-lg hover:bg-green-600 transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default FormData;
