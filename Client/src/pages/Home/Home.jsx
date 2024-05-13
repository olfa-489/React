import React from 'react';
import './Home.scss';
import Featured from '../../components/featured/Featured';
import Slide from '../../components/slide/Slide';
import { cards, projects } from '../../data.js';
import CatCard from '../../components/catCard/CatCard';
import ProjectCard from '../../components/projectCard/ProjectCard';

const Home = () => {
  return (
    <div className="home">
      <Featured />
      <div className="titre">Catégories des déchets</div>
      <Slide slidesToShow={4} arrowsScroll={4}>
        {cards.map((card) => (
          <CatCard key={card.id} card={card} />
        ))}
      </Slide>
      <div className="features">
        <div className="container">
          <div className="item">
            <h1>
              Notre mission consiste à réduire les déchets et à soutenir les
              petites entreprises.
            </h1>
            <div className="title">
              <img src="images/check.png" alt="" />
              La meilleur solution pour minimiser les déchets
            </div>
            <p>
              Au lieu de deposer ces déchets dans la nature on les offre pour
              les petites entreprises ou bien les ateliers de recyclage .{' '}
            </p>
            <div className="title">
              <img src="images/check.png" alt="" />
              Aider les entreupreuneurs à entamer leurs projets .{' '}
            </div>
            <p>On transforme les déchets en source économique</p>
            <div className="title">
              <img src="images/check.png" alt="" />
              La meilleur solution pour le developpement durables.
            </div>
            <p>
              Création des opportunités eco-frindly : minimiser les déchets et
              augmenter le nombre des projets .
            </p>
          </div>
          <div className="item">
            <video src="./images/video.mp4"></video>
          </div>
        </div>
      </div>
      {/* other component for features*/}
      <div className="features dark">
        <div className="container">
          <div className="item">
            <h1>Eco.Gest Plateforme</h1>
            <h1>
              Plateforme d'échange qui convertit l'inutile en opportunité
              commerciale.
            </h1>
            <p>
              Une plateforme d'échange innovante qui transforme les déchets en
              ressources commerciales tout en préservant l'environnement. Créez
              des opportunités lucratives en valorisant ce qui serait autrement
              considéré comme inutile.
            </p>
            <div className="title">
              <img src="./images/check.png" alt="" />
              Nous vous accompagnons dans le lancement de votre projet tout en
              préservant un environnement sain.
            </div>
            <div className="title">
              <img src="./images/check.png" alt="" />
              Minimiser les déchets deposer dans l'environnement .
            </div>
            <div className="title">
              <img src="./images/check.png" alt="" />
              Trouver des solutions bénéfiques pour les citoyens et
              l'écosysteme.
            </div>
            <button>Explorer Eco.Ges</button>
          </div>
          <div className="item">
            <img src="./images/img.png" controls />
          </div>
        </div>
      </div>
      {/*Idées de projets à partir des déchets */}
      <div className="titre">Explorer des Projets</div>

      <Slide slidesToShow={4} arrowsScroll={4}>
        {projects.map((card) => (
          <ProjectCard key={card.id} card={card} />
        ))}
      </Slide>
    </div>
  );
};

export default Home;
