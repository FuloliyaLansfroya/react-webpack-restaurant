export default (type, list) => {
    let newList = [];
    list.map((value, index) => {
        if (value.type === type) {
            newList.push(value);
        }
    })
    return newList;
}

