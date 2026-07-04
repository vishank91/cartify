export default function TextValidator(e) {
    let { name, value } = e.target
    switch (name) {
        case "name":
        case "icon":
            if (!value || value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 3 || value.length > 100)
                return name + " Field Length Must Be 3-100 Characters"
            else
                return ""

        case "shortDescription":
        case "question":
        case "answer":
            if (!value || value.length === 0)
                return name + " Field is Mendatory"
            else if (value.length < 20)
                return name + " Field Length Must Be More Then 20 Characters"
            else
                return ""

        case "basePrice":
            if (!value || value.length === 0)
                return name + " Field is Mendatory"
            else if (parseInt(value) < 1)
                return "Base Price Field Length Must Be More Then 0"
            else
                return ""


        case "stockQuantity":
            if (!value || value.length === 0)
                return name + " Field is Mendatory"
            else if (parseInt(value) < 0)
                return "Base Price Field Length Must Be More Then 0 or Equal to 0"
            else
                return ""


        case "discount":
            if (!value || value.length === 0)
                return name + " Field is Mendatory"
            else if (parseInt(value) < 0 || parseInt(value) > 100)
                return "Discount Must be 0-100"
            else
                return ""

        default:
            return ""
    }
}
