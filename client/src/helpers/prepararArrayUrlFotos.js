
export function prepararArrayUrlFotos ( activeMemory ) {
    var arrayUrl = []
    if(activeMemory?.images) {
        for ( var i = 0 ; i < activeMemory.images.length; i++ ) {
                let objetoUrl = {
                           src: activeMemory.images[i].secure_url,
                           width: activeMemory.images[i].width/100,
                           height: activeMemory.images[i].height/100
                                 }
         arrayUrl.push(objetoUrl)
            
       }
     return arrayUrl

    }
   }
  