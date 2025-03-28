import { useState, useEffect } from "react";

export default function AuthForm() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [message, setMessage] = useState({ type: "", text: "" });

  useEffect(() => {
    const container = document.getElementById("container");
    if (container) {
      if (isSignUp) {
        container.classList.add("active");
      } else {
        container.classList.remove("active");
      }
    }
  }, [isSignUp]); // Met à jour l'affichage quand isSignUp change

  return (
    <div className="container" id="container">
      {/* Formulaire d'inscription */}
      <div className="form-container sign-up">
        <form action="/log" method="post">
          <h1>Créer un compte</h1>
          {/* <div className="social-icons">
            <a href="#" className="icon">
              <i className="fa-brands fa-google-plus-g"></i>
            </a>
            <a href="#" className="icon">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" className="icon">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="#" className="icon">
              <i className="fa-brands fa-steam"></i>
            </a>
          </div> */}
          <span>ou utiliser votre email pour créer votre compte</span>
          <input type="hidden" name="register" value="register" />
          <input type="email" name="email" placeholder="email" required />
          <input type="text" name="name" placeholder="nom" required />
          <input
            type="password"
            name="password"
            placeholder="mot de passe"
            required
          />
          <input
            type="password"
            name="password2"
            placeholder="confirmer votre mot de passe"
            required
          />
          <input type="submit" className="submit" value="S'enregistrer" />
        </form>
      </div>

      {/* Formulaire de connexion */}
      <div className="form-container sign-in">
        <form action="/" method="post">
          <h1>Connexion</h1>
          {/* <div className="social-icons">
            <a href="#" className="icon">
              <i className="fa-brands fa-google-plus-g"></i>
            </a>
            <a href="#" className="icon">
              <i className="fa-brands fa-facebook-f"></i>
            </a>
            <a href="#" className="icon">
              <i className="fa-brands fa-github"></i>
            </a>
            <a href="#" className="icon">
              <i className="fa-brands fa-steam"></i>
            </a>
          </div> */}
          <span>ou utiliser votre email et mot de passe</span>
          <input type="hidden" name="register" value="login" />
          <input type="email" name="email" placeholder="email" required />
          <input
            type="password"
            name="password"
            placeholder="mot de passe"
            required
          />
          <a href="#">Mot de passe oublié?</a>
          <input type="submit" className="submit" value="Se connecter" />
        </form>
      </div>

      {/* Panneau de bascule entre connexion et inscription */}
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Bon retour parmi nous!</h1>
            <p>
              Entrez vos données personnelles pour profiter de toutes les
              fonctionnalités
            </p>
            <button onClick={() => setIsSignUp(false)}>Se connecter</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Bienvenue citoyen!</h1>
            <p>
              Enregistrez-vous avec vos données personnelles pour profiter de
              toutes les fonctionnalités
            </p>
            <button onClick={() => setIsSignUp(true)}>S'enregistrer</button>
          </div>
        </div>
      </div>

      {/* Messages d'erreur ou de succès */}
      {message.text && (
        <p className={message.type === "error" ? "error" : "success"}>
          {message.text}
        </p>
      )}
    </div>
  );
}
