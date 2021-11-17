import { useEffect, useState } from "react";

export const useRecorder = () => {
  const [audioURL, setAudioURL] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recorder, setRecorder] = useState(null);
  const [time, setTime] = useState(0);
  const [asmrData, setAsmrData] = useState(null);
  var checkTime;

  useEffect(() => {
    if (recorder === null) {
      if (isRecording) {
        requestRecorder().then(setRecorder, console.error);
      }
      return;
    }

    // Manage recorder state.
    if (isRecording) {
      recorder.start();
    } else {
      recorder.stop();
    }

    // Obtain the audio when ready.
    const handleData = (e) => {
      setAsmrData(e.data);
      setAudioURL(URL.createObjectURL(e.data));
    };

    recorder.addEventListener("dataavailable", handleData);
    return () => {
      recorder.removeEventListener("dataavailable", handleData);
    };
  }, [recorder, isRecording]);

  useEffect(() => {
    checkTime = setInterval(() => {
      if (!isRecording) {
        setTime(0);
        clearInterval(checkTime);
      } else {
        setTime((time) => time + 1);
      }
    }, 1000);
    return () => {
      setTime(0);
      clearInterval(checkTime);
    };
  }, [isRecording]);

  const startRecording = () => {
    setIsRecording(true);
  };

  const stopRecording = () => {
    setIsRecording(false);
    // if (checkTime) {
    //   console.log(checkTime);
    //   clearInterval(checkTime);
    // }
    setTime(0);
  };

  return {
    audioURL,
    isRecording,
    startRecording,
    stopRecording,
    time,
    asmrData,
  };
};

async function requestRecorder() {
  const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
  return new MediaRecorder(stream);
}
