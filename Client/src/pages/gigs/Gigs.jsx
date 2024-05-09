import React, { useEffect, useRef, useState } from 'react';
import './Gigs.scss';
import GigCard from '../../components/gigCard/GigCard';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';
import { useLocation } from 'react-router-dom';

function Gigs() {
  const [sort, setSort] = useState('sales');
  const [open, setOpen] = useState(false);
  const minRef = useRef();
  const maxRef = useRef();

  const { search } = useLocation();

  const { isLoading, error, data, refetch } = useQuery({
    queryKey: ['gigs'],
    queryFn: () =>
      newRequest
        .get(
          `/gigs${search}&min=${minRef.current.value}&max=${maxRef.current.value}&sort=${sort}`
        )
        .then((res) => {
          return res.data;
        }),
  });

 




  return (
    <div className="gigs">
      <div className="container">
        <span className="breadcrumbs">Eco.Gest | Déchets domestiques </span>
        <h1></h1>

        <div className="menu">
          
         
      
        </div>
        <div className="cards">
          {isLoading
            ? 'loading'
            : error
            ? 'Something went wrong!'
            : data.map((gig) => <GigCard key={gig._id} item={gig} />)}
        </div>
      </div>
    </div>
  );
}

export default Gigs;
