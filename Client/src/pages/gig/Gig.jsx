import React from 'react';
import './Gig.scss';
import { Slider } from 'infinite-react-carousel/lib';
import { useParams } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

function Gig() {
  const { id } = useParams();

  const { isLoading, error, data } = useQuery({
    queryKey: ['gig'],
    queryFn: () =>
      newRequest.get(`/gigs/single/${id}`).then((res) => {
        return res.data;
      }),
  });

  const userId = data?.userId;

  const {
    isLoading: isLoadingUser,
    error: errorUser,
    data: dataUser,
  } = useQuery({
    queryKey: ['user'],
    queryFn: () =>
      newRequest.get(`/users/${userId}`).then((res) => {
        return res.data;
      }),
    enabled: !!userId,
  });

  return (
    <div className="gig">
      {isLoading ? (
        'loading'
      ) : error ? (
        'Something went wrong!'
      ) : (
        <div className="container">
          <div className="left">
            <span className="breadcrumbs">
              Eco.Gest {'>'} votre espace de gestion des déchets {'>'}
            </span>
            <h1>{data.title}</h1>
            {isLoadingUser ? (
              'loading'
            ) : errorUser ? (
              'Something went wrong!'
            ) : (
              <div className="user">
                <img
                  className="pp"
                  src={dataUser.img || '/img/noavatar.jpg'}
                  alt=""
                />
              </div>
            )}
            <Slider slidesToShow={1} arrowsScroll={1} className="slider">
              {data && data.map((img) => (
                <img key={img} src={img} alt="" />
              ))}
            </Slider>
            <h2>A propos ce service</h2>
            <p>{data.desc}</p>
            {isLoadingUser ? (
              'loading'
            ) : errorUser ? (
              'Something went wrong!'
            ) : (
              <div className="seller">
                <h2>A propos le vendeur</h2>
                <div className="user">
                  <img src={dataUser.img || '/img/noavatar.jpg'} alt="" />
                  <div className="info">
                    <button>Contacter moi</button>
                  </div>
                </div>
                <div className="box">
                  <div className="items">
                    <div className="item">
                      <span className="title">De</span>
                      <span className="desc">{dataUser.country}</span>
                    </div>
                  </div>
                  <hr />
                  <p>{dataUser.desc}</p>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Gig;
