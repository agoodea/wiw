import vue from "vue";

export default {
    ID() {
        return '_' + Math.random().toString(36).substr(2, 9);
    }
}