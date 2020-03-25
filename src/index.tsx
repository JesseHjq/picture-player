import React, { PureComponent } from "react";
import "./picture-player.less";
import { loadOneImage, newTransitionsList } from "./utils";
import PictureItem from "./pictureItem";
import { PicturePlayerProps } from "./types";

export default class Component extends PureComponent<PicturePlayerProps> {
    static defaultProps = {
        timeInterval: 5000
    };
    isStartPolling = false;

    state = {
        imageObjList: [],
        runningIndex: -1,
        transitionsList: [
            ...newTransitionsList(
                this.props.imagesList.length,
                this.props.transitionsStyle
            )
        ]
    };

    loadImageObj = async () => {
        const { imagesList } = this.props;

        for (let i = 0; i < imagesList.length; i++) {
            try {
                let imageObj = await loadOneImage(imagesList[i]);
                this.setState({
                    imageObjList: [...this.state.imageObjList, imageObj]
                });
                this.startPolling();
            } catch (error) {
                console.log(error);
                let imageObj = null;
                this.setState({
                    imageObjList: [...this.state.imageObjList, imageObj]
                });
            }
        }
    };

    startPolling = () => {
        if (!this.isStartPolling) {
            this.isStartPolling = true;
            if (this.state.runningIndex === -1) {
                this.setState({
                    runningIndex: 0
                });
            }

            setInterval(() => {
                let nextIndex = this.state.runningIndex + 1;
                if (nextIndex === this.props.imagesList.length) {
                    this.setState({
                        transitionsList: [
                            ...newTransitionsList(
                                this.props.imagesList.length,
                                this.props.transitionsStyle
                            )
                        ]
                    });
                    nextIndex = 0;
                }
                this.setState({
                    runningIndex: nextIndex
                });

                if (this.props.feedbackIndex) {
                    this.props.feedbackIndex(nextIndex);
                }
            }, this.props.timeInterval);
        }
    };

    componentDidMount() {
        this.loadImageObj();
    }
    render() {
        const { imageObjList, runningIndex, transitionsList } = this.state;
        const { imagesList } = this.props;

        return (
            <div styleName="wrapper">
                {imagesList.map((item, index) => (
                    <PictureItem
                        key={index}
                        imageUrl={item}
                        imageObj={imageObjList[index]}
                        index={index}
                        appear={runningIndex === index}
                        appearType={transitionsList[index]}
                        disappearType={
                            index + 1 === imagesList.length
                                ? transitionsList[0]
                                : transitionsList[index + 1]
                        }
                        zIndex={runningIndex === index ? 100 : 99}
                    ></PictureItem>
                ))}
            </div>
        );
    }
}
