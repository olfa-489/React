export const INITIAL_STATE = {
  userId: (() => {
    const currentUser = localStorage.getItem('currentUser');
    if (currentUser) {
      try {
        return JSON.parse(currentUser)._id;
      } catch (error) {
        console.error('Error parsing currentUser:', error);
      }
    }
    return null;
  })(),
  title: '',
  descr: '',
  categ: '',
  cover: '',
  images: [],
};
export const gigReducer = (state, action) => {
  switch (action.type) {
    case 'CHANGE_INPUT':
      return {
        ...state,
        [action.payload.name]: action.payload.value,
      };
    case 'ADD_IMAGES':
      return {
        ...state,
        cover: action.payload.cover,
        images: action.payload.images,
      };

    default:
      return state;
  }
};
