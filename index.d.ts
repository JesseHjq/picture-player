import * as React from "react";

interface Iprops {
    imagesList: string[];
    timeInterval?: number;
    feedbackIndex?: (index) => {};
}
declare class PicturePlayer extends React.Component<Iprops> {}

export default PicturePlayer;
