import React, { PureComponent } from "react";
import "./picture-player.less";

interface IProps {
    pictureList: {
        url: string,
        previousHideStyle:
    }[]
}

export default class Component extends PureComponent<IProps> {
    render() {
        return (
            <div styleName="wrapper">
                <p>1111</p>
            </div>
        );
    }
}
