import React from 'react';
import styled from 'styled-components';

const StyledH1 = styled.h1`
font-family: arcadeclassic
`

const TItleScreen = ()=> {
    return(
        <div>
            <StyledH1>Title of Game</StyledH1>
            <section className="Buttons">
                <button><a href="/signin">Sign In</a></button>
                <button><a href="/signup">Sign Up</a></button>
            </section>
        </div>
    )
}

export default TItleScreen