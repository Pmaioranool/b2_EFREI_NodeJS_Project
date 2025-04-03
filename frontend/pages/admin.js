import { useState } from "react";

export default function Forum() {
  const [message, setMessage] = useState({ type: "", text: "" });

    const [banEmail, setBanEmail] = useState("");
    const [unBanEmail, setUnBanEmail] = useState("");

  const handleBan = async (e) => {
    e.preventDefault();

    const payload = {
      email: banEmail,
    };

    try {
      const response = await fetch('http://localhost:3000/api/users/ban', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
        const data = await response.json();
        if (data.message) {
            setMessage({ type: "error", text: data.message });
            }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  const handleUnBan = async (e) => {
    e.preventDefault();

    const payload = {
      email: unBanEmail,
    };

    try {
      const response = await fetch('http://localhost:3000/api/users/unBan', {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
        const data = await response.json();
        if (data.message) {
            setMessage({ type: "error", text: data.message });
            }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };


  return (
    <section class="admin-container">
    <form onSubmit={handleBan}>
        <input type="hidden" name="ban" value="ban" />
        <input type="text" placeholder="Email" value={banEmail}
            onChange={(e) => setBanEmail(e.target.value)}
            required
        />
        <input type="submit" class="submit" value="Ban User" />
    </form>
    <form onSubmit={handleUnBan}>
        <input type="hidden" name="ban" value="unBan" />
        <input type="text" placeholder="Email" value={unBanEmail}
            onChange={(e) => setUnBanEmail(e.target.value)}
            required
            />
        <input type="submit" class="submit" value="UnBan User" />
    </form>
    {message.text && (
        <p className={message.type === "error" ? "error" : "success"}>{message.text}</p>
      )}
</section>

  );
}

/*
<section class="admin-container">
    <form action="/admin" method="post">
        <input type="hidden" name="ban" value="ban">
        <input type="text" name="email" placeholder="Email">
        <input type="submit" class="submit" value="bannir l'utilisateur">
    </form>
    <form action="/admin" method="post">
        <input type="hidden" name="ban" value="unban">
        <input type="text" name="email" placeholder="Email">
        <input type="submit" class="submit" value="débannir l'utilisateur">
    </form>
    <?php
    if (isset($data['error'])) {
        echo '<p class="error">' . $data['error'] . '</p>';
    }
    if (isset($data['succes'])) {
        echo '<p class="success">' . $data['succes'] . '</p>';
    }

    ?>
</section>
*/