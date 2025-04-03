import { useEffect, useState, useContext } from "react";
import { useRouter } from "next/router";
import { UserContext } from "./userContext";

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  const [registerEmail, setRegisterEmail] = useState("");
  const [registerUsername, setRegisterUsername] = useState("");
  const [registerPassword, setRegisterPassword] = useState("");
  const [registerPassword2, setRegisterPassword2] = useState("");
  const [registerBirthdate, setRegisterBirthdate] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const { login } = useContext(UserContext);
  const router = useRouter();

  const handleSubmitRegister = async (e) => {
    e.preventDefault();
    if (registerPassword !== registerPassword2) {
      setMessage({ type: "error", text: "Les mots de passe ne correspondent pas" });
      return;
    }

    const payload = {
      email: registerEmail,
      username: registerUsername,
      password: registerPassword,
      password2: registerPassword2,
      birthdate: registerBirthdate,
    };

    try {
      const response = await fetch("http://localhost:3000/api/users/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (data.message) {
        setMessage({ type: "error", text: data.message });
      } else {
        login(data);
        router.push("/");
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  const handleSubmitLogin = async (e) => {
    e.preventDefault();

    const payload = {
      email: loginEmail,
      password: loginPassword,
    };

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });
      const data = await response.json();

      if (data.message) {
        setMessage({ type: "error", text: data.message });
      } else {
        login(data);
        router.push("/");
      }
    } catch (error) {
      setMessage({ type: "error", text: error.message });
    }
  };

  return (
    <div className={`container ${isSignUp ? "active" : ""}`} id='container'>
      {/* Formulaire d'inscription */}
      <div className='form-container sign-up'>
        <form onSubmit={handleSubmitRegister}>
          <h1>Créer un compte</h1>
          <span>ou utiliser votre email pour créer votre compte</span>

          <input
            type='email'
            placeholder='email'
            value={registerEmail}
            onChange={(e) => setRegisterEmail(e.target.value)}
            required
          />
          <input
            type='text'
            placeholder='username'
            value={registerUsername}
            onChange={(e) => setRegisterUsername(e.target.value)}
            required
          />
          <input
            type='password'
            placeholder='mot de passe'
            value={registerPassword}
            onChange={(e) => setRegisterPassword(e.target.value)}
            required
          />
          <input
            type='password'
            placeholder='confirmer votre mot de passe'
            value={registerPassword2}
            onChange={(e) => setRegisterPassword2(e.target.value)}
            required
          />
          <input
            type='date'
            placeholder='vous êtes né(e) le'
            value={registerBirthdate}
            onChange={(e) => setRegisterBirthdate(e.target.value)}
            required
          />
          <input type='submit' className='submit' value="S'enregistrer" />
        </form>
      </div>

      {/* Formulaire de connexion */}
      <div className='form-container sign-in'>
        <form onSubmit={handleSubmitLogin}>
          <h1>Connexion</h1>
          <span>ou utiliser votre email et mot de passe</span>

          <input
            type='email'
            placeholder='email'
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
            required
          />
          <input
            type='password'
            placeholder='mot de passe'
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
            required
          />
          <a href='#'>Mot de passe oublié?</a>
          <input type='submit' className='submit' value='Se connecter' />
        </form>
      </div>

      {/* Panneau de bascule entre connexion et inscription */}
      <div className='toggle-container'>
        <div className='toggle'>
          <div className='toggle-panel toggle-left'>
            <h1>Bon retour parmi nous!</h1>
            <p>Entrez vos données personnelles pour profiter de toutes les fonctionnalités</p>
            <button onClick={() => setIsSignUp(false)}>Se connecter</button>
          </div>
          <div className='toggle-panel toggle-right'>
            <h1>Bienvenue citoyen!</h1>
            <p>
              Enregistrez-vous avec vos données personnelles pour profiter de toutes les
              fonctionnalités
            </p>
            <button onClick={() => setIsSignUp(true)}>S'enregistrer</button>
          </div>
        </div>
      </div>

      {/* Messages d'erreur ou de succès */}
      {message.text && (
        <p className={message.type === "error" ? "error" : "success"}>{message.text}</p>
      )}
    </div>
  );
}
