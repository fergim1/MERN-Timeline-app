

export const prepararFormData = ( memory ) => {

    const formData = new FormData();
    formData.append('title', memory.title)
    formData.append('date', memory.date)
    formData.append('message', memory.message)
    formData.append('user', memory.user)
    formData.append('author', memory.author)
    // Add one for one the images
    for (let i = 0; i < memory.images.length; i++) {
        formData.append("images", memory.images[i]);
    }

    return formData;

}