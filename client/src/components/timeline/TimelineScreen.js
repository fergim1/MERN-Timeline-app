import React from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";

import { FaShoppingBag } from 'react-icons/fa';
import { useDispatch, useSelector } from "react-redux";
import { ButtonAddFab } from "../floating-action-button/ButtonAddFab";
import { ModalAddLetter } from "../floating-action-button/letter/ModalAddLetter";

import "react-vertical-timeline-component/style.min.css";
import './TimelineScreen.css'
import { ModalShowLetter } from "../ui/letter/ModalShowLetter";
import { uiOpenModalShowLetter, uiOpenModalShowPhotos } from "../../actions/ui";
import { timelineStartActiveMemory } from "../../actions/timeline";
import { ModalAddPhotos } from "../floating-action-button/photos/ModalAddPhotos";
import { ModalShowPhotos } from '../ui/photos/ModalShowPhotos'




export const TimelineScreen = () => {

    const dispatch = useDispatch()
    const { memories } = useSelector(state => state.timeline)


    const handleModalLetter = (memory) =>{
      dispatch ( uiOpenModalShowLetter() )
      dispatch ( timelineStartActiveMemory( memory ) )
    }

    const handleModalPhotos = (memory) =>{
      dispatch ( uiOpenModalShowPhotos () )
      dispatch ( timelineStartActiveMemory( memory ) )
    }


  return (
    <div>
      <VerticalTimeline
            className='timeline'
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
                            icon={< FaShoppingBag />}
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
                          (memory.images) && 
                          <i 
                          className="fas fa-image fa-lg pointer"
                          onClick= { () => handleModalPhotos (memory) }
                          ></i>
                        }

                        {
                          (memory.video) && 
                          <i className="fas fa-video fa-lg pointer"></i>
                        } 

                    </div>

                    </VerticalTimelineElement>

                ))
          }


        {/* <VerticalTimelineElement
          iconStyle={{ background: "#4462F7", color: "#fff" }}
          icon={< FaPlusCircle />}
        /> */}


      </VerticalTimeline>
      
      <ButtonAddFab/>
      <ModalAddLetter/>
      <ModalShowLetter/>
      <ModalAddPhotos/>
      <ModalShowPhotos/>
    </div>
  );
};
