import React from 'react';
import './Footer.scss';

function Footer() {
  return (
    <div className="footer">
      <div className="container">
        <div className="top">
          <div className="item">
            <h2>Catégories</h2>
            <span>déchets organiques</span>
            <span> Différent types de Papiers</span>
            <span>Plastiques</span>
            <span> Des métaux</span>
            <span>Déchets électroniques ou e-déchets</span>

            <span> Bois </span>
            <span>Des fils </span>
            <span>Cristals</span>
            <span>Déchets biologiques ou biomédicaux </span>
            <span>Déchets domestiques </span>
          </div>
          <div className="item">
            <h2> A Propos</h2>
            <span>Echange des déchets</span>
            <span>Depot des déchets</span>
            <span>Idées de projets : Eco Frindly </span>
            <span>Minimiser les waste dans l'écosystéme</span>
            <span>Fournir la matiére primaire aux petites entreprises</span>
            <span>Collaborer entre les secteurs privé et public</span>
            <span></span>
          </div>
          <div className="item">
            <h2>Soutien</h2>
            <span>Aide & Support</span>
            <span>Confiance & Sécurité</span>
            <span>Vendre sur Eco.Gest</span>
            <span>Acheter sur eco.Gest</span>
            <span>Echanger sur eco.Gest</span>
            <span>Collaborer </span>
          </div>
        </div>
        <hr />
        <div className="bottom">
          <div className="left">
            <h2>Eco.Gest</h2>
            <span>©Tous les droits sont reservés 2024</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Footer;
