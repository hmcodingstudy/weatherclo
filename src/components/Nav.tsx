import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import React from 'react'
import { Link } from 'react-router-dom';
// import { solid, regular } from '@fortawesome/fontawesome-svg-core/import.macro'
import '../App.css';
import { useEffect, useRef, useState } from 'react';
import { faFilePen,faHouse,faComments, faWandMagicSparkles } from '@fortawesome/free-solid-svg-icons'

function Nav() {
  let [nav, setNav] = useState(false);
  let [navArrowState, setNavArrowState] = useState(false);

  const nav_ = useRef<any>(null);
  const navArrow = useRef<any>(null);

  useEffect(()=>{
    nav ? nav_.current.classList.replace('navInactive','navActive') : nav_.current.classList.replace('navActive','navInactive')
  },[nav])

  useEffect(()=>{
    navArrowState ? navArrow.current.classList.replace('navArrowClose','navArrowOpen') : navArrow.current.classList.replace('navArrowOpen','navArrowClose')
  },[navArrowState])


  return (
    <>
      <div className='navInactive' ref={nav_} style={{position:'relative'}}>
        <button onClick={()=>{
          nav ? setNav(false) : setNav(true);
          navArrowState ? setNavArrowState(false) : setNavArrowState(true)
          }} ref={navArrow} className='navArrowClose'>화살표</button>
        <div className='menuIcons'>
          <button>
            <Link to="/"><FontAwesomeIcon icon={faHouse} className='navIconHouse'/></Link>
          </button>
          <button>
            <Link to="/selectoption1"><FontAwesomeIcon icon={faWandMagicSparkles} className='navIconRandom'/></Link>
          </button>
          <button>
            <Link to="/ootd"><FontAwesomeIcon icon={faFilePen} className='navIconMemo'/></Link>
          </button>
          {/* <button><FontAwesomeIcon icon={faUsers} className='navIconCommunity'/></button> */}
          {/* <FontAwesomeIcon icon="fa-solid fa-comments" /> */}
          {/* <FontAwesomeIcon icon="fa-solid faWandMagicSparkles" /> */}
        </div>
      </div>
    </>
  );
}

export default Nav;
