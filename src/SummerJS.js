/*
 *
 * SummerJS - By mforoud86
 * Any and all donations/pull requests are appreciated.
 * SummerJS is lisenced under the MIT License.
 * 
 */

let SummerJS = (query, data) => {
    if (document.querySelector("query") == null) {
        return { "error": "Invalid query selector." };
    } else if (data == null || data == {}) {
        return { "error": "Please give me some data!" };
    } else {
        /* Initialize the SummerJS object and return it. */
        let obj = {};

        obj.error = "none";
        obj.objects = [];
        obj.solid = () => { return "solid"; };
        obj.object = (name, sprite, data) => {
            let made = {};
            made.name = name;
            made.sprite = btoa(sprite);
            made.data = data;
            made.type = "summer-obj";

            return made;
        };
        obj.add = (data) => {
            if (data.type == "summer-obj") {
                obj.objects.push(data);

                return { "error": "none" };
            } else {
                return { "error": "Not a SummerJS object." };
            }
        };
    }
};