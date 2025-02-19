// Initialize speech recognition
const speechRecognition = new (window.SpeechRecognition ||
    window.webkitSpeechRecognition)();
  speechRecognition.lang = "en-US";
  const listenButton = document.querySelector("#listen-btn");
  
  // Predefined list of allowed commands and URLs
  const allowedCommands = {
    "open youtube": "https://www.youtube.com",
    "open google": "https://www.google.com",
    "open facebook": "https://www.facebook.com",
    "open instagram": "https://www.instagram.com",
    "open whatsapp": "https://www.whatsapp.com"
  };
  
  // Function to convert text to speech
  function textToSpeech(message) {
    const speech = new SpeechSynthesisUtterance(message);
    window.speechSynthesis.speak(speech);
  }
  
  // Function to process recognized commands
  function processCommand(command) {
    const url = allowedCommands[command];
    if (url) {
      textToSpeech(`Opening ${command.split(" ")[1]}...`);
      window.open(url, "_blank");
    } else {
      // Perform a Google search if command not recognized
      textToSpeech("Searching Google for " + command);
      window.open(
        `https://www.google.com/search?q=${encodeURIComponent(command)}`,
        "_blank"
      );
    }
  }
  
  // Attach click event listener to the button
  listenButton.addEventListener("click", function () {
    // Greet the user and then start listening
    textToSpeech("Hello, how can I assist you?");
  
    // Delay to ensure greeting completes before starting recognition
    setTimeout(() => {
      listenButton.innerHTML = "Listening...👂";
      listenButton.classList.add("listening");
      speechRecognition.start();
    }, 2500);
  
    // When a result is received
    speechRecognition.onresult = (event) => {
      console.log(event);
      const command = event.results[0][0].transcript.toLowerCase();
      processCommand(command);
    };
  
    // When recognition ends
    speechRecognition.onend = () => {
      listenButton.innerHTML = "Start Listening";
      listenButton.classList.remove("listening");
    };
  
    // Error handling
    speechRecognition.onerror = (event) => {
      console.error("Speech recognition error detected: " + event.error);
      textToSpeech("Sorry, I didn't catch that. Please try again.");
      listenButton.innerHTML = "Start Listening";
      listenButton.classList.remove("listening");
    };
  });