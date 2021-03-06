import { pictureTransitionsStyle } from "./types";

export function loadOneImage(url) {
    let image = new Image();

    let promise = new Promise((resolve, reject) => {
        image.onload = () => {
            resolve(image);
        };

        image.onerror = () => {
            reject();
        };
    });

    image.src = url;

    return promise;
}

export function newTransitionsList<
    T extends
        | keyof typeof pictureTransitionsStyle
        | (keyof typeof pictureTransitionsStyle)[]
>(toast: number, transitionsStyle: T, transitionsCustomList) {
    let list = [];

    for (let i = 0; i < toast; i++) {
        let type: T;
        let chooseArr: any;
        if (transitionsStyle && typeof transitionsStyle === "string") {
            type = transitionsStyle;
        } else {
            if (transitionsStyle) {
                chooseArr = transitionsStyle;
            } else {
                chooseArr = Object.values(pictureTransitionsStyle);
            }
            let chooseIndex = 0;

            if (
                transitionsCustomList &&
                transitionsCustomList[i] &&
                transitionsCustomList[i] < chooseArr.length
            ) {
                chooseIndex = transitionsCustomList[i];
            } else {
                chooseIndex = Math.floor(Math.random() * chooseArr.length);
            }
            type = pictureTransitionsStyle[chooseArr[chooseIndex]];
        }

        list.push(type);
    }

    return list;
}
