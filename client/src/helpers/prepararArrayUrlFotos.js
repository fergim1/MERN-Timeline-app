
export function prepararArrayUrlFotos ( activeMemory ) {
    var arrayUrl = []
    if(activeMemory?.images) {
        for ( var i = 0 ; i < activeMemory.images.length; i++ ) {
                let objetoUrl = {
                           src: activeMemory.images[i],
                           width: 4,
                           height: 4
                                 }
         arrayUrl.push(objetoUrl)
            
       }
     return arrayUrl

    }
   }
  