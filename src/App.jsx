import React, { useState, useEffect } from "react";
import {
  getAllPokemon,
  getPokemon,
} from "./services/pokemon";
import Card from "./components/Card";
import Nav from "./components/Nav";
import gif from "./images/pikachu-gif.gif";

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const initialUrl = "https://pokeapi.co/api/v2/pokemon/";

  useEffect(() => {
    async function fetchData() {
      let response = await getAllPokemon(initialUrl);
      setNextUrl(response.next);
      setPrevUrl(response.previous);
      let pokemon = await loadingPokemon(response.results);
      console.log(pokemon);
      setLoading(false);
    }

    fetchData();
  }, []);

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadingPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const loadingPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon.url);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };
  console.log(pokemonData);
  return (
    <div className="px-10 pb-10 bg-orange-500 ">
      {loading ? (
        <div className="flex flex-col items-center justify-center h-screen">
          <img
            className="h-60"
            src={gif}
            alt="loading image"
          />
          <h2 className="pt-4 text-3xl font-bold text-white">
            Loading...
          </h2>
        </div>
      ) : (
        <>
          <Nav />

          <div className="flex justify-center pb-8 space-x-4 text-xl font-medium ">
            <button
              className="px-4 py-2 bg-white rounded-md hover:text-orange-500 hover:font-bold"
              onClick={prev}
            >
              Prev
            </button>
            <button
              className="px-4 py-2 bg-white rounded-md hover:text-orange-500 hover:font-bold"
              onClick={next}
            >
              Next
            </button>
          </div>

          <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 ">
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />;
            })}
          </div>
          <div className="flex justify-center pt-8 space-x-4 text-xl font-medium ">
            <button
              className="px-4 py-2 bg-white rounded-md hover:text-orange-500 hover:font-bold"
              onClick={prev}
            >
              Prev
            </button>
            <button
              className="px-4 py-2 bg-white rounded-md hover:text-orange-500 hover:font-bold"
              onClick={next}
            >
              Next
            </button>
          </div>
          <div className="flex justify-center pt-8 text-base font-medium text-white md:justify-start ">
            <a
              className=" hover:italic"
              href="https://www.shobhitsirohi.com/"
              target="_blank"
            >
              Sirohi
            </a>
            &nbsp;built it.
          </div>
        </>
      )}
    </div>
  );
};

export default App;
