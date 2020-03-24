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

export function newTransitionsList(toast: number) {
    let list = [];

    for (let i = 0; i < toast; i++) {
        let chooseIndex = Math.floor(
            Math.random() * Object.keys(pictureTransitionsStyle).length
        );

        list.push(
            pictureTransitionsStyle[
                Object.keys(pictureTransitionsStyle)[chooseIndex]
            ]
        );
    }

    return list;
}
