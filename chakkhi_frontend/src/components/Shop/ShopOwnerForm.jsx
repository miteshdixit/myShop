import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import api, { SHOP_CREATE_URL, SHOP_SIGNUP_URL } from "@/api";

const ShopOwnerForm = ({ email, password, role, username }) => {
  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  const [address, setAddress] = useState("");
  const [contact, setContact] = useState("");
  const [coordinates, setCoordinates] = useState([28.6139, 77.209]); // Default: New Delhi

  const navigate = useNavigate();

  // Custom Marker Component to Update Coordinates on Map Click
  const LocationMarker = () => {
    useMapEvents({
      click(e) {
        setCoordinates([e.latlng.lat, e.latlng.lng]);
      },
    });

    return <Marker position={coordinates}></Marker>;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // console.log()
    try {
      const shopResponse = await api.post(SHOP_CREATE_URL, {
        name,
        category,
        address,
        contact,
        // description,
        location: { type: "Point", coordinates },
      });
      console.log("response", shopResponse);
      const shopId = shopResponse.data.shop._id;

      await api.post(SHOP_SIGNUP_URL, {
        username,
        email,
        password,
        role,
        shop: shopId,
      });

      navigate("/"); // Redirect to login
    } catch (error) {
      console.error("Failed to create shop", error);
      alert("Error creating shop. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100">
      <div className="card w-full max-w-2xl bg-white shadow-lg p-8 rounded">
        <h2 className="text-2xl font-bold text-center mb-6">Create Shop</h2>
        <form onSubmit={handleSubmit}>
          {/* Shop Name */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-semibold">Shop Name</span>
            </label>
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter shop name"
              className="input input-bordered"
              required
            />
          </div>

          {/* Category Dropdown */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-semibold">Category</span>
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="select select-bordered"
              required
            >
              <option value="" disabled>
                Select category
              </option>
              <option value="Grocery">Grocery</option>
              <option value="Clothing">Clothing</option>
              <option value="Electronics">Electronics</option>
              <option value="Other">Other</option>
            </select>
          </div>

          {/* Address */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-semibold">Address</span>
            </label>
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              placeholder="Enter shop address"
              className="input input-bordered"
              required
            />
          </div>

          {/* Contact */}
          <div className="form-control mb-4">
            <label className="label">
              <span className="label-text font-semibold">Contact</span>
            </label>
            <input
              type="tel"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              placeholder="Enter contact number"
              className="input input-bordered"
              pattern="[0-9]{10}"
              title="Enter a valid 10-digit phone number"
            />
          </div>

          {/* Map Picker */}
          <div className="form-control mb-6">
            <label className="label">
              <span className="label-text font-semibold">Location</span>
            </label>
            <div className="h-64 rounded-md overflow-hidden">
              <MapContainer
                center={coordinates}
                zoom={13}
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                  attribution="© OpenStreetMap contributors"
                />
                <LocationMarker />
              </MapContainer>
            </div>
            <p className="mt-2 text-sm">
              Selected Coordinates: {coordinates[0].toFixed(4)},{" "}
              {coordinates[1].toFixed(4)}
            </p>
          </div>

          <button type="submit" className="btn btn-primary btn-block">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
};

export default ShopOwnerForm;
