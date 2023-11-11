import { Outlet } from "react-router-dom";
import { useContext } from "react";
import { AppContext } from "./AppContext";

import "./App.css";

function CardContainer() {
  const { cardNumber, cardHolder, expiryMM, expiryYY, cvc } = useContext(AppContext);
  return (
    <div className="card-container">
      <div className="card card-front">
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
      <div className="card card-back">
        <img src="/img/bg-card-back.png" alt="card back" />
        <div className="card-back-text">
          <span className="card-cvc mono">{!cvc ? "123" : cvc}</span>
        </div>
      </div>
    </div>
  );
}

function App() {
  return (
    <>
      <CardContainer />
      <div className="form-or-thank-you-container">
        <Outlet />
      </div>
    </>
  );
}

export default App;
