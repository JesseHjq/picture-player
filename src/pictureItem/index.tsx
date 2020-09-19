import React, { PureComponent } from "react";
import { ImageSizeType } from "src/types";
import "./pictureItem.less";

interface IProps {
    imageUrl: string;
    imageObj: HTMLImageElement;
    index: number;
    appearType: string;
    disappearType: string;
    appear: boolean;
    zIndex: number;
    imageSize: keyof typeof ImageSizeType;
    screensaverMode: boolean;
    timeInterval: number;
}

const ANIMATION_NAME = [
    "shapping_top_left",
    "shapping_top",
    "shapping_left",
    "shapping_top_right",
    "shapping_right",
    "shapping_bottom_right",
    "shapping_bottom",
    "shapping_bottom_left",
    "shapping_scale_up",
    "shapping_scale_down",
];

const getScreensaverStyleName = () => {
    return ANIMATION_NAME[Math.floor(Math.random() * ANIMATION_NAME.length)];
};

export default class PictureItem extends PureComponent<IProps> {
    state = {
        styleType: "hide",
        screensaverType:
            this.props.screensaverMode && this.props.appear
                ? getScreensaverStyleName()
                : "",
    };

    showImage = () => {
        const { screensaverMode } = this.props;
        this.setState(
            {
                styleType: this.props.appearType + "_show",
            },
            () => {
                screensaverMode &&
                    setTimeout(() => {
                        this.setState({
                            screensaverType:
                                this.props.screensaverMode && this.props.appear
                                    ? getScreensaverStyleName()
                                    : "",
                        });
                    }, 1500);
            }
        );
    };

    hideImage = () => {
        const { screensaverMode } = this.props;
        this.setState(
            {
                styleType: this.props.disappearType + "_hide",
            },
            () => {
                screensaverMode &&
                    setTimeout(() => {
                        this.setState({
                            screensaverType:
                                this.props.screensaverMode && this.props.appear
                                    ? getScreensaverStyleName()
                                    : "",
                        });
                    }, 1500);
            }
        );
    };

    componentDidUpdate(preProps) {
        if (preProps.appear && !this.props.appear) {
            this.hideImage();
        }

        if (this.props.appear && !preProps.appear) {
            this.showImage();
        }
    }

    render() {
        const {
            imageObj,
            imageUrl,
            imageSize,
            screensaverMode,
            timeInterval,
        } = this.props;
        const { screensaverType } = this.state;

        return (
            <div
                styleName={`picture-item ${this.state.styleType}`}
                style={{
                    animationDuration: screensaverMode ? "1.5s" : "1s",
                }}
            >
                <div
                    styleName={`image-box ${
                        screensaverMode ? "shapping" : ""
                    } ${screensaverType}`}
                    style={{
                        backgroundImage: `url("${imageObj ? imageUrl : null}")`,
                        zIndex: this.props.zIndex,
                        backgroundSize: imageSize,
                        animationDuration: timeInterval + 1000 + "ms",
                    }}
                ></div>
            </div>
        );
    }
}
