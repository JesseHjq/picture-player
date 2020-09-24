import React, { PureComponent } from "react";
import "./picture-player.less";
import { loadOneImage, newTransitionsList } from "./utils";
import PictureItem from "./pictureItem";
import { ImageSizeType, PicturePlayerProps } from "./types";

export default class Component extends PureComponent<PicturePlayerProps> {
    static defaultProps = {
        timeInterval: 5000,
        imageSize: ImageSizeType.contain,
        screensaverMode: false,
    };
    isStartPolling = false;
    interval = null;

    state = {
        imageObjList: [],
        runningIndex: -1,
        transitionsList: [
            ...newTransitionsList(
                this.props.imagesList.length,
                this.props.transitionsStyle,
                this.props.transitionCustomList
            ),
        ],
    };

    loadImageObj = async () => {
        const { imagesList } = this.props;

        for (let i = 0; i < imagesList.length; i++) {
            try {
                await loadOneImage(imagesList[i]);
                this.setState({
                    imageObjList: [...this.state.imageObjList, imagesList[i]],
                });
                this.startPolling();
            } catch (error) {
                console.log(error);

                this.setState({
                    imageObjList: [...this.state.imageObjList],
                });
            }
        }
    };

    startPolling = () => {
        if (!this.isStartPolling) {
            this.isStartPolling = true;
            if (this.state.runningIndex === -1) {
                this.setState({
                    runningIndex: 0,
                });
                if (this.props.feedbackIndex) {
                    this.props.feedbackIndex(0);
                }
            }

            this.interval = setInterval(
                () => {
                    let nextIndex = this.state.runningIndex + 1;
                    if (nextIndex === this.props.imagesList.length) {
                        this.setState({
                            transitionsList: [
                                ...newTransitionsList(
                                    this.props.imagesList.length,
                                    this.props.transitionsStyle,
                                    this.props.transitionCustomList
                                ),
                            ],
                        });
                        nextIndex = 0;
                    }
                    this.setState({
                        runningIndex: nextIndex,
                    });

                    if (this.props.feedbackIndex) {
                        this.props.feedbackIndex(nextIndex);
                    }
                },
                this.props.timeInterval < 5000
                    ? 4000
                    : this.props.timeInterval - 1
            );
        }
    };

    reset = () => {
        clearInterval(this.interval);
        this.setState(
            {
                imageObjList: [],
                runningIndex: -1,
                transitionsList: [
                    ...newTransitionsList(
                        this.props.imagesList.length,
                        this.props.transitionsStyle,
                        this.props.transitionCustomList
                    ),
                ],
            },
            () => {
                this.loadImageObj();
            }
        );
    };

    componentDidUpdate(Preprops) {
        if (
            Preprops.imagesList.toString() !== this.props.imagesList.toString()
        ) {
            this.reset();
        }
    }

    componentDidMount() {
        if (this.props.imagesList.length > 0) {
            this.loadImageObj();
        }
    }
    render() {
        const { imageObjList, runningIndex, transitionsList } = this.state;
        const { imageSize, screensaverMode, timeInterval } = this.props;

        return (
            <div styleName="wrapper">
                <div styleName="box">
                    {imageObjList.map((item, index) => {
                        if (
                            (index >= runningIndex - 1 &&
                                index <= runningIndex + 1) ||
                            (runningIndex === 0 &&
                                index === imageObjList.length - 1) ||
                            (runningIndex === imageObjList.length - 1 &&
                                index === 0)
                        ) {
                            return (
                                <PictureItem
                                    key={index}
                                    imageUrl={item}
                                    imageObj={imageObjList[index]}
                                    index={index}
                                    appear={runningIndex === index}
                                    appearType={transitionsList[index]}
                                    disappearType={
                                        index + 1 === imageObjList.length
                                            ? transitionsList[0]
                                            : transitionsList[index + 1]
                                    }
                                    zIndex={
                                        runningIndex ===
                                            imageObjList.length - 1 &&
                                        index === 0
                                            ? imageObjList.length
                                            : index
                                    }
                                    imageSize={imageSize}
                                    screensaverMode={screensaverMode}
                                    timeInterval={timeInterval}
                                ></PictureItem>
                            );
                        }
                    })}
                </div>
            </div>
        );
    }
}
