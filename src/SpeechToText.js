import React, { useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";

const SpeechToTextUI = () => {
  const [isListening, setIsListening] = useState(false);
  const { transcript, interimTranscript, resetTranscript, browserSupportsSpeechRecognition } =
    useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <p className="text-danger">Browser does not support speech recognition.</p>;
  }

  const startListening = () => {
    setIsListening(true);
    SpeechRecognition.startListening({ continuous: true, interimResults: true, language: "gu-IN" });
  };

  const stopListening = () => {
    setIsListening(false);
    SpeechRecognition.stopListening();
  };

  return (
    <div className="container pt-5 bg-dark text-light">
      <audio type="file" id="audio-input" src="http://localhost:7000/"></audio>

      <h2 className="mt-4">Transcript</h2>
      <div className="p-3" style={{ border: "1px solid gray", borderRadius: "8px" }}>
        <span id="final" className="text-light">
          {transcript}
        </span>
        <span id="interim" className="text-secondary">
          {interimTranscript}
        </span>
      </div>
      <div className="mt-4">
        <button className="btn btn-success" id="start" onClick={startListening}>
          Start
        </button>
        <button className="btn btn-danger ms-3" id="stop" onClick={stopListening}>
          Stop
        </button>
        <button className="btn btn-warning ms-3" onClick={resetTranscript}>
          Reset
        </button>
        {isListening && <p id="status" className="lead mt-3">Listening...</p>}
      </div>
    </div>
  );
};

export default SpeechToTextUI;
