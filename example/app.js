import React from "react";
import { render } from "react-dom";
import ReactDemo from "../src"; // 引入组件
import "./app.less";

const App = () => (
    // <div
    //     style={{
    //         width: 1600,
    //         height: 500,
    //         border: "1px solid #2c3144",
    //         margin: "100px auto",
    //     }}
    // >
    <ReactDemo
        imagesList={[
            "https://images.pexels.com/photos/1809340/pexels-photo-1809340.jpeg?cs=srgb&dl=pexels-ylanite-koppens-1809340.jpg&fm=jpg",
            "https://images.pexels.com/photos/35208/office-home-glasses-workspace.jpg?cs=srgb&dl=pexels-pixabay-35208.jpg&fm=jpg",
            "https://images.pexels.com/photos/115655/pexels-photo-115655.jpeg?cs=srgb&dl=pexels-lee-campbell-115655.jpg&fm=jpg",
        ]}
        transitionsStyle={["scroll180", "fadeIn"]}
        imageSize="cover"
        timeInterval={15000}
        screensaverMode={true}
    />
    // </div>
);
render(<App />, document.getElementById("root"));
