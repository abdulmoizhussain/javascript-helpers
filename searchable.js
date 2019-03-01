function searchable(text) {
//     return text.replace(/[@!#$%^&*(),?":{}|<> =/+;:'-\\_~`]+/g, " ").trim();
    return text.replace(/[^a-zA-Z0-9]+/g, " ").trim();
}
