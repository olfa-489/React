import React, { useReducer, useState } from 'react';
import './Add.scss';
import { gigReducer, INITIAL_STATE } from '../../reducers/gigReducer';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import { useNavigate } from 'react-router-dom';
import upload from '../../utils/upload';

const Add = () => {
  const [singleFile, setSingleFile] = useState(undefined);
  const [files, setFiles] = useState([]);
  const [uploading, setUploading] = useState(false);

  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);

  const handleChange = (e) => {
    dispatch({
      type: 'CHANGE_INPUT',
      payload: { name: e.target.name, value: e.target.value },
    });
  };
const handleUpload = async () => {
  console.log('Uploading file...');
  setUploading(true);
  try {
    const cover = await upload(singleFile);
    console.log('Cover URL:', cover);

    const images = await Promise.all(
      [...files].map(async (file) => {
        const url = await upload(file);
        return url;
      })
    );
    setUploading(false);
    dispatch({ type: 'ADD_IMAGES', payload: { cover, images } });
  } catch (err) {
    console.log('Error uploading file:', err);
    setUploading(false);
  }
};


  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post('/gigs', gig);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['myGigs']);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
console.log(state);

    if (
      state.userId &&
      state.title &&
      state.categ &&
      state.descr &&
      state.cover &&
      state.images
    ) {
      mutation.mutate(state);
      navigate('/myGigs');
    } else {
      console.error('Les données du formulaire sont incomplètes');
    }
  };

  return (
    <div className="add">
      <div className="container">
        <h1>Ajouter une offre</h1>
        <div className="sections">
          <div className="info">
            <label htmlFor="">Titre</label>
            <input
              name="title"
              type="text"
              placeholder="e.g une quantité de boites en plastique"
              onChange={handleChange}
            />
            <label htmlFor="">Catégorie</label>
            <select name="categ" id="cats" onChange={handleChange}>
              <option value="plastique">Plastique</option>
              <option value="métaux">Métaux</option>
              <option value="cristaux">Cristaux</option>
              <option value="domestique">Déchets domestiques</option>
              <option value="electronique">Déchets électroniques</option>
              <option value="electromenager">Électroménagers</option>
            </select>
            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">Image de Couverture</label>
                <input
                  name="cover"
                  type="file"
                  onChange={handleUpload}
                />
                <label htmlFor="">Images de l'offre</label>
                <input
                  name="images"
                  type="file"
                  multiple
                  onChange={handleUpload}
                />
              </div>
            </div>

            <label htmlFor="">Description</label>
            <textarea
              name="descr"
              id=""
              placeholder="Courte description de votre offre de déchets"
              cols="30"
              rows="16"
              onChange={handleChange}
            ></textarea>

            <button onClick={handleSubmit}>Créer</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
