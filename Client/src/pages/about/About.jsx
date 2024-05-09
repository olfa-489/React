import React from 'react';
import './About.scss';
import { motion } from 'framer-motion';

const About = () => {
  return (
    <motion.div
      className="about-container"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      <h1>À propos de la Plateforme</h1>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.2, duration: 0.5 }}
      >
        La Plateforme ÉcoGest est un projet dédié à la gestion durable des
        déchets, opérant dans le cadre d'une gouvernance environnementale. Notre
        plateforme vise à faciliter les échanges de déchets entre différentes
        parties prenantes, sans objectif lucratif. Nous croyons fermement en la
        responsabilité sociale et environnementale, et notre objectif principal
        est de promouvoir des pratiques durables de gestion des déchets pour
        contribuer à la préservation de notre environnement.
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.4, duration: 0.5 }}
      >
        Contrairement à de nombreuses autres initiatives commerciales, notre
        plateforme est entièrement axée sur la durabilité et le bien-être de
        notre planète. Nous croyons en la puissance de la collaboration et de
        l'échange pour créer un impact positif sur notre environnement, tout en
        offrant des opportunités durables pour toutes les parties impliquées.
      </motion.p>
      <motion.p
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6, duration: 0.5 }}
      >
        En tant qu'organisation à but non lucratif, nous sommes motivés par
        notre engagement envers la durabilité et la responsabilité sociale. Nous
        travaillons en étroite collaboration avec des partenaires et des parties
        prenantes pour développer des solutions innovantes et efficaces pour la
        gestion des déchets, tout en promouvant une culture de conscience
        environnementale et de responsabilité partagée.
      </motion.p>
      <motion.img
              src="./images/about.jpg" // Insérez votre chemin d'accès à l'image ici
        alt="EcoGest Image"
        className="eco-gest-image" // Ajoutez une classe CSS pour styliser l'image
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.8, duration: 0.5 }}
      />
    </motion.div>
  );
};

export default About;
