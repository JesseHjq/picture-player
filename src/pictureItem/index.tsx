import React, { PureComponent } from "react";
import "./pictureItem.less";

interface IProps {
    imageUrl: string;
    imageObj: HTMLImageElement;
    index: number;
    appearType: string;
    disappearType: string;
    appear: boolean;
    zIndex: number;
}

export default class PictureItem extends PureComponent<IProps> {
    state = {
        styleType: "hide"
    };

    showImage = () => {
        this.setState({
            styleType: this.props.appearType + "_show"
        });
    };

    hideImage = () => {
        this.setState({
            styleType: this.props.disappearType + "_hide"
        });
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
        const { imageObj, imageUrl } = this.props;

        return (
            <div
                styleName={`picture-item ${this.state.styleType}`}
                style={{
                    backgroundImage: `url("${imageObj ? imageUrl : null}")`,
                    zIndex: this.props.zIndex
                }}
            ></div>
        );
    }
}
