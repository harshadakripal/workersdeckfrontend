import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../api/axios";
import HeroSection from "../components/HeroSection";
import "../pages/Dashboard.css";

const Dashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [users, setUsers] = useState([]);
  const [adminBookings, setAdminBookings] = useState([]);
  const [services, setServices] = useState([]);
  const [activeAdminView, setActiveAdminView] = useState("");
  const [showAddForm, setShowAddForm] = useState(false);
  const [newService, setNewService] = useState({ name: "", description: "", price: "" });
  const [workerBookings, setWorkerBookings] = useState([]);

  const token = localStorage.getItem("token");

  const backgroundImgMap = {
    client: "/images/dashboard-client.jpg",
    customer: "/images/dashboard-client.jpg",
    worker: "/images/dashboard-worker.jpg",
    admin: "/images/dashboard-default.jpg",
  };
  const roleKey = user?.role?.toLowerCase();
  const backgroundImage = backgroundImgMap[roleKey] || "/images/dashboard-default.jpg";

  const updateStatus = async (id, status) => {
    try {
      await axiosInstance.put(
        `/api/bookings/worker/update-status/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setWorkerBookings((prev) =>
        prev.map((b) => (b.id === id ? { ...b, status } : b))
      );
    } catch (err) {
      alert("Failed to update status");
    }
  };

  useEffect(() => {
    if (!token) {
      navigate("/login");
      return;
    }

    axiosInstance.get("/api/auth/me", {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then((res) => {
      setUser(res.data.user);
      setBookings(res.data.bookings || []);
    })
    .catch((err) => {
      setError("❌ Session expired or unauthorized");
      localStorage.removeItem("token");
      navigate("/login");
    })
    .finally(() => {
      setLoading(false);
    });
  }, [navigate, token]);

  useEffect(() => {
    if (user?.role === "worker") {
      axiosInstance.get("/api/bookings/worker/my-bookings", {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setWorkerBookings(res.data))
      .catch((err) => console.error("Error fetching worker bookings", err));
    }
  }, [user, token]);

  const handleCancelBooking = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await axiosInstance.delete(`/api/bookings/${bookingId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBookings(bookings.filter((b) => b.id !== bookingId));
    } catch (err) {
      alert("Failed to cancel booking.");
    }
  };

  const fetchAdminData = async (type) => {
    console.log("🔄 fetchAdminData called with:", type);
    try {
      if (type === "users") {
        const res = await axiosInstance.get("/api/bookings/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(res.data);
      }
  
      if (type === "bookings") {
        const res = await axiosInstance.get("/api/bookings/admin/bookings", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setAdminBookings(res.data);
  
        // ✅ Fetch users as well so we can assign workers
        const userRes = await axiosInstance.get("/api/bookings/admin/users", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setUsers(userRes.data);
      }
  
      if (type === "services") {
        const res = await axiosInstance.get("/api/bookings/admin/services", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setServices(res.data);
      }
  
      setActiveAdminView(type);
    } catch (err) {
      console.error(`❌ Failed to fetch ${type}:`, err);
    }
  };
  

  const handleDeleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;
    try {
      await axiosInstance.delete(`/api/bookings/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setUsers(users.filter((u) => u.id !== id));
    } catch (err) {
      alert("Failed to delete user.");
    }
  };

  const handleDeleteService = async (id) => {
    if (!window.confirm("Are you sure you want to delete this service?")) return;
    try {
      await axiosInstance.delete(`/api/bookings/admin/services/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setServices(services.filter((s) => s.id !== id));
    } catch (err) {
      alert("Failed to delete service.");
    }
  };

  const handleEditService = (service) => {
    const newName = prompt("Edit service name:", service.name);
    const newDescription = prompt("Edit description:", service.description || "");
    const newPrice = prompt("Edit price:", service.price || 0);
    if (!newName || !newPrice) return;

    axiosInstance.put(`/api/bookings/admin/services/${service.id}`, {
      name: newName,
      description: newDescription,
      price: parseFloat(newPrice),
    }, {
      headers: { Authorization: `Bearer ${token}` },
    })
    .then(() => fetchAdminData("services"))
    .catch(() => alert("Failed to update service."));
  };

  const handleAddService = async () => {
    if (!newService.name || !newService.price) {
      alert("Name and Price are required.");
      return;
    }
    try {
      await axiosInstance.post("/api/bookings/admin/services", newService, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setNewService({ name: "", description: "", price: "" });
      setShowAddForm(false);
      fetchAdminData("services");
    } catch (err) {
      alert("Failed to add service.");
    }
  };

  const assignWorker = async (bookingId, workerId) => {
    try {
      await axiosInstance.put(`/api/bookings/admin/assign-worker/${bookingId}`, {
        worker_id: workerId
      }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchAdminData("bookings"); // Refresh list
    } catch (err) {
      alert("Failed to assign worker.");
    }
  };
  

  if (loading) return <div className="dashboard"><p>Loading dashboard...</p></div>;
  if (error) return <div className="dashboard"><p className="error">{error}</p></div>;

  const filteredWorkers = users.filter(
    (u) => u.role?.toLowerCase().trim() === "worker"
  );
  console.log("All users:", users);
  console.log("Filtered workers:", filteredWorkers);
  

  return (
    <>
      <HeroSection />
      <div className="dashboard-bg-wrapper" style={{ backgroundImage: `url(${backgroundImage})` }}>
        <div className="dashboard-overlay">
          <div className="dashboard">
            <div className="user-info">
              <h2>Welcome, {user.name}</h2>
              <p><strong>Email:</strong> {user.email}</p>
              <p><strong>Phone:</strong> {user.phone}</p>
              <p><strong>Role:</strong> {user.role}</p>
            </div>

            {["client", "customer"].includes(user.role) && (
  <div className="booking-section">
    <h3>Your Bookings</h3>
    {bookings.length > 0 ? (
      <div className="booking-cards">
        {bookings.map((booking) => (
          <div className="booking-card" key={booking.id}>
            <h4>{booking.service_name}</h4>
            <p><strong>Date:</strong> {new Date(booking.booking_date).toLocaleDateString()}</p>
            <p><strong>Time:</strong> {booking.booking_time}</p>
            <p><strong>Address:</strong> {booking.address}</p>
            <p><strong>Status:</strong> {booking.status}</p>
            <p><strong>Assigned Worker:</strong> {booking.worker_name || "Not assigned yet"}</p>
            <button className="cancel-btn" onClick={() => handleCancelBooking(booking.id)}>Cancel Booking</button>
          </div>
        ))}
      </div>
    ) : <p>No bookings found.</p>}
  </div>
)}


            {user.role === "admin" && (
              <div className="admin-panel">
                <h3>Admin Control Panel</h3>
                <div className="admin-buttons">
                  <button onClick={() => fetchAdminData("users")}>View All Users</button>
                  <button onClick={() => fetchAdminData("bookings")}>View All Bookings</button>
                  <button onClick={() => fetchAdminData("services")}>View All Services</button>
                </div>

                {activeAdminView === "users" && (
                  <div className="admin-data">
                    <h4>Users</h4>
                    <table>
                      <thead><tr><th>ID</th><th>Name</th><th>Email</th><th>Role</th><th>Actions</th></tr></thead>
                      <tbody>
                        {users.map(u => (
                          <tr key={u.id}>
                            <td>{u.id}</td>
                            <td>{u.name}</td>
                            <td>{u.email}</td>
                            <td>{u.role}</td>
                            <td><button onClick={() => handleDeleteUser(u.id)}>🗑️</button></td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

{activeAdminView === "bookings" && (
  <div className="admin-data">
    <h4>Bookings</h4>
    <table>
      <thead>
        <tr>
          <th>User</th>
          <th>Service</th>
          <th>Date</th>
          <th>Time</th>
          <th>Address</th>
          <th>Assigned Worker</th>
          <th>Status</th>
        </tr>
      </thead>
      <tbody>
        {adminBookings.map((b) => (
          <tr key={b.booking_id}>
            <td>{b.user_name}</td>
            <td>{b.service_name}</td>
            <td>{b.booking_date}</td>
            <td>{b.booking_time}</td>
            <td>{b.address}</td>
            <td>{b.worker_name || "Not Assigned"}</td>
            <td>{b.status}</td>
            <td>
  {b.worker_name ? (
    b.worker_name
  ) : (
    <>
      {console.log("📦 Admin Bookings b.worker_name:", b.worker_name)}
      {console.log("🔎 All Users:", users)}
      {console.log("✅ Filtered Workers:", users.filter((u) => u.role?.toLowerCase().trim() === "worker"))}
      <select onChange={(e) => assignWorker(b.booking_id, e.target.value)}>
        <option value="">Assign Worker</option>
        {users
          .filter((u) => u.role?.toLowerCase().trim() === "worker")
          .map((w) => (
            <option key={w.id} value={w.id}>
              {w.name}
            </option>
          ))}
      </select>
    </>
  )}
</td>

          </tr>
        ))}
      </tbody>
    </table>
  </div>
)}


                {activeAdminView === "services" && (
                  <div className="admin-data">
                    <div className="services-header">
                      <h4>Services</h4>
                      <button className="add-service-btn" onClick={() => setShowAddForm(!showAddForm)}>➕ Add Service</button>
                    </div>
                    {showAddForm && (
                      <div className="add-service-form">
                        <input type="text" placeholder="Service Name" value={newService.name} onChange={(e) => setNewService({ ...newService, name: e.target.value })} />
                        <input type="text" placeholder="Description" value={newService.description} onChange={(e) => setNewService({ ...newService, description: e.target.value })} />
                        <input type="number" placeholder="Price" value={newService.price} onChange={(e) => setNewService({ ...newService, price: e.target.value })} />
                        <button onClick={handleAddService}>Submit</button>
                      </div>
                    )}
                    <ul>
                      {services.map((s) => (
                        <li key={s.id}>
                          <strong>{s.name}</strong>
                          <button onClick={() => handleEditService(s)}>✏️</button>
                          <button onClick={() => handleDeleteService(s.id)}>🗑️</button>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>
            )}

            {user.role === "worker" && (
              <div className="booking-section">
                <h3>Assigned Jobs</h3>
                {workerBookings.length === 0 ? <p>No jobs assigned to you yet.</p> : (
                  <div className="booking-cards">
                    {workerBookings.map(b => (
                      <div className="booking-card" key={b.id}>
                        <h4>{b.service_name}</h4>
                        <p><strong>Customer:</strong> {b.customer_name}</p>
                        <p><strong>Address:</strong> {b.address}</p>
                        <p><strong>Date:</strong> {new Date(b.booking_date).toLocaleDateString()}</p>
                        <p><strong>Time:</strong> {b.booking_time}</p>
                        <p><strong>Status:</strong> {b.status}</p>
                        <select value={b.status} onChange={(e) => updateStatus(b.id, e.target.value)}>
                          <option value="Pending">Pending</option>
                          <option value="In Progress">In Progress</option>
                          <option value="Completed">Completed</option>
                        </select>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}
            
          </div>
        </div>
      </div>
    </>
  );
};

export default Dashboard;