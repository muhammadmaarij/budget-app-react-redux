import React, { useContext, useState } from "react";
import { AppContext } from "../context/AppContext";

const AllocationForm = (props) => {
  const { dispatch, remaining, currency, updateCurrency } =
    useContext(AppContext);
  const [selectedCurrency, setCurrency] = useState(currency); // Step 3: Add state for selected currency

  const [name, setName] = useState("");
  const [cost, setCost] = useState("");
  const [action, setAction] = useState("");

  const handleCurrencyChange = (event) => {
    const selectedCurrency = event.target.value;
    updateCurrency(selectedCurrency);
  };

  const submitEvent = () => {
    if (cost > remaining) {
      alert("The value cannot exceed remaining funds  £" + remaining);
      setCost("");
      return;
    }

    const expense = {
      name: name,
      cost: parseInt(cost),
    };
    if (action === "Reduce") {
      dispatch({
        type: "RED_EXPENSE",
        payload: expense,
      });
    } else {
      dispatch({
        type: "ADD_EXPENSE",
        payload: expense,
      });
    }
  };

  return (
    <div>
      <div className="row">
        <div className="input-group mb-3" style={{ marginLeft: "2rem" }}>
          <div className="input-group-prepend">
            <label className="input-group-text" htmlFor="inputGroupSelect01">
              Department
            </label>
          </div>
          <select
            className="custom-select"
            id="inputGroupSelect01"
            onChange={(event) => setName(event.target.value)}
          >
            <option defaultValue>Choose...</option>
            <option value="Marketing" name="marketing">
              Marketing
            </option>
            <option value="Sales" name="sales">
              Sales
            </option>
            <option value="Finance" name="finance">
              Finance
            </option>
            <option value="HR" name="hr">
              HR
            </option>
            <option value="IT" name="it">
              IT
            </option>
            <option value="Admin" name="admin">
              Admin
            </option>
          </select>

          <div className="input-group-prepend" style={{ marginLeft: "2rem" }}>
            <label className="input-group-text" htmlFor="inputGroupSelect02">
              Allocation
            </label>
          </div>
          <select
            className="custom-select"
            id="inputGroupSelect02"
            onChange={(event) => setAction(event.target.value)}
          >
            <option defaultValue value="Add" name="Add">
              Add
            </option>
            <option value="Reduce" name="Reduce">
              Reduce
            </option>
          </select>
          <p
            style={{ marginLeft: "10px", fontSize: "22px", marginRight: "5px" }}
          >
            {selectedCurrency}
          </p>

          <input
            required="required"
            type="number"
            id="cost"
            value={cost}
            style={{ size: 10 }}
            onChange={(event) => setCost(event.target.value)}
          ></input>

          <button
            className="btn btn-primary"
            onClick={submitEvent}
            style={{ marginLeft: "2rem" }}
          >
            Save
          </button>
        </div>
      </div>
      <select
        className="currency-select"
        id="inputGroupSelect02"
        style={{ width: "120px", backgroundColor:'greenyellow' }}
        onChange={handleCurrencyChange}
      >
        <option defaultValue>£</option>
        <option value="$" name="dollar">
          Dollar $
        </option>
        <option value="£" name="pound">
          Pound £
        </option>
        <option value="€" name="euro">
          Euro €
        </option>
      </select>
    </div>
  );
};

export default AllocationForm;
