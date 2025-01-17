import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllUsers, updateUserRole } from '../../store/slice/userSlice';
import './UserList.css';

const UserList = () => {
  const dispatch = useDispatch();
  const { users, isLoading, error } = useSelector(state => state.user);
  const [selectedRole, setSelectedRole] = useState({});

  useEffect(() => {
    dispatch(getAllUsers());
  }, [dispatch]);

  useEffect(() => {
    if (users && users.rows) {
      const initialRoles = {};
      users.rows.forEach(user => {
        initialRoles[user.id] = user.role._id || user.role; // Обеспечим использование правильного идентификатора роли
      });
      setSelectedRole(initialRoles);
    }
  }, [users]);

  const handleChangeRole = (userId) => {
    dispatch(updateUserRole({ userId, roleId: String(selectedRole[userId]) })); // Преобразуем roleId в строку
  };

  const handleRoleChange = (userId, roleId) => {
    setSelectedRole(prev => ({ ...prev, [userId]: roleId }));
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error}</div>;
  }

  return (
    <div className='centios'>
      <div className="user-list">
        <h2>Manage Users</h2>
        <table>
          <thead>
            <tr>
              <th>ID</th>
              <th>Email</th>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {users.rows.map(user => (
              <tr key={user.id}>
                <td data-label="ID">{user.id}</td>
                <td data-label="Email">{user.email}</td>
                <td data-label="First Name">{user.firstname}</td>
                <td data-label="Last Name">{user.lastname}</td>
                <td data-label="Role">
                  <select
                    value={selectedRole[user.id] || user.role}
                    onChange={(e) => handleRoleChange(user.id, e.target.value)}
                  >
                    <option value="1">Customer</option>
                    <option value="2">Admin</option>
                  </select>
                </td>
                <td data-label="Action">
                  <button onClick={() => handleChangeRole(user.id)}>Update Role</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserList;
