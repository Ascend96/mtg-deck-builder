// simply collection model for arrays of cards
export default function(arr){
    // creates array if one doesnt exist
    if(!Array.isArray(arr)){
        arr = [];
    }

    arr.add = function(card){
        return arr.push(card);
    };

    arr.remove = function(card){
        return arr.splice(arr.findCard(card), 1);
    };

    arr.findCard = function(card){
        return arr.findIndex(function(item){
            return item.id == card.id;
        });
    };
    return arr;
}
