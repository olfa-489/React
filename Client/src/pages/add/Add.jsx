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
  const [state, dispatch] = useReducer(gigReducer, INITIAL_STATE);
  const [uploading, setUploading] = useState(false); // Added uploading state

  const handleChange = (e) => {
    dispatch({
      type: 'CHANGE_INPUT',
      payload: { name: e.target.name, value: e.target.value },
    });
  };

  const handleUpload = async () => {
    setUploading(true);
    try {
      const imgC = await upload(singleFile);

      const images = await Promise.all(
        [...files].map(async (file) => {
          const url = await upload(file);
          return url;
        })
      );
      console.log(images);
      setUploading(false);
      dispatch({ type: 'ADD_IMAGES', payload: { imgC, images } });
    } catch (err) {
      console.log(err);
    }
  };

  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const mutation = useMutation({
    mutationFn: (gig) => {
      return newRequest.post('/gigs/', gig);
    },
    onSuccess: (data) => {
      queryClient.invalidateQueries(['myGigs']);
      // Redirect to gig page based on category
      navigate(`/gig/?categ=${categ}`);
    },
    onError: (error) => {
      console.error('Mutation Error:', error);
    },
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Check if all necessary data is present in state
    if (
      state.title &&
      state.categ &&
      state.descr &&
      state.imgC &&
      state.images.length > 0 &&
      state.userId
    ) {
      mutation.mutate(state);
      // Redirect to myGigs page
      navigate('/myGigs');
    } else {
      console.error('Les données du formulaire sont incomplètes');
      alert('Les données du formulaire sont incomplètes');
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
              <option value="vide">Vide</option>
              <option value="plastique">Plastiques</option>
              <option value="plastique">Textiles</option>
              <option value="plastique">Papiers</option>
              <option value="métaux">Cristaux</option>
              <option value="métaux">Bois</option>
              <option value="métaux">Métaux</option>
              <option value="domestique">Déchets domestiques</option>
              <option value="electronique">Déchets électroniques</option>
              <option value="electromenager">Déchets biologiques-biomédicaux</option>
              <option value="electromenager">Déchets Alimentaires</option>
              <option value="electromenager">Autres</option>
            </select>
            <div className="images">
              <div className="imagesInputs">
                <label htmlFor="">Image de couverture</label>
                <input
                  type="file"
                  onChange={(e) => setSingleFile(e.target.files[0])}
                />
                <label htmlFor="">Images de l'offre</label>
                <input
                  type="file"
                  multiple
                  onChange={(e) => setFiles(e.target.files)}
                />
              </div>
              <button onClick={handleUpload}>
                {uploading ? 'uploading' : 'Upload'}
              </button>
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

            <button onClick={handleSubmit} disabled={uploading}>
              Créer
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Add;
