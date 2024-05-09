import React, { useEffect, useState } from 'react';
import './Navbar.scss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import newRequest from '../../utils/newRequest';

const Navbar = () => {
  const [active, setActive] = useState(false);
  const [open, setOpen] = useState(false); // State for controlling the dropdown menu
  const { pathname } = useLocation();

  const isActive = () => {
    window.scrollY > 0 ? setActive(true) : setActive(false);
  };

  useEffect(() => {
    window.addEventListener('scroll', isActive);
    return () => {
      window.removeEventListener('scroll', isActive);
    };
  }, []);

  let currentUser = null;
  try {
    const currentUserJSON = localStorage.getItem('currentUser');
    if (currentUserJSON) {
      currentUser = JSON.parse(currentUserJSON);
    }
  } catch (error) {
    console.error('Error parsing currentUser from localStorage:', error);
  }

  const navigate = useNavigate();

  const handleLogout =  () => {
    try {
      newRequest.post('/auth/logout');
      localStorage.removeItem('currentUser');
      navigate('/');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className={active || pathname !== '/' ? 'navbar active' : 'navbar'}>
      <div className="container">
        <div className="logo">
          <Link to="/" className="link">
            <span className="text">Eco.Gest</span>
          </Link>
        </div>
        <div className="links">
          <span>
            <a href="about">A propos de Eco.Gest</a>
          </span>
          <span>Français</span>
          {!currentUser?.isSeller && <span>Devenir un vendeur </span>}
          {currentUser ? (
            <div className="user" onClick={() => setOpen(!open)}>
              <img src={currentUser.img || '/images/noavatar.jpg'} alt="" />
              <span>{currentUser?.username}</span>
              {open && (
                <div className="options">
                  {currentUser.isSeller && (
                    <>
                      <Link className="link" to="/myGigs">
                        services
                      </Link>
                      <Link className="link" to="/add">
                        Ajouter un service
                      </Link>
                    </>
                  )}

                  <Link className="link" to="/orders">
                    commandes
                  </Link>
                  <Link className="link" to="/messages">
                    Messages
                  </Link>
                  <Link className="link" to="/" onClick={handleLogout}>
                    Deconnecter
                  </Link>
                </div>
              )}
            </div>
          ) : (
            <>
              <Link to="/login" className="link">
                Se Connecter
              </Link>
              <Link className="link" to="/register">
                <button>Rejoindre</button>
              </Link>
            </>
          )}
        </div>
      </div>
      {(active || pathname !== '/') && (
        <>
          <hr />
          <div className="menu">
            <Link className="link" to="">
              Bouteilles en verre
            </Link>
            <Link className="link" to="">
              Papiers
            </Link>
            <Link className="link" to="">
              Boîtes de conserve
            </Link>
            <Link className="link" to="">
              Vêtements
            </Link>
            <Link className="link" to="">
              Déchets alimentaires
            </Link>
            <Link className="link" to="">
              Pneus
            </Link>
            <Link className="link" to="">
              Bois
            </Link>
            <Link className="link" to="">
              plastique
            </Link>
            <Link className="link" to="">
              Métal
            </Link>
            <Link className="link" to="">
              Pièces électroniques
            </Link>
            <Link className="link" to="">
              Sachets
            </Link>
            <Link className="link" to="">
              Autre
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default Navbar;
