import React, { useState, useEffect } from "react";
import {
  getAllPokemon,
  getPokemon,
} from "./services/pokemon";

const App = () => {
  const [pokemonData, setPoekomnData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const initialUrl = "https://pokeapi.co/api/v2/pokemon/";

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialUrl);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      let pokemon = await loadinPokemon(response.results);
      console.log(pokemon);
      setLoading(false);
    }

    fetchData();
  }, []);

  const loadingPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPoekomnData(_pokemonData);
  };

  return (
    <div>
      {loading ? <h1>Loading...</h1> : <h1>Fetched</h1>}
    </div>
  );
};

export default App;
