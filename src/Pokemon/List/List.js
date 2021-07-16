import React, { useEffect, useState, useContext } from "react";
import { Link } from "react-router-dom";
import "./List.css";
import AppContext from "../../AppContext/Context";

const PokemonList = () => {
  const [pokemons, setPokemons] = useState(null);
  const { user } = useContext(AppContext);

  useEffect(() => {
    fetch("https://pokeapi.co/api/v2/pokemon/")
      .then((r) => r.json())
      .then((json) => {
        setPokemons(json.results);
      });
  }, []);

  if (!pokemons) {
    return null;
  }

  return (
    <ul className="PokemonList">
      {pokemons.map(({ name }) => (
        <li key={name}>
          <Link to={`/pokemons/${name}`}>
            {name}
            {user && !user.pokedex[name] && (
              <span className="PokemonList__label">NOVO</span>
            )}
          </Link>
        </li>
      ))}
    </ul>
  );
};

export default PokemonList;
