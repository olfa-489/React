import './Featured.scss';
import { useNavigate } from 'react-router-dom';
import React, { useState } from 'react';

const Featured = () => {
  const [input, setInput] = useState('');
  const navigate = useNavigate();

  const handleSubmit = () => {
    navigate(`/gigs?search=${input}`);
  };

  return (
    <div className="featured">
      <div className="container">
        <div className="left">
          <h1>
            {' '}
            Échangez des déchets, <i>créez</i> des opportunités durables
          </h1>
          <div className="search">
            <div className="searchInput">
              <img src="images/search.png" alt="" />
              <input
                type="text"
                placeholder="Rechercher"
                onChange={(e) => setInput(e.target.value)}
              />
            </div>
            <button onClick={handleSubmit}>Chercher</button>
          </div>
          <div className="populaire">
            <span>Populaire :</span>
            <button>Papiers</button>
            <button>Bois</button>
            <button>Plastique</button>
            <button>déchets Organiques</button>
          </div>
        </div>
        <div className="right">
          <img src="images/bg1.png" alt="Not Fount .." />
        </div>
      
      </div>
    </div>
  );
};

export default Featured;
