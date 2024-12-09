import "./App.sass";

import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import { PersonList } from "./components/PersonList";
import { Person } from "./components/Person";
import Layout from "./components/layout/Layout";
import Homepage from "./components/Homepage";
import { MovieList } from "./components/MovieList";
import Movie from "./components/Movie";

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path='/' element={<Layout />}>
          <Route index element={<Homepage />} />
          <Route path='p'>
            <Route index element={<PersonList />} />
            <Route path=':name/:personId' element={<Person />} />
          </Route>
          <Route path='m'>
            <Route index element={<MovieList />} />
            <Route path=':name/:movieId' element={<Movie />} />
          </Route>
        </Route>
      </Routes>
    </Router>
  );
}
