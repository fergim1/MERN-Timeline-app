import React from 'react';
import Navbar from '../navbar';
import Paso1 from './images/paso1.svg'
import Paso2 from './images/paso2.svg'
import Paso3 from './images/paso3.svg'
import VideoMobile from './videos/videoMobile.mp4'
// import VideoDesktop from './videos/videoDesktop.mp4'
// import VideoDesktop from './videos/video-canva.mp4'
import VideoDesktop from './videos/video-mac.mp4'


import { Footer } from '../footer';


const HomeScreen = () => {

  return (
    <>
    <Navbar />
    <div className='home-contenedor'>
        <div className='home-wrapper-text'>
                    <div className='home-div-frase'>
                        <h4 className='home-titulo'>Te imaginas...</h4>
                    </div>

                    <div className='home-div-que-es'>
                        <p className='home-text-que-es-timeline'>
                            Si tus padres hubieran creado una línea de tiempo con fotos 
                            y te escribian cartas a medida que fuiste creciendo...
                            {/* <br/> */}
                            <span className='home-text-hoy-podes-hacerlo'>
                                Hoy podes crearla para tu hij@ !
                            </span> 
                        </p>

                    </div>

                    <h4 className='home-text-como-funciona'>
                            ¿ Cómo funciona ?       
                    </h4>

        </div>

        <div className='home-div-pasos'>
    
            <div className='home-div-paso'>
                <img src={ Paso1 } className='home-image-paso' alt='paso-1'/>
                <div className='home-div-numero-paso'>
                        <span className='home-numero-paso'>
                            1
                        </span>
                        <span className='home-text-paso'>
                            Registrate gratis en 5 segundos
                        </span>

                </div>
            </div>

            <div className='home-div-paso'>
                <img src={ Paso2 } className='home-image-paso' alt='paso-2'/>
                <div className='home-div-numero-paso'>
                        <span className='home-numero-paso'>
                            2
                        </span>
                        <span className='home-text-paso'>
                            Comenzá a subir fotos y escribir cartas
                        </span>

                </div>
            </div>

            <div className='home-div-paso'>
                <img src={ Paso3 } className='home-image-paso' alt='paso-3'/>
                <div className='home-div-numero-paso'>
                        <span className='home-numero-paso'>
                            3
                        </span>
                        <span className='home-text-paso'>
                            Agregá invitados para que puedan ver y comentar
                        </span>

                </div>
            </div>

        </div>

        <div className='home-div-video-desktop'>
            <h4
                className='home-video-titulo '
            >
                ECHA UN VISTAZO 
            </h4>
            <video 
                    width="70%" 
                    height="70%" 
                    controls
                    // className='home-video-desktop'
                >
                    <source src={ VideoDesktop } type="video/mp4"/>
                    Your browser does not support the video tag.
                </video>
        </div>

        <div className='home-div-video-mobile'>
            <h4
                className='home-video-titulo '
            >
                ECHA UN VISTAZO 
            </h4>
            <video 
                width="300" 
                height="600" 
                controls
            >
                <source src={ VideoMobile } type="video/mp4"/>
            </video>
        </div>
        
        <Footer/>
    
    </div>

    </>
  );
};

export default HomeScreen;