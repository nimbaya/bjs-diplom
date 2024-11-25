"use strict";

const userForm = new UserForm();

userForm.loginFormCallback = (data) => {
  console.log("Данные для авторизации:", data);
  ApiConnector.login(data, (response) => {
    console.log("Ответ сервера при авторизации:", response);
    if (response.success) {
      alert("Авторизация успешна!");
      location.reload();
    } else {
      alert(`Ошибка авторизации: ${response.error}`);
    }
  });
};

userForm.registerFormCallback = (data) => {
  console.log("Данные для регистрации:", data);
  ApiConnector.register(data, (response) => {
    console.log("Ответ сервера при регистрации:", response);
    if (response.success) {
      alert("Регистрация успешна!");
      location.reload();
    } else {
      alert(`Ошибка регистрации: ${response.error}`);
    }
  });
};
