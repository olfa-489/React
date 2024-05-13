export const INITIAL_STATE = {
  userId: JSON.parse(localStorage.getItem('currentUser'))?._id,

  title: '',
  descr: '',
  categ: '',
  imgC: '',
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
        imgC: action.payload.imgC,
        images: action.payload.images,
      };

    default:
      return state;
  }
};
