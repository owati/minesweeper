import React from 'react';
import {Link} from 'react-router-dom';

function Home(){
    return(
        <div>
            <Link to="/game"> 
                <button> to game </button>
            </Link>
        </div>
    )

}

export default Home;