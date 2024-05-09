import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import './Success.scss'; // Import du fichier CSS

const Success = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const params = new URLSearchParams(search);

  return (
    <div className="success">
      <div className="welcome-text">Bienvenue cher utilisateur !</div>
      <div className="success-message">
        Votre compte a été créé avec succès !
      </div>
      {/* Optionnel : bouton pour rediriger l'utilisateur */}
      <button className="button" onClick={() => navigate('/')}>
        Retour à l'accueil
      </button>
    </div>
  );
};

export default Success;
