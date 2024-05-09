import React from 'react';
import './ProjectCard.scss';
import '../../data.js'

function ProjectCard({ card }) {
  return (
    <div className="projectCard">
      <img src={card.img} alt="" />
      <div className="info">
        <div className="texts">
          <h2>{card.cat}</h2>
          <span>{card.title}</span>
        </div>
      </div>
    </div>
  );
}

export default ProjectCard;
