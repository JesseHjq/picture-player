import React, { PureComponent } from "react";
import "./picture-player.less";
import { loadOneImage, newTransitionsList } from "./utils";
import PictureItem from "./pictureItem";

interface IProps {
    imagesList: string[];
    timeInterval?: number;
    feedbackIndex?: (index) => {};
}

export default class Component extends PureComponent<IProps> {
    static defaultProps = {
        timeInterval: 5000
    };
    isStartPolling = false;

    state = {
        imageObjList: [],
        runningIndex: -1,
        transitionsList: [...newTransitionsList(this.props.imageList.length)]
    };

    loadImageObj = async () => {
        const { imageList } = this.props;

        for (let i = 0; i < imageList.length; i++) {
            try {
                let imageObj = await loadOneImage(imageList[i]);
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
                if (nextIndex === this.props.imageList.length) {
                    this.setState({
                        transitionsList: [
                            ...newTransitionsList(this.props.imageList.length)
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
        const { imageList } = this.props;

        return (
            <div styleName="wrapper">
                {imageList.map((item, index) => (
                    <PictureItem
                        key={index}
                        imageUrl={item}
                        imageObj={imageObjList[index]}
                        index={index}
                        appear={runningIndex === index}
                        appearType={transitionsList[index]}
                        disappearType={
                            index + 1 === imageList.length
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
