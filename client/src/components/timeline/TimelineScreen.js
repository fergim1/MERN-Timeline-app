import React from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";

import { FaEnvelope, FaImage, FaVideo } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { ButtonAddFab } from "../floating-action-button/ButtonAddFab";
import { ModalAddLetter } from "../floating-action-button/letter/ModalAddLetter";
import { ModalShowLetter } from "../ui/letter/ModalShowLetter";
import { uiOpenModalShowLetter, uiOpenModalShowPhotos } from "../../actions/ui";
import { timelineStartActiveMemory } from "../../actions/timeline";
import { ModalAddPhotos } from "../floating-action-button/photos/ModalAddPhotos";
import { ModalShowPhotos } from '../ui/photos/ModalShowPhotos'


import "react-vertical-timeline-component/style.min.css";
import './TimelineScreen.css'




export const TimelineScreen = () => {

    const dispatch = useDispatch()
    const { memories } = useSelector(state => state.timeline)
    const { activeMemory } = useSelector(state => state.timeline)  


    const handleModalLetter = (memory) =>{
      dispatch ( uiOpenModalShowLetter() )
      dispatch ( timelineStartActiveMemory( memory ) )
    }

    const handleModalPhotos = (memory) =>{
      dispatch ( uiOpenModalShowPhotos () )
      dispatch ( timelineStartActiveMemory( memory ) )
    }

    const handleModalVideo = ( memory ) => {
      console.log('Click icono VIDEO')
    }

    const iconsTimeline = (memory) => {
        if (memory.letter) {
          return <FaEnvelope className='pointer' onClick= { () => handleModalLetter (memory) }/> 
        }
        if (memory.images) {
          return <FaImage className='pointer' onClick= { () => handleModalPhotos (memory) }/> 
        }
        if (memory.video) {
          return <FaVideo className='pointer' onClick= { () => handleModalVideo (memory) }/> 
        }
    }

 

  return (
    <div>  
      <VerticalTimeline
            className='timeline'
            animate={false}
      >
          {
              memories.map( (memory) => (
                    <VerticalTimelineElement
                            key={memory.id}
                            className="vertical-timeline-element--work"
                            contentStyle={{ background: "#FFFFFF", color: "#7A7A7A" }}
                            contentArrowStyle={{ borderRight: "20px solid  #FFFFFF" }}
                            date={ memory.date }
                            iconStyle={{ background: "#3312AB", color: "#fff" }}                            
                            icon= { iconsTimeline( memory ) }    
                    >
                        
                    <h3 className="vertical-timeline-element-title">
                            { memory.title }
                    </h3>

                    <p>
                            { memory.message }
                    </p>

                    <div style={{marginTop: '10px'}}>

                        {
                          (memory.letter) && 
                          <i 
                            className="fas fa-envelope fa-lg pointer"
                            onClick= { () => handleModalLetter (memory) }
                          
                          ></i>
                        }

                        {
                          (memory.images.length > 0) && 
                          <i 
                            className="fas fa-image fa-lg pointer"
                            onClick= { () => handleModalPhotos (memory) }
                          ></i>
                        }

                        {
                          (memory.video) && 
                          <i 
                            className="fas fa-video fa-lg pointer"
                            onClick= { () => handleModalVideo (memory) }
                            ></i>
                        } 

                    </div>

                    </VerticalTimelineElement>

                ))
          }


      </VerticalTimeline>
      <ModalAddLetter/>
      <ModalShowLetter/>
      <ModalAddPhotos/>
      <ModalShowPhotos/>     

      {
        !activeMemory?.title && <ButtonAddFab/>
      }
    </div>
  );
};
