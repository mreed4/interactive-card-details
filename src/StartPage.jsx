import { useState, useEffect } from "react";

export default function StartPage() {
  const [cardNumber, setCardNumber] = useState("");
  const [cardNumberInputError, setCardNumberInputError] = useState(false);
  const maskedCardNumber = cardNumber.match(/.{1,4}/g)?.join(" ") || "";
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
    // const isValid = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"].includes(e.target.value.slice(-1));
    // if (isValid) {
    //   const value = e.target.value.replace(/\D/g, ""); // Remove non-digits
    //   const groups = value.match(/(\d{1,4})/g); // Group digits in 4s
    //   setCardNumber(groups?.join(" ") || "");
    // } else {
    //   setCardNumber(e.target.value.slice(0, -1));
    // }

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
    const isValid = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "Backspace", "Tab"].includes(e.key) === false;
    if (isValid) {
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

  return (
    <>
      <div className="card-container">
        <div className="card-front">
          <img src="/img/bg-card-front.png" alt="card front" />
          <div className="card-front-logo-and-text">
            <div className="card-logo">
              <img src="/img/card-logo.svg" alt="card logo" />
            </div>
            <div className="card-info uppercase">
              <div className="card-number mono">{!cardNumber ? "1234 5678 9123 0000" : cardNumber}</div>
              <div className="card-holder-and-expiry small">
                <div className="card-holder">{!cardHolder ? "Jane Appleseed" : cardHolder}</div>
                <div className="card-expiry mono">
                  {!expiryMM ? "00" : expiryMM}/{!expiryYY ? "00" : expiryYY}
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="card-back">
          <img src="/img/bg-card-back.png" alt="card back" />
          <div className="card-back-text">
            <span className="card-cvc mono">{!cvc ? "123" : cvc}</span>
          </div>
        </div>
      </div>
      <div className="form-container">
        <form onSubmit={(e) => e.preventDefault()}>
          <label htmlFor="form-cardholder-name">Cardholder Name</label>
          <input
            id="form-cardholder-name"
            name="cardholder-name"
            type="text"
            placeholder="e.g. Jane Appleseed"
            onChange={handleCardHolderChange}
            value={cardHolder}
            pattern="[A-Za-z ]{1,26}"
            maxLength="26"
          />
          {/* {cardHolderLettersRemaining} */}
          <label htmlFor="form-card=number">
            Card Number {cardNumberInputError && <span className="red">Numbers only</span>}{" "}
            {cardNumber.length < 19 && cardNumber.length !== 0 && <span className="red">16 digits required</span>}
          </label>

          <input
            id="form-card-number"
            name="card-number"
            type="text"
            inputMode="numeric"
            placeholder="e.g. 1234 5678 9123 0000"
            onChange={handleCardNumberChange}
            onKeyDown={checkIsNumber}
            autoComplete="cc-number"
            value={cardNumber}
            pattern="[0-9 ]{19}"
            maxLength="19"
          />
          <div className="form-expiry-and-cvc">
            <div className="form-expiry">
              <label htmlFor="form-expire-mm">Exp. Date (MM/YY)</label>
              <input
                id="form-expire-mm"
                name="expire-mm"
                type="text"
                placeholder="MM"
                onChange={handleExpiryMMChange}
                onKeyDown={checkIsNumber}
                onBlur={handleExpiryMMBlur}
                value={expiryMM}
                pattern="[0-9]{2}"
                maxLength="2"
              />
              <input
                id="form-expire-yy"
                name="expire-yy"
                type="text"
                placeholder="YY"
                onChange={handleExpiryYYChange}
                onKeyDown={checkIsNumber}
                onBlur={handleExpiryYYBlur}
                value={expiryYY}
                pattern="[0-9]{2}"
                maxLength="2"
              />
            </div>
            <div className="form-cvc">
              <label htmlFor="form-cvc">CVC</label>
              <input
                id="form-cvc"
                name="form-cvc"
                type="text"
                inputMode="numeric"
                placeholder="e.g. 123"
                onChange={handleCvcChange}
                onKeyDown={checkIsNumber}
                autoComplete="cc-csc"
                value={cvc}
                pattern="[0-9]{3}"
                maxLength="3"
              />
            </div>
          </div>
          <button type="submit" disabled={!cardNumber || !cardHolder || !expiryMM || !expiryYY || !cvc}>
            Confirm
          </button>
        </form>
      </div>
    </>
  );
}
