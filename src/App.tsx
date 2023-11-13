import { useEffect, useRef } from "react";
import data from "./wavepoints.json";

import "./App.css";

function App() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    if (canvasRef.current) {
      drawWaveform(canvasRef.current);
    }
  }, []);

  return (
    <>
      <div style={{ width: "800px", border: "1px solid black" }}>
        <canvas
          ref={canvasRef}
          style={{ width: "100%", height: "80px" }}
        ></canvas>
      </div>
    </>
  );
}

function drawWaveform(canvas: HTMLCanvasElement) {
  const canvasContext = canvas.getContext("2d");

  if (!canvasContext) {
    return;
  }

  const asJson = data as number[];
  const keys = Object.keys(asJson);
  const bufferLength = keys.length;
  const dataArray = new Float32Array(keys.length);

  for (let i = 0; i < keys.length; i += 1) {
    dataArray[i] = asJson[i];
  }

  canvasContext.clearRect(0, 0, canvas.width, canvas.height);
  canvasContext.lineWidth = 1;
  // canvasContext.strokeStyle = 'rgb(220, 220, 224)';
  canvasContext.strokeStyle = "rgb(0,0,0)";
  canvasContext.beginPath();

  const sliceWidth = (Number(canvas.width) * 1) / bufferLength;
  let x = 0;

  for (let i = 0; i < bufferLength; i++) {
    const v = dataArray[i];
    const y = (v * canvas.height) / 2 + canvas.height / 2;

    if (i === 0) {
      canvasContext.moveTo(x, y);
    } else {
      canvasContext.lineTo(x, y);
    }

    x += sliceWidth;
  }

  canvasContext.lineTo(canvas.width, canvas.height / 2);
  canvasContext.stroke();
}

export default App;
