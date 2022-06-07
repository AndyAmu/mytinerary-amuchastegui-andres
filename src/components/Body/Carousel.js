import React from 'react'
import Carousel from 'react-grid-carousel'


const Gallery = (props) => {
    return (
        <div className='foto-dos'>
            <div className='contenedor-corousel'>
        <Carousel className='carousel' cols={2} rows={2} gap={10} loop>
            {props.datos && props.datos.map(item => 
            <Carousel.Item>
                <img className='img-carousel' src={item.imagen} />
            </Carousel.Item>
            )}
        </Carousel>
        </div>
        </div>
    )
}

export default Gallery