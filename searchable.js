function searchable(text) {
//     return text.replace(/[@!#$%^&*(),?":{}|<> =/+;:'-\\_~`]/g, " ").replace(/  /g," ");
    return text.replace(/[^a-zA-Z0-9]+/g, " ").trim();
}
