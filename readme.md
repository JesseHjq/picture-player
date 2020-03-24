# Picture-player

react | typescript

    A light and cool picture slideshow component

### Preview

<b>fade in and out<b>

![Alt Text](./example/static/fadein.gif)

<b>many circle<b>

![Alt Text](./example/static/circle.gif)

<b>diamond<b>

![Alt Text](./example/static/diamond.gif)

<b>cut in and out<b>

![Alt Text](./example/static/cutin.gif)

<b>shutter<b>

![Alt Text](https://github.com/JesseHjq/picture-player/tree/master/example/static/shutter.gif)

many more motion style is coming, please look forward to;

### Explanation

Above five style will randomly used in component, will consider open options in the future

### Install

    npm install --save picture-player

### Using

    import PicturePlayer from 'picture-player';

    <PicturePlayer imagesList={[...]}></PicturePlayer>

### Component Props

-   imagesList

    picture list array

*   timeInterval

    player interval, default 5000ms

*   feedbackIndex

    function, player go next will run this function, send newest index to this function
