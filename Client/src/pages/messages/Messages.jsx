import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import newRequest from '../../utils/newRequest';
import './Messages.scss';
import moment from 'moment';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';

const Messages = () => {
  const currentUser = JSON.parse(localStorage.getItem('currentUser'));
  console.log('le current est', currentUser);
  const queryClient = useQueryClient();
  const [conversations, setConversations] = useState([]);

  const { isLoading, error, data } = useQuery({
    queryKey: ['conversations'],
    queryFn: () =>
      newRequest.get(`/conversations`).then((res) => {
        return res.data;
      }),
  });

  useEffect(() => {
    if (data) {
      const fetchData = async () => {
        const conversationsWithUsernames = await Promise.all(
          data.map(async (conversation) => {
            const sellerUsername = await fetchUserInfo(conversation.sellerId);
            const buyerUsername = await fetchUserInfo(conversation.buyerId);
            return { ...conversation, sellerUsername, buyerUsername };
          })
        );
        setConversations(conversationsWithUsernames);
      };
      fetchData();
    }
  }, [data]);

  const fetchUserInfo = async (userId) => {
    const response = await newRequest.get(`/users/${userId}`);
    return response.data.username;
  };

  const mutation = useMutation({
    mutationFn: (id) => {
      return newRequest.put(`/conversations/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(['conversations']);
    },
  });

  const handleRead = (id) => {
    mutation.mutate(id);
  };

  return (
    <div className="Message">
      {isLoading ? (
        'Chargement...'
      ) : error ? (
        'Erreur'
      ) : (
        <div className="container">
          <div className="title">
            <h1>Messages</h1>
          </div>
          <table>
            <thead>
              <tr>
                <th>{currentUser.isSeller ? 'Acheteur' : 'Vendeur'}</th>
                <th>Dernier Message</th>
                <th>Date</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {conversations.map((c) => (
                <tr
                  className={
                    (currentUser.isSeller && !c.readBySeller) ||
                    (!currentUser.isSeller && !c.readByBuyer)
                      ? ''
                      : 'active'
                  }
                  key={c.id}
                >
                  <td>
                    {currentUser.isSeller ? c.buyerUsername : c.sellerUsername}
                  </td>
                  <td>
                    <Link to={`/message/${c.id}`} className="Link">
                      {c?.lastMessage?.substring(0, 100)}...
                    </Link>
                  </td>
                  <td>{moment(c.updatedAt).fromNow()}</td>
                  <td>
                    {(currentUser.isSeller && !c.readBySeller) ||
                      (!currentUser.isSeller && !c.readByBuyer && (
                        <button onClick={() => handleRead(c.id)}>
                          Marquer comme lu
                        </button>
                      ))}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default Messages;
