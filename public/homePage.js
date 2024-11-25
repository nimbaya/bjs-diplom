"use strict";

const logoutButton = new LogoutButton();
logoutButton.action = () => {
  ApiConnector.logout((response) => {
    if (response.success) {
      location.reload();
    } else {
      console.error("Ошибка выхода:", response.error);
      alert(`Ошибка выхода: ${response.error}`);
    }
  });
};

ApiConnector.current((response) => {
  if (response.success) {
    ProfileWidget.showProfile(response.data);
  } else {
    console.error("Ошибка получения данных профиля:", response.error);
    alert(`Ошибка получения данных профиля: ${response.error}`);
  }
});

// Функция для получения курсов валют
const ratesBoard = new RatesBoard();

function updateRates() {
  ApiConnector.getStocks((response) => {
    if (response.success) {
      ratesBoard.clearTable();
      ratesBoard.fillTable(response.data);
    } else {
      console.error("Ошибка получения курсов валют:", response.error);
      alert(`Ошибка получения курсов валют: ${response.error}`);
    }
  });
}

updateRates();

setInterval(updateRates, 60000);

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      alert("Баланс успешно пополнен");
    } else {
      console.error("Ошибка пополнения баланса:", response.error);
      alert(`Ошибка пополнения баланса: ${response.error}`);
    }
  });
};

moneyManager.conversionMoneyCallback = (data) => {
  ApiConnector.convertMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      alert("Конвертация валюты успешна");
    } else {
      console.error("Ошибка конвертации валюты:", response.error);
      alert(`Ошибка конвертации валюты: ${response.error}`);
    }
  });
};

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (response) => {
    if (response.success) {
      ProfileWidget.showProfile(response.data);
      alert("Перевод валюты успешен");
    } else {
      console.error("Ошибка перевода валюты:", response.error);
      alert(`Ошибка перевода валюты: ${response.error}`);
    }
  });
};

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
  if (response.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(response.data);
    moneyManager.updateUsersList(response.data);
  } else {
    console.error("Ошибка получения списка избранных:", response.error);
    alert(`Ошибка получения списка избранных: ${response.error}`);
  }
});

favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      alert("Пользователь успешно добавлен в избранное");
    } else {
      console.error(
        "Ошибка добавления пользователя в избранное:",
        response.error
      );
      alert(`Ошибка добавления пользователя в избранное: ${response.error}`);
    }
  });
};

favoritesWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, (response) => {
    if (response.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(response.data);
      alert("Пользователь успешно удалён из избранного");
    } else {
      console.error(
        "Ошибка удаления пользователя из избранного:",
        response.error
      );
      alert(`Ошибка удаления пользователя из избранного: ${response.error}`);
    }
  });
};
