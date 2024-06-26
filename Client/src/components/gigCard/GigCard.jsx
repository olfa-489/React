import React from 'react';
import './GigCard.scss';
import { Link } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

const GigCard = ({ item }) => {
  const { isLoading, error, data } = useQuery({
    queryKey: [item.userId],
    queryFn: () =>
      newRequest.get(`/users/${item.userId}`).then((res) => {
        return res.data;
      }),
  });
  return (
    <Link to={`/gig/${item._id}`} className="link">
      <div className="gigCard">
        <img src={item.cover} alt="" />
        <div className="info">
          {isLoading ? (
            'loading'
          ) : error ? (
            'Something went wrong!'
          ) : (
            <div className="user">
              <img src={data.img || '/images/noavatar.jpg'} alt="" />
              <span>{data.username}</span>
            </div>
          )}
          <p>{item.descr}</p>
          
        </div>
        <hr />
        
      </div>
    </Link>
  );
};

export default GigCard;
