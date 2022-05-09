import React from "react";
import pokimonColors from "./PokemonTypeColors";
const Card = ({ pokemon }) => {
  return (
    <div className="flex flex-col items-center justify-center p-4 space-y-2 bg-white rounded-2xl">
      <div>
        <img
          className="h-60"
          src={pokemon.sprites.front_default}
          alt="pokemon image"
        />
      </div>
      <div className="text-2xl font-bold">
        {pokemon.name.toUpperCase()}
      </div>
      <div className="flex gap-4 text-xl font-semibold ">
        {pokemon.types.map((type) => {
          return (
            <div
              className={
                " px-2 py-1 text-white rounded-md "
              }
              style={{
                backgroundColor:
                  pokimonColors[type.type.name],
              }}
            >
              {type.type.name}
            </div>
          );
        })}
      </div>
      <div className="text-base font-medium">
        <div className="flex gap-4">
          <span>Weight</span>
          <span>{pokemon.weight}</span>
        </div>
        <div className="flex gap-4">
          <span>Height</span>
          <span>{pokemon.height}</span>
        </div>
        <div className="flex gap-4">
          <span>Ability</span>
          <span>{pokemon.abilities[0].ability.name}</span>
        </div>
      </div>
    </div>
  );
};

export default Card;
