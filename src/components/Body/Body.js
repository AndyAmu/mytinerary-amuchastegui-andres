import React from 'react'
import Button from 'react-bootstrap/Button';


const Body = () => {

    return (
        <main className='mainPrincipal'>
            <div className='imagenprincipal'>
                <div className='Body-img'>
                    <h1 className='titulo-centro'>My<b className='Tinerary'>Tinerary</b> </h1>
                    <h4 className='texto-body'>Find your perfect trip, designed by insiders who know and love their cities!</h4>
                    <div className='boton-llamativo'>
                        <Button onClick={() => { }} className='boton-lindo' variant="warning">Click Here !</Button>{' '}
                    </div>
                </div>
            </div>

            <div className='imagenDos'>

                <div className='Body-img2'></div>


            </div>
        </main>
    )
}

export default Body