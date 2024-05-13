import React from 'react';
import { Link } from 'react-router-dom';
import './MyGigs.scss';
import getCurrentUser from '../../utils/getCurrentUser';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import newRequest from '../../utils/newRequest';

function MyGigs() {
  const currentUser = getCurrentUser();

  const queryClient = useQueryClient();

  const { isLoading, error, data } = useQuery({
    queryKey: ['myGigs'],
    queryFn: () =>
      newRequest
        .get(`/gigs/?userId=${currentUser._id}`)
        .then((res) => {
          console.log('Data from backend:', res.data);
          return res.data;
        })
        .catch((error) => {
          console.error('Error fetching data:', error);
          throw error; // Rethrow the error to be handled by React Query
        }),
  });

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.delete(`/gigs/${id}`);
    },
  });

  const handleDelete = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="myGigs">
      {isLoading ? (
        'loading'
      ) : error ? (
        'error'
      ) : (
        <div className="container">
          <div className="title">
            <h1>Services</h1>
            {currentUser.isSeller && (
              <Link to="/add">
                <button>Ajouter un service</button>
              </Link>
            )}
          </div>
          <table>
            <tbody>
              <tr>
                <th>Image</th>
                <th>Title</th>

                <th>Action</th>
              </tr>
              {data?.map((gig) => (
                <tr key={gig._id}>
                  <td>
                    <img className="image" src={gig.imgC} alt="" />
                  </td>
                  <td>{gig.title}</td>
                  <td>
                    <img
                      className="delete"
                      src="./images/delete.png"
                      alt=""
                      onClick={() => handleDelete(gig._id)}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default MyGigs;
