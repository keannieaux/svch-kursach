import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers } from '../../store/slice/userSlice';

const UserSelect = ({ selectedUserId, onSelectUser }) => {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector(state => state.user);

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    console.log('Loaded users:', users);
  }, [users]);

  if (isLoading) {
    return <div>Loading users...</div>;
  }

  if (error) {
    return <div>Error loading users: {error}</div>;
  }

  if (!Array.isArray(users.rows)) {
    console.error("Users data is not an array:", users); // Логирование ошибки
    return <div>Error: Users data is not an array</div>;
  }

  return (
    <select value={selectedUserId} onChange={e => onSelectUser(e.target.value)}>
      <option value="">Select User</option>
      {users.rows.map(user => (
        <option key={user._id} value={user._id}>
          {user.email}
        </option>
      ))}
    </select>
  );
};

export default UserSelect;
