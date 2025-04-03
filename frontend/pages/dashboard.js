import { useEffect, useState } from "react";

const Dashboard = () => {
  const [userProfile, setUserProfile] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      fetch(`http://localhost:3000/dashboard/${id}`, {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          setUserProfile(data);
        })
        .catch((error) => console.error("Error fetching profile:", error));
    } else {
      console.error("No token found. Please log in.");
      window.location.href = "/login";
    }
  }, []);

  return (
    <div>
      <h1>Dashboard</h1>
      {userProfile ? (
        <div>
          <p>Nom : {userProfile.name}</p>
          <p>Email : {userProfile.email}</p>
        </div>
      ) : (
        <p>Chargement des informations du profil...</p>
      )}
    </div>
  );
};

export default Dashboard;
