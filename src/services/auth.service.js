import vue from "vue";

export default {
    isAutentificated() {
        let isAuth = false;
        firebase.auth().onAuthStateChanged(function(user) {
            if (user) {
                // alert(JSON.stringify(user));
                // debugger
                // vm.$data.isAuth = true;
                isAuth = true;
            } else {
                alert('No!');
                isAuth = false;
            }
        });

        return isAuth;
    },

    getCurrentUser() {
        var user = firebase.auth().currentUser;

        if (user) {
            return user;
        } else {
            return {}
        }
    },

    createUser(user) {
        return firebase.auth().createUserWithEmailAndPassword(user.email, user.password)
            .then((user) => {
                // alert(JSON.stringify(User));
                return user;
                // Vue.$user = user;
            })
            .catch((error) => {

                throw error;
                // Handle Errors here.
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // alert(errorCode);
                // alert(errorMessage);


            });

    },
    signIn(user) {
        return firebase.auth().signInWithEmailAndPassword(user.email, user.password)
            .then((user) => {
                return user;
                // Vue.$user = user;
            })
            .catch((error) => {
                // Handle Errors here.
                throw error;
                // var errorCode = error.code;
                // var errorMessage = error.message;
                // alert(errorCode);
                // alert(errorMessage);
                // ...
            });

    }

}