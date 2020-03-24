import React from "react";
import { render } from "react-dom";
import ReactDemo from "../src"; // 引入组件
import "./app.less";

const App = () => (
    <ReactDemo
        imagesList={[
            "https://images.pexels.com/photos/994883/pexels-photo-994883.jpeg?auto=compress&crop=bottom&cs=tinysrgb&fit=crop&h=350.0&sharp=10&w=1400",
            "https://s0.seewo.com/www-seewo-com/Uploads/Banner/original_img/5e79b9bf9a2cc.jpg",
            "https://desk-fd.zol-img.com.cn/t_s960x600c5/g2/M00/0F/0E/ChMlWV55dlOIaGQ0AAp-Dkp7pn4AAN05gBiz7UACn4m118.jpg",
            "https://sjbz-fd.zol-img.com.cn/t_s320x510c5/g2/M00/0D/02/ChMlWl5pqtWIAeMzAA3w6d7ofvUAANp_gAAEvkADfEB495.jpg",
            "https://sjbz-fd.zol-img.com.cn/t_s320x510c5/g2/M00/0E/03/ChMlWV5wMUmIbjhjAAsEjVv7hfgAANuJAOp9qoACwSl539.jpg"
        ]}
    />
);
render(<App />, document.getElementById("root"));
