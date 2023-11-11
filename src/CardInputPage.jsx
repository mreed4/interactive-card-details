import { useContext } from "react";
import { AppContext } from "./AppContext";

export default function CardInputPage() {
  const {
    cardNumber,
    cardNumberInputError,
    cardHolder,
    expiryMM,
    expiryYY,
    cvc,
    handleCardHolderChange,
    handleCardNumberChange,
    handleExpiryMMChange,
    handleExpiryYYChange,
    handleCvcChange,
    checkIsNumber,

    handleExpiryMMBlur,
    handleExpiryYYBlur,
  } = useContext(AppContext);

  return (
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
        {cardNumber.length < 19 && cardNumber.length !== 0 && <span className="red">16 digits</span>}
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
          <label htmlFor="form-cvc">CVC {cvc.length < 3 && cvc.length !== 0 && <span className="red">3 digits</span>}</label>
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
  );
}
