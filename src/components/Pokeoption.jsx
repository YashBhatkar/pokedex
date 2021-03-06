import React from "react";
import { useEffect, useState } from "react";
import { connect, useDispatch } from "react-redux";
import { fetchData } from "../redux/actions/actions";
import { useSelector } from "react-redux";
import Pokemon from "./Pokemon";
import Palette from "react-palette";
import { usePalette } from "react-palette";
import { setColor } from "../redux/actions/actions";

function Pokeoption() {
  const imgsrc = useSelector((state) => state.delta.data.sprites.front_default);
  const name = useSelector((state) => state.delta.data.name);
  const color = useSelector((state) => state.delta.color);
  const dispatch = useDispatch();
  const [pokerender, setPokerender] = useState(false);
  const [pokeOptionrender, setPokeOptionrender] = useState(true);
  const { data, loading, error } = usePalette(imgsrc);
  const handleClick = (e) => {
    // e.preventDefault();
    // return <Pokemon />;
    setPokerender(true);
    setPokeOptionrender(false);
  };

  useEffect(() => {
    if (!loading) {
      if (error) {
        console.log("Err");
      } else {
        dispatch(setColor(data));
        document.body.style.backgroundColor = data.vibrant;
      }
    }
  }, [loading]);
  // ask ishan color consoled everytime why wont this work ^
  //   useEffect(() => {
  //     setColorLocal(data);
  //     dispatch(setColor(color_local));
  //   }, []);
  return (
    <div>
      {pokeOptionrender && (
        <div className="pokemon-select">
          <img src={imgsrc} alt="Pokemon image." onClick={handleClick} />
          <h2>{name}</h2>
        </div>
      )}

      <div className="pokeoption-pokemon">
        {pokerender && <Pokemon img={imgsrc} name={name} />}
      </div>
    </div>
  );
}
export default Pokeoption;
