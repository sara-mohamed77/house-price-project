import { useState } from "react";
import "./App.css";

function App() {
  const [formData, setFormData] = useState({
    location: "mumbai",
    carpet_area_sqft: 800,
    super_area_sqft: 1000,
    floor_num: 5,
    Bathroom_num: 2,
    Balcony_num: 1,
    Car_Parking_num: 1,
    furnishing: "Semi-Furnished",
    transaction: "Resale",
    ownership: "Freehold",
    facing: "East",
    overlooking: "Garden/Park",
    society: "Other",
  });

  const [prediction, setPrediction] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({
      ...formData,
      [name]: [
        "carpet_area_sqft",
        "super_area_sqft",
        "floor_num",
        "Bathroom_num",
        "Balcony_num",
        "Car_Parking_num",
      ].includes(name)
        ? Number(value)
        : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setPrediction(null);
    setError("");

    try {
      const response = await fetch("http://127.0.0.1:8000/api/predict", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error("Prediction request failed");
      }

      const data = await response.json();

      setPrediction(data.predicted_price);
    } catch (err) {
      setError(
        "Unable to connect to the prediction API. Make sure the backend is running."
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="app">
      <div className="container">
        <h1>🏠 House Price Prediction</h1>

        <p className="subtitle">
          Enter the property details to estimate its price.
        </p>

        <form onSubmit={handleSubmit}>
          <div className="grid">
            <div className="field">
              <label>Location</label>
              <input
                name="location"
                value={formData.location}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Carpet Area (sqft)</label>
              <input
                type="number"
                name="carpet_area_sqft"
                value={formData.carpet_area_sqft}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Super Area (sqft)</label>
              <input
                type="number"
                name="super_area_sqft"
                value={formData.super_area_sqft}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Floor</label>
              <input
                type="number"
                name="floor_num"
                value={formData.floor_num}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Bathrooms</label>
              <input
                type="number"
                name="Bathroom_num"
                value={formData.Bathroom_num}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Balcony</label>
              <input
                type="number"
                name="Balcony_num"
                value={formData.Balcony_num}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Car Parking</label>
              <input
                type="number"
                name="Car_Parking_num"
                value={formData.Car_Parking_num}
                onChange={handleChange}
                required
              />
            </div>

            <div className="field">
              <label>Furnishing</label>
              <select
                name="furnishing"
                value={formData.furnishing}
                onChange={handleChange}
              >
                <option>Semi-Furnished</option>
                <option>Fully Furnished</option>
                <option>Unfurnished</option>
              </select>
            </div>

            <div className="field">
              <label>Transaction</label>
              <select
                name="transaction"
                value={formData.transaction}
                onChange={handleChange}
              >
                <option>Resale</option>
                <option>New Property</option>
              </select>
            </div>

            <div className="field">
              <label>Ownership</label>
              <select
                name="ownership"
                value={formData.ownership}
                onChange={handleChange}
              >
                <option>Freehold</option>
                <option>Leasehold</option>
              </select>
            </div>

            <div className="field">
              <label>Facing</label>
              <select
                name="facing"
                value={formData.facing}
                onChange={handleChange}
              >
                <option>East</option>
                <option>West</option>
                <option>North</option>
                <option>South</option>
              </select>
            </div>

            <div className="field">
              <label>Overlooking</label>
              <select
                name="overlooking"
                value={formData.overlooking}
                onChange={handleChange}
              >
                <option>Garden/Park</option>
                <option>Main Road</option>
                <option>Pool</option>
                <option>Others</option>
              </select>
            </div>

            <div className="field">
              <label>Society</label>
              <input
                name="society"
                value={formData.society}
                onChange={handleChange}
              />
            </div>
          </div>

          <button type="submit" disabled={loading}>
            {loading ? "Predicting..." : "Predict Price"}
          </button>
        </form>

        {prediction !== null && (
          <div className="result">
            <h2>Predicted Price</h2>
            <p>{Number(prediction).toLocaleString()}</p>
          </div>
        )}

        {error && <div className="error">{error}</div>}
      </div>
    </div>
  );
}

export default App;