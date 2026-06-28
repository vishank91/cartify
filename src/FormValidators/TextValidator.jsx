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

        default:
            return ""
    }
}
