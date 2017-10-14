/* generates a map of tags to arrays of milliseconds like so:
    {
        "drink": [1000, 4000, 5000]
        "car": [1000, 4000]
        "bus": [2000, 6000, 3000, 16000]

        etc..
    }
*/
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

