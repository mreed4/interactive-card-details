import { createContext, useState } from "react";

const AppContext = createContext();

function AppProvider({ children }) {
  const [cardNumber, setCardNumber] = useState("");
  const [cardNumberInputError, setCardNumberInputError] = useState(false);
  const [cardHolder, setCardHolder] = useState(""); // "Jane Appleseed
  const [cardHolderLettersRemaining, setCardHolderLettersRemaining] = useState(26);
  const [expiryMM, setExpiryMM] = useState(""); // "01"
  const [expiryYY, setExpiryYY] = useState(""); // "23"
  const [cvc, setCvc] = useState(""); // "123"

  function handleCardHolderChange(e) {
    const isValid = /^[a-zA-Z ]*$/.test(e.target.value);
    if (isValid) {
      setCardHolder(e.target.value);

      setCardHolderLettersRemaining(26 - e.target.value.length);
    } else {
      setCardHolder(e.target.value.slice(0, -1));
    }
  }

  function handleCardNumberChange(e) {
    const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    const groups = value.match(/(\d{1,4})/g); // Group digits in 4s
    setCardNumber(groups?.join(" ") || "");
  }

  function handleExpiryMMChange(e) {
    const isValid = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(e.target.value.slice(-1));
    if (isValid) {
      setExpiryMM(e.target.value);
    } else {
      setExpiryMM(e.target.value.slice(0, -1));
    }
  }

  function handleExpiryYYChange(e) {
    const isValid = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(e.target.value.slice(-1));
    if (isValid) {
      setExpiryYY(e.target.value);
    } else {
      setExpiryYY(e.target.value.slice(0, -1));
    }
  }

  function handleCvcChange(e) {
    const isValid = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(e.target.value.slice(-1));
    if (isValid) {
      setCvc(e.target.value);
    } else {
      setCvc(e.target.value.slice(0, -1));
    }
  }

  function checkIsNumber(e) {
    const isInvalid = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Backspace", "Tab"].includes(e.key) === false;
    if (isInvalid) {
      // if not a number or backspace
      e.preventDefault(); // prevent input
      setCardNumberInputError(true); // show error
    } else {
      setCardNumberInputError(false);
    }
  }

  function handleExpiryMMBlur(e) {
    if (e.target.value.length === 1) {
      setExpiryMM("0" + e.target.value);
    }
    if (e.target.value.length === 0) {
      setExpiryMM("");
    }
    if (e.target.value.length === "00") {
      setExpiryMM("00");
    }
  }

  function handleExpiryYYBlur(e) {
    if (e.target.value.length === 1) {
      setExpiryYY("0" + e.target.value);
    }
    if (e.target.value.length === 0) {
      setExpiryYY("");
    }
    if (e.target.value.length === "00") {
      setExpiryYY("00");
    }
  }

  const value = {
    cardNumber,
    setCardNumber,
    cardNumberInputError,
    setCardNumberInputError,
    cardHolder,
    setCardHolder,
    cardHolderLettersRemaining,
    setCardHolderLettersRemaining,
    expiryMM,
    setExpiryMM,
    expiryYY,
    setExpiryYY,
    cvc,
    setCvc,
    handleCardHolderChange,
    handleCardNumberChange,
    handleExpiryMMChange,
    handleExpiryYYChange,
    handleCvcChange,
    checkIsNumber,
    handleExpiryMMBlur,
    handleExpiryYYBlur,
  };

  return <AppContext.Provider value={value}>{children}</AppContext.Provider>;
}

export { AppContext, AppProvider };
