
export const UploadFiles = async (memory) => {
    
    const cloudUrl ='https://api.cloudinary.com/v1_1/fergim1/upload'
    const files = memory.images
    const formData = new FormData();
    let arrayUrl = []

    for (let i = 0; i < files.length; i++) {
        let file = files[i];
        formData.append("file", file);
        formData.append('upload_preset', 'timeline')

   let resp = await fetch (cloudUrl, {
                method: 'POST',
                body: formData
            })
    let cloudResp = await resp.json();
    arrayUrl.push(cloudResp.secure_url )
    
    }
    return  arrayUrl

// formData.append('upload_preset', 'timeline')
// formData.append('file', memory.images[0])

// try {
//     const resp = await fetch (cloudUrl, {
//         method: 'POST',
//         body: formData
//     })

//     if ( resp.ok ) {
//         const cloudResp = await resp.json();
//         return cloudResp.secure_url;
//     }
//     else {
//         throw await resp.json()
//     }
// } catch (error) {
//     console.log(error)
    
// }

}