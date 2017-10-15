/* generates a map of tags to arrays of milliseconds like so:
    {
        "drink": [1000, 4000, 5000]
        "car": [1000, 4000]
        "bus": [2000, 6000, 3000, 16000]

        etc..
    }
*/
import Clarifai from 'clarifai';

export const cApp = new Clarifai.App({
    apiKey: 'be5a7ee646c14bb0ac0e5f6f0baabb7f'
});




// You can also use the SDK by adding this script to your HTML:
//<script type="text/javascript" src="https://sdk.clarifai.com/js/clarifai-latest.js"></script>

export function parseResponseToTagMap(response) {
    const threshold = 0.8;
    const tagMap = {};
    console.log(response);

    if (response.status.description === "Ok") {

        response.outputs[0].data.frames.forEach((frame, index) => {
            frame.data.concepts.forEach((c, index) => {
                if (c.value > threshold) {
                    if (!(c.name in tagMap)) {
                        tagMap[c.name] = [];
                    }
                    tagMap[c.name].push(frame.frame_info.time);
                }
            });
        });
    } else {
        console.log("error");
    }

    return tagMap;

}


export function timeFormat(sec) {
    let date = new Date(sec);
    let hh = date.getUTCHours();
    let mm = date.getUTCMinutes();
    let ss = date.getSeconds();
    // If you were building a timestamp instead of a duration, you would uncomment the following line to get 12-hour (not 24) time
    // if (hh > 12) {hh = hh % 12;}
    // These lines ensure you have two-digits
    var time = ""
    if (hh !== 0) {
        time = hh + ":" + time;
    }
    if (mm < 10) { mm = "0" + mm; }
    if (mm === 0) { mm = "0" + mm; }
    time = time + mm + ":";
    if (ss < 10) { ss = "0" + ss; }
    time = time + ss;

    return time;
}

export function makeAPIRequest(data) {

    cApp.models.predict(Clarifai.GENERAL_MODEL, {base64: data}, {video: true})

    .then(function(response) {
        return response;
    })
    .catch(function(err) {
        console.log(err);
        return null;
    });
}
