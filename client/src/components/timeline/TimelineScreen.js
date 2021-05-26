import React from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import moment from 'moment';
import { FaEnvelope, FaImage } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { ButtonAddFab } from "../floating-action-button/ButtonAddFab";

import { ModalAddLetter } from "../floating-action-button/letter/ModalAddLetter";
import { ModalShowLetter } from "../ui/letter/ModalShowLetter";
import { uiOpenModalShowLetter, uiOpenModalShowPhotos } from "../../actions/ui";
import { timelineStartActiveMemory } from "../../actions/timeline";
import { ModalAddPhotos } from "../floating-action-button/photos/ModalAddPhotos";
import { ModalShowPhotos } from '../ui/photos/ModalShowPhotos'
import Navbar from "../navbar";

import "react-vertical-timeline-component/style.min.css";
import './TimelineScreen.css';
import { WhitoutMemories } from "../ui/whitout-memories/WhitoutMemories";




export const TimelineScreen = () => {

    const dispatch = useDispatch()
    const { memories } = useSelector(state => state.timeline)
    const { modalAddLetterOpen, ModalShowLetter:ModalShowLetterOpen, modalAddPhotos:modalAddPhotosOpen, ModalShowPhotos:ModalShowPhotosOpen } = useSelector(state => state.ui)


    const handleModalLetter = (memory) =>{
      dispatch ( uiOpenModalShowLetter() )
      dispatch ( timelineStartActiveMemory( memory ) )
    }

    const handleModalPhotos = (memory) =>{
      dispatch ( uiOpenModalShowPhotos () )
      dispatch ( timelineStartActiveMemory( memory ) )
    }

    // const handleModalVideo = ( memory ) => {
    //   console.log('Click icono VIDEO')
    // }

    const iconsTimeline = (memory, classIcon) => {
        if (memory.letter) {
          return <FaEnvelope className={`pointer ${classIcon}` } onClick= { () => handleModalLetter (memory) }/> 
        }
        if (memory.images) {
          return <FaImage className={`pointer ${classIcon}`} onClick= { () => handleModalPhotos (memory) }/> 
        }
        // if (memory.video) {
        //   return <FaVideo className='pointer icon' onClick= { () => handleModalVideo (memory) }/> 
        // }
    } 

  return (
    <div>  
      <Navbar/>
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
                            date={ moment(memory.date).format("DD - MMMM - YYYY")  }
                            iconStyle={{ background: "#FC0071", color: "#fff" }}                            
                            icon= { iconsTimeline( memory, 'iconWhite' ) }    
                    >

                    <div className='tituloYicono'>
                        <h3 className="vertical-timeline-element-title">
                                { memory.title }
                        </h3>
                        { iconsTimeline( memory, 'iconGray' ) }
                    </div>

                    <p>
                        { memory.message }
                    </p>

                    </VerticalTimelineElement>
                ))
          }


      </VerticalTimeline>
      <ModalAddLetter/>
      <ModalShowLetter/>
      <ModalAddPhotos/>
      <ModalShowPhotos/>   
      {
        (!modalAddLetterOpen && !ModalShowLetterOpen && !modalAddPhotosOpen && !ModalShowPhotosOpen) 
        && <ButtonAddFab/>
      }


      {
        (!memories[0]) 
        && <WhitoutMemories/>
      }

    </div>
  );
};
