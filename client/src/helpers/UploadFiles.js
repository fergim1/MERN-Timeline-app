export const UploadFiles = async (memory) => {

const cloudUrl ='https://api.cloudinary.com/v1_1/fergim1/upload'

const formData = new FormData();
formData.append('upload_preset', 'timeline')
formData.append('file', memory.images[0])

try {
    const resp = await fetch (cloudUrl, {
        method: 'POST',
        body: formData
    })

    if ( resp.ok ) {
        const cloudResp = await resp.json();
        return cloudResp.secure_url;
    }
    else {
        throw await resp.json()
    }
} catch (error) {
    console.log(error)
    
}

}