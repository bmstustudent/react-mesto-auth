import React from "react";
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from "../contexts/CurrentUserContext";
import useValidation from "../hooks/useValidation";

const EditProfilePopup = ({ isOpen, onClose, onUpdateUser, isLoading }) => {
  const fields = ["name", "about"];

  const {
    isValid,
    setIsValid,
    inputValue,
    setInputValue,
    validationMessage,
    setValidationMessage,
    handleInputChange,
    fieldsEnumeration,
  } = useValidation(fields);

  const currentUser = React.useContext(CurrentUserContext);

  const handleSubmit = (event) => {
    // Запрещаем браузеру переходить по адресу формы
    event.preventDefault();
    // Передаём значения управляемых компонентов во внешний обработчик
    onUpdateUser({
      name: inputValue.name,
      about: inputValue.about,
    });
  };

  React.useEffect(() => {
    setInputValue({
      name: currentUser.name || "",
      about: currentUser.about || "",
    });
    setIsValid(fieldsEnumeration(true));
    setValidationMessage(fieldsEnumeration(""));
  }, [currentUser, isOpen, setInputValue, setIsValid, setValidationMessage]);

  return (
    <PopupWithForm
      name="edit"
      isOpen={isOpen}
      onClose={onClose}
      title='Редактировать профиль'
      onSubmit={handleSubmit}
    >
      <label className="popup__control">
        <input
          className={`${validationMessage.name
            ? `popup__input popup__input_type_name popup__input_type_error`
            : `popup__input popup__input_type_name`
            }`}
          type="text"
          name="name"
          value={inputValue.name}
          onChange={handleInputChange}
          placeholder="Имя"
          minLength="2"
          maxLength="20"
          pattern="^[0-9A-Za-zА-Яа-яЁё\D][A-Za-zА-Яа-яЁё\s\D]*[A-Za-zА-Яа-яЁё\D]$"
          required
        />
        <span
          className={`${isValid.name
            ? `popup__error`
            : `popup__error popup__error_type_active`
            }`}
        >
          {validationMessage.name}
        </span>
      </label>
      <label className="popup__control">
        <input
          className={`${validationMessage.about
            ? `popup__input popup__input_type_about popup__input_type_error`
            : `popup__input popup__input_type_about`
            }`}
          type="text"
          name="about"
          value={inputValue.about}
          onChange={handleInputChange}
          placeholder="Занятие"
          minLength="2"
          maxLength="200"
          pattern="^[A-Za-zА-Яа-яЁё\D][A-Za-zА-Яа-яЁё\s\D]*[A-Za-zА-Яа-яЁё\D]$"
          required
        />
        <span
          className={`${isValid.about
            ? `popup__error`
            : `popup__error popup__error_type_active`
            }`}
        >
          {validationMessage.about}
        </span>
      </label>
      <input
        className={`${isValid.name && isValid.about
          ? `button popup__submit`
          : `button popup__submit popup__submit_type_disabled`
          }`}
        type="submit"
        value={`${isLoading ? `Сохранение...` : `Сохранить`}`}
        name="submit"
      />
    </PopupWithForm>
  );
};

export default EditProfilePopup;
