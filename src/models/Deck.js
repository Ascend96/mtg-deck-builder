import CardCollection from "@/models/CardCollection";
// Deck Model for firebase collection creation

export default function Deck(){
        return {
            name: '',
            image: null,
            cards: new CardCollection(),
            format: '',
            createdBy: null,
            ownerId: '',

    }
}

