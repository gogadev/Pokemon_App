import React from "react";

import "./pokemons.style.css";

const Pokemons = ({ pokemon }) => {
  return (
    <div className="pokemons">
      <div className="card">
        <img src={pokemon.sprites.front_shiny} alt="" />
        <div className="name">
          <span>{pokemon.name}</span>
          </div>
          <div className="type">
            {pokemon.types.map((type, i) => {
              return (
                <div key={i} className="pokemon-type">
                  <h4> {type.type.name}</h4>
                  </div>
              );
            })}
            </div>
          </div>
          <div className="info">
            <h4>Weight: {pokemon.weight}</h4>
            <h4>Height: {pokemon.height}</h4>
            <h4>Ability: {pokemon.abilities[0].ability.name}</h4>
          </div>
        </div>
  );
};

export default Pokemons;
