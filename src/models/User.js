export default function User(firebaseUser){
    let m = {
        displayName: '',
        email: '',
        uid: ''
    }
    if(firebaseUser){
        m.displayName = firebaseUser.displayName ? firebaseUser.displayName : '';
        m.email = firebaseUser.email ? firebaseUser.email : '';
        m.uid = firebaseUser.uid ? firebaseUser.uid : '';
    }
    return m;
}
