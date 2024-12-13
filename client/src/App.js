import React from 'react';
import Header from './Components/Header/header';

const App = () => {
  return (
    <>
      {/* Гость */}
      <Header userType="guest" />
      {/* Зарегистрированный пользователь */}
      <Header userType="user" />
      {/* Администратор */}
      <Header userType="admin" />
    </>
  );
};

export default App;
