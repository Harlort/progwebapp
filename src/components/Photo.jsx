import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import AppsIcon from "@mui/icons-material/Apps";
import Button from "@mui/material/Button";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import classNames from "classnames";
import png from "../asset/icon.png";

const Photo = () => {
  const videoRef = useRef(null);
  const photoRef = useRef(null);
  const existingPhoto = JSON.parse(localStorage.getItem("photos")) || [];
  const [image, setImage] = useState(existingPhoto);
  const [captured, setCaptured] = useState(false);
  let navigate = useNavigate();


  const requestNotification = () => {
    if (Notification.permission === "granted") {
      new Notification("Bröllopsfotografen", {
        body: "Photo saved !",
        icon: png,
      });
    } else if (Notification.permission !== "denied") {
      Notification.requestPermission().then(permission => {
        console.log(permission);
      });
    }
  };

  const getVideo = () => {
    if (!captured) {
      navigator.mediaDevices
        .getUserMedia({
          video: { width: 550, height: 450 },
        })
        .then(stream => {
          let video = videoRef.current;
          video.srcObject = stream;
          video.play();
        })
        .catch(err => {
          console.error(err);
        });
    } else {
      return;
    }
  };

  const takePhoto = async () => {
    const width = 550;
    const height = width / (16 / 9);

    let video = videoRef.current;
    let photo = photoRef.current;

    photo.width = width;
    photo.height = height;

    let ctx = photo.getContext("2d");
    ctx.drawImage(video, 0, 0, width, height);
    setCaptured(true);
    const canvas = document.getElementById("canvas");
    
    const imageData = {
      id: image.length,
      src: canvas.toDataURL("image/png"),
    };
    
    setImage([...image, imageData]);
    localStorage.setItem("photos", JSON.stringify(imageData));
    requestNotification();
    
  };

  const newPhoto = () => {
    let photo = photoRef.current;
    let ctx = photo.getContext("2d");

    ctx.clearRect(0, 0, photo.width, photo.height);
    setCaptured(false);
    getVideo();
  };


  useEffect(() => {
    localStorage.setItem("photos", JSON.stringify(image));
    getVideo();
  }, [videoRef, captured]);


  let customClass = classNames({
    "video__Box status": !captured,
    video__Box: captured,
  });
  
  return (
    <div className="App">
      <div className="galleryIcon__Container">
        <AppsIcon
          onClick={() => {
            navigate("/gallery");
          }}
          style={{ fontSize: 50, color: "hotpink", cursor: "pointer" }}
        />
      </div>

      <div className="video__Container">
        {!captured && (
          <div className="video__Box">
            <video ref={videoRef}></video>
          </div>
        )}

        <div className={customClass}>
          <canvas id="canvas" ref={photoRef}></canvas>
        </div>
      </div>
      <div className="button__Container">
        {!captured && (
          <Button
            onClick={takePhoto}
            variant="outlined"
            startIcon={<CameraAltIcon />}
            style={{
              color: "hotpink",
              fontSize: "20px",
            }}
          >
            Föreviga ett ögonblick
          </Button>
        )}

        {captured && (
          <Button
            onClick={newPhoto}
            variant="outlined"
            startIcon={<CameraAltIcon />}
            style={{
              color: "hotpink",
              fontSize: "20px",
            }}
          >
            Fånga ett nytt ögonblick
          </Button>
        )}
      </div>
    </div>
  );
};

export default Photo;
