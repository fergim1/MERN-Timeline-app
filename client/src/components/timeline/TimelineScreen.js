import React from "react";
import { VerticalTimeline, VerticalTimelineElement } from "react-vertical-timeline-component";
import "react-vertical-timeline-component/style.min.css";
import './TimelineScreen.css'
import { FaShoppingBag } from 'react-icons/fa';
import { useSelector } from "react-redux";
import { ButtonAddFab } from "../add/ButtonAddFab";
import { ModalNote } from "../add/ModalNote";




export const TimelineScreen = () => {

    const { memories } = useSelector(state => state.timeline)

  return (
    <div>
      <VerticalTimeline
            className='timeline'
      >
          {
              memories.map( (publication) => (
                    <VerticalTimelineElement
                            key={publication.id}
                            className="vertical-timeline-element--work"
                            contentStyle={{ background: "#FFFFFF", color: "#7A7A7A" }}
                            contentArrowStyle={{ borderRight: "20px solid  #FFFFFF" }}
                            date={ publication.date }
                            iconStyle={{ background: "#3312AB", color: "#fff" }}
                            icon={< FaShoppingBag />}
                    >
                        
                    <h3 className="vertical-timeline-element-title">
                            { publication.title }
                    </h3>

                    <p>
                            { publication.note }
                    </p>

                    </VerticalTimelineElement>

                ))
          }


        {/* <VerticalTimelineElement
          iconStyle={{ background: "#4462F7", color: "#fff" }}
          icon={< FaPlusCircle />}
        /> */}


      </VerticalTimeline>
      
      <ButtonAddFab/>
      <ModalNote/>
    </div>
  );
};
