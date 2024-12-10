import "./App.css";

import { BrowserRouter, Routes, Route } from "react-router-dom";
import {useSelector, useDispatch} from 'react-redux';
import { Navigate } from 'react-router-dom';
import { useEffect } from "react";

// Main Layout
import MainLayout from "./components/layout/MainLayout";
import HomePage from './pages/HomePage';
import Login from './pages/Login';
import Register from './pages/Register';
import ArtistProfile from './pages/ArtistProfile';
import Album from "./pages/Album";
import Libraries from "./pages/Libraries";
import TrackDetail from "./pages/TrackDetail";
import Playlist from "./pages/Playlist";
import MultiSearch from "./pages/MultiSearchPage";
import UpdatePassword from "./pages/UpdatePassword";
import AllGenre from './pages/AllGenre';
// Shop Layout
import ShopLayout from "./components/layout/ShopLayout";
import CartPage from "./pages/CartPage";
import MerchSearch from "./pages/MerchSearch";
import OrderHistory from "./pages/OrderHistory";
import CheckOutPage from "./pages/CheckOutPage";
import ShopPage from "./pages/ShopPage";
import MerchandiseDetail from "./pages/MerchandiseDetail";
// Artist Layout
import ArtistDashboard from './pages/ArtistDashboard';
import AdminDashboard from './pages/AdminDashboard';
import UploadTrack from "./components/ArtistDashboard/UploadTrack";
import AddNewAlbum from "./components/ArtistDashboard/AddNewAlbum";
import ArtistManageMerchandise from "./pages/ArtistManageMerchandise";
import ArtistAddNewMerchandise from "./pages/ArtistAddNewMerchandise";
import Inbox from "./components/ArtistDashboard/Inbox";
// Admin Layout
import ManageRequest from "./components/Admin/ManageRequest";
import ManageUsers from "./components/Admin/ManageUsers";
import ManageTracks from "./components/Admin/ManageTracks";
import ManagePlaylists from "./components/Admin/ManagePlaylists";

import { createTheme, ThemeProvider } from "@mui/material";

const theme = createTheme({
  typography: {
    fontFamily: ["Neue Helvetica Condensed BQ", "Inter", "san-serif"].join(","),
  },
});

function App() {
  const dispatch = useDispatch();
  const token = useSelector((state) => state.auth.token);
  const role = useSelector((state) => state.auth.role);
  // const queue = useSelector((state) => state.auth.queueSongs);
  // console.log(queue);

  // console.log(role);
  useEffect(() => {
    // console.log(dispatch(getQueue()));
  });
  // console.log(token);
   //   dispatch(clearToken());
  return (
    <ThemeProvider theme={theme}>
    <BrowserRouter>
      <Routes className="App">
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="artists" element={<Libraries type="artists" />} />
          <Route path="albums" element={<Libraries type="albums" />} />
          <Route path="playlists" element={<Libraries type="playlists" />} />
          <Route path="favorite" element={<Libraries type="favorite" />} />
          <Route path='tracks' element={<Libraries type="tracks" />} />
          <Route path='track/:id' element={<TrackDetail />} />
          <Route path='playlist/:id' element={<Playlist />} />
          <Route path='artist/:id/profile' element={<ArtistProfile />} />
          <Route path='album/:id' element={<Album />} />
          <Route path='genre' element={<AllGenre />} />
          <Route path='update-password' element={<UpdatePassword />} />
          <Route path="multi-search" element={<MultiSearch />} />

        </Route>
        <Route path="/artist" element={<ArtistDashboard />}>
          {/* <Route index element={<Dashboard/>} />  */}
          {/* <Route path="dashboard" element={<Dashboard/>} /> */}
        </Route>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} /> 

        <Route path="/artist" element={<ArtistDashboard />} >
            {/* <Route index element={<Dashboard/>} /> */}

            <Route path="upload-track" element={<UploadTrack/>} />
            <Route path="inbox" element={<Inbox/>} />
            <Route path="add-album" element={<AddNewAlbum/>} />
              <Route
                path="merchandise"
                element={<ArtistManageMerchandise />}
              ></Route>
              <Route
              path="upload-merchandise"
              element={<ArtistAddNewMerchandise/>}
              ></Route>

        </Route>
        <Route
          path="/admin"
          element={role === "admin" ? <AdminDashboard /> : <Navigate to="/" />}
        >
          <Route path="users" element={<ManageUsers />} />
          <Route index element={<ManageRequest />} />
          <Route path="tracks" element={<ManageTracks />} />
          <Route path="playlists" element={<ManagePlaylists />} />
      </Route>
        <Route path="/shop" element={<ShopLayout />}>
          <Route index element={<ShopPage />} />
          <Route path="merchandise/:id" element={<MerchandiseDetail />} />
          <Route path="merch-search" element={<MerchSearch />} />
          <Route path="cart" element={<CartPage />} />
          <Route path="order-history" element={<OrderHistory />} />
          <Route path="checkout" element={<CheckOutPage />} />
        </Route>
      </Routes>
    </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
