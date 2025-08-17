import { ref } from "vue";

const favorites = ref(JSON.parse(localStorage.getItem("favorites")) || []);

export function useFavorites() {
  const saveFavorites = () => {
    localStorage.setItem("favorites", JSON.stringify(favorites.value));
  };

  const addFavorite = (photo) => {
    if (!favorites.value.find((fav) => fav.id === photo.id)) {
      favorites.value.push(photo);
      saveFavorites();
    }
  };

  const removeFavorite = (photoId) => {
    favorites.value = favorites.value.filter((fav) => fav.id !== photoId);
    saveFavorites();
  };

  const isFavorite = (photoId) => {
    return favorites.value.some((fav) => fav.id === photoId);
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
  };
}
