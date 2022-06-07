import React from 'react'
import Carousel from 'react-grid-carousel'

// const paises = [
//     { ciudad: "Athens", url: "../images/CANADA.jpg" },
//     { ciudad: "Athens", url: "../images/CANCUN.jpg" },
//     { ciudad: "Athens", url: "../images/CORDOBA.jpg'" },
//     { ciudad: "Athens", url: "../images/CANADA.jpg" },
//     { ciudad: "Athens", url: "../images/CANADA.jpg" },
//     { ciudad: "Athens", url: "../images/CANADA.jpg" },
//     { ciudad: "Athens", url: "../images/CANADA.jpg" },
//     { ciudad: "Athens", url: "../images/CANADA.jpg" },
//     { ciudad: "Athens", url: "../images/CANADA.jpg" },
//     { ciudad: "Athens", url: "../images/CANADA.jpg" },
//     { ciudad: "Athens", url: "../images/CANADA.jpg" },
//     { ciudad: "Athens", url: "../images/CANADA.jpg" },
// ]
const Gallery = () => {
    return (
        <div className='foto-dos'>
        <Carousel className='caro' cols={2} rows={2} gap={10} loop>
            <Carousel.Item>
                <img className='carousel-img' width="100%" height="500rem" src= {require('../images/CANADA.jpg') } alt='' />
            </Carousel.Item>
            <Carousel.Item>
                <img className='carousel-img' width="100%" height="500rem" src= {require('../images/CANCUN.jpg') } alt='' />
            </Carousel.Item>
            <Carousel.Item>
                <img className='carousel-img' width="100%" height="500rem" src= {require('../images/CORDOBA.jpg') } alt='' />
            </Carousel.Item>
            <Carousel.Item>
                <img className='carousel-img' width="100%" height="500rem" src= {require('../images/MALDIVAS.jpg') } alt='' />
            </Carousel.Item>
            <Carousel.Item>
                <img className='carousel-img' width="100%" height="500rem" src= {require('../images/MEDELLIN.jpg') } alt='' />
            </Carousel.Item>
            <Carousel.Item>
                <img className='carousel-img' width="100%" height="500rem" src= {require('../images/MOSCU.jpg') } alt='' />
            </Carousel.Item>
            <Carousel.Item>
                <img className='carousel-img' width="100%" height="500rem" src= {require('../images/NEWYORK.jpg') } alt='' />
            </Carousel.Item>
            <Carousel.Item>
                <img className='carousel-img' width="100%" height="500rem" src= {require('../images/PARIS.jpg') } alt='' />
            </Carousel.Item>
            <Carousel.Item>
                <img className='carousel-img' width="100%" height="500rem" src= {require('../images/ROMA.jpg') } alt='' />
            </Carousel.Item>
            <Carousel.Item>
                <img className='carousel-img' width="100%" height="500rem" src= {require('../images/SANTIAGO.jpg') } alt='' />
            </Carousel.Item>
            
            
        </Carousel>
        </div>
    )
}
export default Gallery

// function displayCard() {
//     var toHtml = ''

//     for (var i = 0; i < datos.paises.length; i++) {

//         toHtml += ``
//     }
//     document.querySelector('').innerHTML = toHtml
// }
// displayCard()