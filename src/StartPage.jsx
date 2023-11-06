export default function StartPage() {
  return (
    <>
      <div className="card-front">
        <img src="/img/bg-card-front.png" alt="card front" />
        <div>
          <div className="card-logo">
            <img src="/img/card-logo.svg" alt="card logo" />
          </div>
          <div className="card-number">0000 0000 0000 0000</div>
          <div className="card-holder">Jane Appleseed</div>
          <div className="card-expiry">00/00</div>
        </div>
      </div>
      <div className="card-back">
        <img src="/img/bg-card-back.png" alt="card back" />
        <div>
          <span className="card-cvc">000</span>
        </div>
      </div>
      <form onSubmit={(e) => e.preventDefault()}>
        <label htmlFor="form-cardholder-name">Cardholder Name</label>
        <input id="form-cardholder-name" name="cardholder-name" type="text" placeholder="e.g. Jane Appleseed" />
        <label htmlFor="form-card=number"></label>
        <input id="form-card-number" name="card-number" type="text" placeholder="Card Number e.g. 1234 5678 9123 0000" />
        <label htmlFor="form-expire-mm">Exp. Date (MM/YY)</label>
        <input id="form-expire-mm" name="expire-mm" type="text" placeholder="MM" />
        <input id="form-expire-yy" name="expire-yy" type="text" placeholder="YY" />
        <label htmlFor="form-cvc"></label>
        <input id="form-cvc" name="form-cvc" type="text" placeholder="e.g. 123" />
        <button>Confirm</button>
      </form>
    </>
  );
}
