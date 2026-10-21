import { Navigate, Outlet, Route, Routes } from "react-router-dom";
import Header from "./components/shared/Header"
import Footer from "./components/shared/Footer"
import Home from "./pages/Home"
import Movies from "./pages/Movies"
import MovieDetails from "./pages/MovieDetails"
import Profile from "./pages/Profile"
import SeatLayout from "./pages/SeatLayout";
import { useMatch } from "react-router-dom"
import Checkout from "./pages/Checkout"
import { Toaster } from "react-hot-toast";
import FullScreenLoader from "./components/shared/FullScreenLoader";
import { useLoadUser } from "./hooks/useLoadUser";
import { useAuth } from "./context/AuthContext";


const PrivateRoute = () => {
  const { auth }  = useAuth();
  return auth ? <Outlet /> : <Navigate to="/" replace />;
}

function  App() {
  
  const { isLoading } = useLoadUser();
  

   // Hide header/footer only on seat layout page
  const isSeatLayoutPage = useMatch(
    "/movies/:movieId/:movieName/:state/theater/:theaterId/show/:showId/seat-layout"
  );

  const isCheckoutPage = useMatch("/shows/:showId/:state/checkout");

  if(isLoading) {
    return <FullScreenLoader />
  }
  return (
    <>
      <Toaster 
        position="top-right"
        toastOptions={{
          style : {
            fontSize : "14px",
          }
        }}
      />
      <div className="flex flex-col min-h-screen">
                {!isSeatLayoutPage && !isCheckoutPage && <Header />}
        <main className="flex-grow">
          <Routes>
           <Route path="/" element={<Home/>}></Route>
             <Route path="/movies" element={<Movies/>}></Route>
             <Route path="/movies/:state/:movieName/:id/ticket" element={<MovieDetails/>}></Route>
               <Route element={<PrivateRoute />}>
              <Route path="/movies/:movieId/:movieName/:state/theater/:theaterId/show/:showId/seat-layout" element={<SeatLayout />} />
              <Route path="/profile/:id/:tab?" element={<Profile />} />
              </Route>
              <Route path="/shows/:showId/:state/checkout" element={<Checkout/>}> </Route>
          </Routes>
        </main>
        {!isSeatLayoutPage && !isCheckoutPage && <Footer />}
      </div>
    </>
  )
}

export default App
