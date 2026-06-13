export default function ImageValidator(e) {
    if (e.target.files.length === 1) {
        let pic = e.target.files[0]
        if (!["image/jpeg", "image/jpg", "image/png", "image/gif", "image/webp"].includes(pic.type))
            return "Invalid Pic, Please Upload an Image of Type .jpeg, .jpg,.png,.gif,.webp"
        else if (pic.size > 1048576)
            return "Pic is Too Heavy, Please Upload an Image Upto 1MB"
        else
            return ""
    }
    else {
        return ""
    }
}
