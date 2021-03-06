export enum pictureTransitionsStyle {
    "fadeIn" = "fadeIn", //淡入
    "cutInFromRight" = "cutInFromRight", //从右部切入
    "cutInFromBottom" = "cutInFromBottom", //从底部切入
    "shutter" = "shutter", //百叶窗
    "flowersCircle" = "flowersCircle", //百圆齐放
    "diamond" = "diamond", //菱形效果
    "scroll180" = "scroll180", //反转180
}

export enum ImageSizeType {
    "contain" = "contain",
    "cover" = "cover",
}

export interface PicturePlayerProps {
    imagesList: string[];
    timeInterval?: number;
    feedbackIndex?: (index: number) => void;
    transitionsStyle?:
        | keyof typeof pictureTransitionsStyle
        | (keyof typeof pictureTransitionsStyle)[];
    imageSize?: keyof typeof ImageSizeType;
    screensaverMode?: boolean;
    transitionCustomList?: number[];
}
