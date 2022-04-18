import React from "react";

const Card = ({ pokemon }) => {
  return (
    <div className="flex flex-col items-center justify-center space-y-2 rounded-2xl bg-white p-4">
      <div>
        <img
          className="h-60"
          src={pokemon.sprites.front_default}
          alt="pokemon image"
        />
      </div>
      <div className="font-bold text-2xl">
        {pokemon.name.toUpperCase()}
      </div>
      <div className="flex gap-4 text-xl font-semibold ">
        {pokemon.types.map((type) => {
          return <div>{type.type.name}</div>;
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
