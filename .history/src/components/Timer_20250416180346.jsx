import React, { useState, useEffect, useRef } from "react";

function Timer() {
  // State to hold the remaining time (in seconds)
  const [time, setTime] = useState(0);
  // State to store the input value from the user
  const [inputValue, setInputValue] = useState("");
  // State to indicate if the timer is running
  const [isRunning, setIsRunning] = useState(false);

  // Ref to store the timer id from setTimeout so it can be cleared if needed
  const timerRef = useRef(null);
  // Ref to store the audio element so we can trigger playback
  const audioRef = useRef(null);

  // useEffect to handle the countdown
  useEffect(() => {
    // If the timer is running and time is not zero, schedule a timeout to decrease time by one second.
    if (isRunning && time > 0) {
      timerRef.current = setTimeout(() => {
        setTime(time - 1);
      }, 1000);
    }
    // When the time reaches zero while the timer is running, play the sound and stop the timer.
    else if (isRunning && time === 0) {
      // Play the sound if the audio element is ready
      if (audioRef.current) {
        audioRef.current.play();
      }
      setIsRunning(false);
    }
    // Cleanup function to clear the timeout if the component re-renders or unmounts.
    return () => clearTimeout(timerRef.current);
  }, [isRunning, time]);

  // Function to start the timer based on the user input
  const startTimer = () => {
    // Convert the input value to an integer (assuming the input is in seconds)
    const seconds = parseInt(inputValue, 10);
    if (!isNaN(seconds) && seconds > 0) {
      setTime(seconds);
      setIsRunning(true);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "30px" }}>
      <input
        type="number"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Enter seconds"
        style={{ fontSize: "16px", padding: "4px", width: "150px" }}
      />
      <button
        onClick={startTimer}
        style={{ marginLeft: "10px", fontSize: "16px" }}
      >
        Start Timer
      </button>
      <h2 style={{ marginTop: "20px" }}>{time} sec</h2>
      {/* Audio element plays sound when time is up. Ensure sound.mp3 is available in your public folder or change the src to a valid URL */}
      <audio ref={audioRef}>
        <source src="/alarm.mp3" type="audio/mpeg" />
        Your browser does not support the audio element.
      </audio>
    </div>
  );
}

export default Timer;
