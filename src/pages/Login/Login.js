import React, { useState } from "react";
import LoginForm from "../../components/LoginForm/LoginForm";
// import RegisterForm from "../../components/RegisterForm/RegisterForm";

import "../../assets/scss/_login.scss";
import logo from "../../assets/img/logo.png";
import img1 from "../../assets/img/image1.png";
import img2 from "../../assets/img/image2.png";
import img3 from "../../assets/img/image3.png";

const text1 = "Looking for a digitizing system ";
const text2 = "Quickly manage customers";
const text3 = "An upgraded version";

export default function Login() {
  const [mainClass, setMainClass] = useState("sign-in-mode");
  const [text, setText] = useState("text1");
  const [img, setImg] = useState(img1);
  const [imgShow, setImgShow] = useState({
    img1: "show",
    img2: "hide",
    img3: "hide",
    bullet1: "active",
    bullet2: "",
    bullet3: "",
  });

  const handleSignUpMode = () => {
    setMainClass("sign-up-mode");
  };

  const handleSignInMode = () => {
    setMainClass("sign-in-mode");
  };

  return (
    <div className="loginpage">
      <main className={mainClass}>
        <div className="box">
          <div className="inner-box">
            {/* Forms */}
            <div className="forms-wrap">
              {/* Login form */}
              <LoginForm logo={logo} onClick={handleSignUpMode} />

              {/* Register Form */}
              {/* <RegisterForm logo={logo} onClick={handleSignInMode} /> */}
            </div>
            {/* Carousel */}
            <div className="carousel">
              <div className="images-wrapper">
                <img
                  src={img}
                  className={"image img1 " + imgShow.img1}
                  alt=""
                />
                <img
                  src={img}
                  className={"image img2 " + imgShow.img2}
                  alt=""
                />
                <img
                  src={img}
                  className={"image img3 " + imgShow.img3}
                  alt=""
                />
              </div>
              <div className="text-slider">
                <div className="text-wrap">
                  <div className={"text-group " + text}>
                    <h2>{text1}</h2>
                    <h2>{text2}</h2>
                    <h2>{text3}</h2>
                  </div>
                </div>
                <div className="bullets">
                  <span
                    className={"text " + imgShow.bullet1}
                    onClick={() => {
                      setText("text1");
                      setImg(img1);
                      setImgShow({
                        img1: "show",
                        img2: "hide",
                        img3: "hide",
                        bullet1: "active",
                        bullet2: "",
                        bullet3: "",
                      });
                    }}
                  ></span>
                  <span
                    className={"text " + imgShow.bullet2}
                    onClick={() => {
                      setText("text2");
                      setImg(img2);
                      setImgShow({
                        img1: "hide",
                        img2: "show",
                        img3: "hide",
                        bullet1: "",
                        bullet2: "active",
                        bullet3: "",
                      });
                    }}
                  ></span>
                  <span
                    className={"text " + imgShow.bullet3}
                    onClick={() => {
                      setText("text3");
                      setImg(img3);
                      setImgShow({
                        img1: "hide",
                        img2: "hide",
                        img3: "show",
                        bullet1: "",
                        bullet2: "",
                        bullet3: "active",
                      });
                    }}
                  ></span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
