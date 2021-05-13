import bebe1 from '../../../images/bebe.jpg'
import bebe2 from '../../../images/bebe2.jpg'
import bebe3 from '../../../images/bebe3.jpg'
import bebe4 from '../../../images/bebe4.jpg'
import bebe5 from '../../../images/bebe5.jpg'
import bebe6 from '../../../images/bebe6.jpg'
import bebe7 from '../../../images/bebe7.jpg'
import bebe8 from '../../../images/bebe8.jpg'



export const fotos = [
    {
      src: bebe1,
      width: 4,
      height: 4
    },
    {
      src: bebe2,
      width: 4,
      height: 4
    },
    {
      src: bebe3,
      width: 4,
      height: 4
    },
    {
      src: bebe4,
      width: 4,
      height: 4
    },
    {
        src: bebe5,
        width: 4,
        height: 4
      },
      {
        src: bebe6,
        width: 4,
        height: 4
      },
      {
        src: bebe7,
        width: 4,
        height: 4
      },
      {
        src: bebe8,
        width: 4,
        height: 4
      }
]




export function arrayFotos ( memories ) {
  var arrayUrl = []
      for (var i = 0 ; i< memories.length; i++) {
        if (memories[i].images) {
              let objetoUrl = {
                         src: memories[i].images,
                         width: 4,
                         height: 4
                               }
       arrayUrl.push(objetoUrl)
          }
     }
   return arrayUrl
 }