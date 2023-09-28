import React from "react";
import styled, { keyframes } from "styled-components";
import { useWindowSize } from "../../utils/useWindowSize";


function Orb() {

    const {width, height} = useWindowSize()
    console.log(width, height)
    const moveOrb = keyframes`
        0%{
            transform: transalte(0, 0);
        }
        50%{
            transform: translate(${width/1.2}px, ${height/2}px);
        }
        100%{
            transform: translate(0, 0);
        }
    `

    const OrbStyled = styled.div`
      
        position: absolut;
        border-radius: 50%;
     
        background: linear-gradient(180deg, #F56692 0%, #F2994A 100%);
        filter: blur(400px);
        animation: ${moveOrb} 15s alternate linear infinite;
    `;

    //esto esta generando problemas en la vista despues modificar para que quede cheto
    return(
        <OrbStyled>

        </OrbStyled>
    )
}

export default Orb;