import React, { createContext, useContext } from "react";

// Tạo context
const PlaylistContext = createContext();

// Hook để sử dụng context dễ dàng hơn
export const usePlaylistContext = () => {
  return useContext(PlaylistContext);
};

// Provider cho context
export const PlaylistProvider = ({ creatorId, playlistId, children }) => {
  return (
    <PlaylistContext.Provider value={{ creatorId, playlistId }}>
      {children}
    </PlaylistContext.Provider>
  );
};
