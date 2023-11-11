import { useContext } from "react";
import { AppContext } from "./AppContext";
import { useNavigate } from "react-router-dom";

function FormCardholderNamePart() {
  const { cardHolder, handleCardHolderChange } = useContext(AppContext);

  return (
    <>
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
    </>
  );
}

function FormCardNumberPart() {
  const { cardNumber, handleCardNumberChange, checkIsNumber, cardNumberInputError } = useContext(AppContext);

  function CardNumberLength() {
    if (cardNumber.length < 19 && cardNumber.length !== 0) {
      return <span className="red">must be 16 digits</span>;
    }
    return null;
  }

  function CardNumberInputError() {
    if (cardNumberInputError) {
      return <span className="red">is numbers only</span>;
    }
    return null;
  }

  return (
    <>
      <label htmlFor="form-card=number">
        Card Number <CardNumberLength /> <CardNumberInputError />
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
    </>
  );
}

function FormCardExpiryPart() {
  const { expiryMM, expiryYY, handleExpiryMMChange, handleExpiryYYChange, handleExpiryMMBlur, handleExpiryYYBlur, checkIsNumber } =
    useContext(AppContext);
  return (
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
  );
}

function FormCardCVCPart() {
  const { cvc, handleCvcChange, checkIsNumber } = useContext(AppContext);

  function CVCLength() {
    if (cvc.length < 3 && cvc.length !== 0) {
      return <span className="red">must be 3 digits</span>;
    }
    return null;
  }

  return (
    <div className="form-cvc">
      <label htmlFor="form-cvc">
        CVC <CVCLength />
      </label>
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
  );
}

export default function CardInputPage() {
  const { cardNumber, cardHolder, expiryMM, expiryYY, cvc } = useContext(AppContext);

  const formIsComplete =
    cardNumber.length === 19 && cardHolder.length > 0 && expiryMM.length === 2 && expiryYY.length === 2 && cvc.length === 3;

  const navigate = useNavigate();

  return (
    <section className="form-card-input">
      <form onSubmit={(e) => e.preventDefault() || navigate("/complete")}>
        <FormCardholderNamePart />
        <FormCardNumberPart />
        <div className="form-expiry-and-cvc">
          <FormCardExpiryPart />
          <FormCardCVCPart />
        </div>
        <button type="submit" disabled={!formIsComplete}>
          Confirm
        </button>
      </form>
    </section>
  );
}
