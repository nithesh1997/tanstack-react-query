import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import './Home.css';
import { useState } from "react";

const API_URL = "http://localhost:3001/users";

// Fetch All Users
const fetchUsers = async () => {
  const { data } = await axios.get(API_URL);
  return data;
};

// Create New User
const createUser = async (user) => {
  const { data } = await axios.post(API_URL, user);
  return data;
}

// Delete User
const deleteUser = async ({id}) =>{
  const {data} = await axios.delete(`${API_URL}/${id}`)
  return data;
};

// Update User
const updateUser = async (updatedUser) => {
  const { data } = await axios.put(`${API_URL}/${updatedUser.id}`, updatedUser);
  return data;
};

const Home = () => {
  const queryClient =  useQueryClient();
  const [inputField, setInputField] = useState({ name: "", email: "", username: "" });


  // Fetch all users
  const {
    data: users,
    isError,
    isLoading,
    error,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
  });

  // Create new user
  const createMutation = useMutation({
    mutationFn: createUser,
    onSuccess: (newData) => {
      queryClient.invalidateQueries(["users"]);
      console.log("User created successfully", newData);
    }
  });

  // Delete User
  const deleteMutation = useMutation({
    mutationFn: deleteUser,
    onSuccess: (deletedData) => {
      queryClient.invalidateQueries(["users"]);
    },
  });

  // Update User
  const updateMutation = useMutation({
    mutationFn: updateUser,
    onSuccess: (updatedData) => {
      queryClient.invalidateQueries(["users"]);
    },
  });

    function handleSubmit(e){
    e.preventDefault();

    if(inputField.id){
      updateMutation.mutate({...inputField});
    }else{
      createMutation.mutate({...inputField, id:Math.random() * 1000 + 1});
    }
    
    setInputField({ name: "", email: "", username: "" })
  }

  function handleChange(e){
    const {name,value}=e.target;
    setInputField({...inputField,[name]:value})
  }

  if (isLoading) return <div>Loading...</div>;

  if (isError) {
    const errorMessage =
      error?.response?.data?.message || error?.message || "Unknown error";
    return <div>Error: {errorMessage}</div>;
  }
  return (
    <div className="container">
      <h3>Create, Read, Update & Delete</h3>

      <form onSubmit={handleSubmit} className="form">
        <input type="text" name="name" value={inputField.name} onChange={handleChange} placeholder="Name" />
        <input type="text" name="username" value={inputField.username} onChange={handleChange} placeholder="User Name" />
        <input type="email" name="email" value={inputField.email} onChange={handleChange} placeholder="Email" />
        <button type="submit">Add User</button>
      </form>

      <div className="user-list">
        {users.map((user) => (
          <div key={user.id} className="user-card">
            <div className="user-info">
              <h4>{user.name}</h4>
              <p>{user.email}</p>
            </div>
            <div className="user-actions">
              <button className="edit-btn" onClick={()=>{
                setInputField(user)
              }}>Edit</button>
              <button className="delete-btn" onClick={()=>{
                deleteMutation.mutate(user);
              }}>Delete</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Home;
