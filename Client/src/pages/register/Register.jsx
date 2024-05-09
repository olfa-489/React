import React, { useState } from 'react';
import upload from '../../utils/upload.js';
import './Register.scss';
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';

function Register() {
  const [file, setFile] = useState(null);
  const [user, setUser] = useState({
    username: '',
    email: '',
    password: '',
    img: '',
    country: '',
    isSeller: false,
    desc: '',
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    setUser((prev) => {
      return { ...prev, [e.target.name]: e.target.value };
    });
  };

  const handleSellerToggle = (e) => {
    setUser((prev) => {
      return { ...prev, isSeller: e.target.checked };
    });
  };
  const handleSubmit = async (e) => {
    e.preventDefault();

     // Check for empty fields
     if (!username || !email || !password || !file || !country) {
       alert('priére de remplir tous les champs !');
       return; // Prevent navigation
     }

    const url = await upload(file);
    try {
      await newRequest.post('/auth/register', {
        ...user,
        img: url,
      });
      navigate('/success');
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="register">
      <form onSubmit={handleSubmit}>
        <div className="left">
          <h1>Créer un nouveau compte</h1>
          <label htmlFor="username">Nom d'utilisateur</label>
          <input
            id="username"
            name="username"
            type="text"
            placeholder="Votre nom d'utilisateurs"
            onChange={handleChange}
          />

          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            placeholder="email"
            onChange={handleChange}
          />

          <label htmlFor="password">Mot De Passe</label>
          <input
            id="password"
            name="password"
            type="password"
            placeholder="Mot de passe "
            onChange={handleChange}
          />

          <label htmlFor="file">Photo de Profile</label>
          <input type="file" onChange={(e) => setFile(e.target.files[0])} />

          <label htmlFor="country">Ville</label>
          <input
            id="country"
            name="country"
            type="text"
            placeholder="Tunisie"
            value={user.country} // Use value instead of defaultValue
            onChange={handleChange}
          />

          <button type="submit" onChange={handleSubmit}>Rejoindre</button>
        </div>

        <div className="right">
          <h1>Je voudrais devenir un vendeur</h1>
          <div className="toggle">
            <label htmlFor="sellerToggle">Activer le compte vendeur !</label>
            <label className="switch">
              <input
                id="sellerToggle"
                type="checkbox"
                onChange={handleSellerToggle}
              />
              <span className="slider round"></span>
            </label>
          </div>

          <label htmlFor="phone">Téléphone</label>
          <input
            id="phone"
            name="phone"
            type="text"
            placeholder="+216 234 567 89"
            onChange={handleChange}
          />

          <label htmlFor="desc">Êtes-vous un citoyen ou une entreprise ?</label>
          <textarea
            id="desc"
            placeholder="Réponse "
            name="desc"
            cols="30"
            rows="10"
            onChange={handleChange}
          ></textarea>
        </div>
      </form>
    </div>
  );
}

export default Register;
