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
    T extends keyof typeof pictureTransitionsStyle
>(toast: number, transitionsStyle: T) {
    let list = [];

    for (let i = 0; i < toast; i++) {
        let type: T;
        if (transitionsStyle) {
            type = transitionsStyle;
        } else {
            let chooseIndex = Math.floor(
                Math.random() * Object.keys(pictureTransitionsStyle).length
            );

            type =
                pictureTransitionsStyle[
                    Object.keys(pictureTransitionsStyle)[chooseIndex]
                ];
        }

        list.push(type);
    }

    return list;
}
