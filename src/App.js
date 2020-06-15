import React, { useState, useEffect } from "react";

import { getPokemon, getAllPokemon } from "./services/Pokemon";

import Header from "./components/header/Header";
import Pokemons from "./components/pokemons/Pokemons";

import loadingImg from "./assets/loader.gif"

import "./App.css";

const App = () => {
  const [pokemonData, setPokemonData] = useState([]);
  const [nextUrl, setNextUrl] = useState("");
  const [prevUrl, setPrevUrl] = useState("");
  const [loading, setLoading] = useState(true);

  const initialUrl = "https://pokeapi.co/api/v2/pokemon";

  useEffect(() => {
    async function fetchData() {
      let res = await getAllPokemon(initialUrl);
      setNextUrl(res.next);
      setPrevUrl(res.previous);
      await loadPokemon(res.results);
      setLoading(false);
    }
    fetchData();
  }, []);

  const next = async () => {
    setLoading(true);
    let data = await getAllPokemon(nextUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const prev = async () => {
    if (!prevUrl) return;
    setLoading(true);
    let data = await getAllPokemon(prevUrl);
    await loadPokemon(data.results);
    setNextUrl(data.next);
    setPrevUrl(data.previous);
    setLoading(false);
  };

  const loadPokemon = async (data) => {
    let _pokemonData = await Promise.all(
      data.map(async (pokemon) => {
        let pokemonRecord = await getPokemon(pokemon);
        return pokemonRecord;
      })
    );
    setPokemonData(_pokemonData);
  };

  return (
    <React.Fragment>
      <Header />
      <div className="loading">
        {loading ? (
          <img className="loading-img" src={loadingImg} alt=""/>
        ) : (
          <React.Fragment>
            <div className="button">
              <button className="btn" onClick={prev}>
                Prev
              </button>
              <button className="btn" onClick={next}>
                Next
              </button>
            </div>
            <div className="grid">
              {pokemonData.map((pokemon, i) => {
                return <Pokemons key={i} pokemon={pokemon} />;
              })}
            </div>
            <div className="button">
              <button className="btn" onClick={prev}>Prev</button>
              <button className="btn" onClick={next}>Next</button>
            </div>
          </React.Fragment>
        )}
      </div>
    </React.Fragment>
  );
};

export default App;
