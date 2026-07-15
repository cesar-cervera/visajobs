import Parse from 'parse';

// Add a job to favorites for the current user
export const addFavorite = (job) => {
  const Favorite = Parse.Object.extend('Favorite');
  const favorite = new Favorite();
  favorite.set('user', Parse.User.current());
  favorite.set('job', job);
  return favorite.save();
};

// Remove a job from favorites
export const removeFavorite = (favoriteId) => {
  const Favorite = Parse.Object.extend('Favorite');
  const query = new Parse.Query(Favorite);
  return query.get(favoriteId).then((favorite) => favorite.destroy());
};

// Get all favorites for the current user
export const getFavorites = () => {
  const Favorite = Parse.Object.extend('Favorite');
  const query = new Parse.Query(Favorite);
  query.equalTo('user', Parse.User.current());
  query.include('job');
  return query.find();
};

// Check if a job is already favorited
export const checkFavorite = (job) => {
  const Favorite = Parse.Object.extend('Favorite');
  const query = new Parse.Query(Favorite);
  query.equalTo('user', Parse.User.current());
  query.equalTo('job', job);
  return query.first();
};
