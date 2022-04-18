import React, { useState, useEffect } from "react";
import {
  getAllPokemon,
  getPokemon,
} from "./services/pokemon";
import Card from "./components/Card";
import Nav from "./components/Nav";
import gif from "./images/pikachu-gif.gif";
import TypeColor from "./components/TypeColor";
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
    <div className=" px-10 pb-10">
      {loading ? (
        <div className="h-screen flex flex-col justify-center items-center">
          <img
            className="h-60"
            src={gif}
            alt="loading image"
          />
          <h2 className="text-3xl font-bold text-white pt-4">
            Loading...
          </h2>
        </div>
      ) : (
        <>
          <Nav />

          <div className="flex space-x-4 text-xl font-medium pb-8 justify-center ">
            <button
              className="bg-white rounded-md py-2 px-4 hover:text-orange-500 hover:font-bold"
              onClick={prev}
            >
              Prev
            </button>
            <button
              className="bg-white rounded-md py-2 px-4 hover:text-orange-500 hover:font-bold"
              onClick={next}
            >
              Next
            </button>
          </div>

          <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-10  ">
            {pokemonData.map((pokemon, i) => {
              return <Card key={i} pokemon={pokemon} />;
            })}
          </div>
          <div className="flex space-x-4 text-xl font-medium pt-8 justify-center ">
            <button
              className="bg-white rounded-md py-2 px-4 hover:text-orange-500 hover:font-bold"
              onClick={prev}
            >
              Prev
            </button>
            <button
              className="bg-white rounded-md py-2 px-4 hover:text-orange-500 hover:font-bold"
              onClick={next}
            >
              Next
            </button>
          </div>
          <div className="pt-8 flex text-base font-medium text-white justify-center md:justify-start ">
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
