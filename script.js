<script>
  const msg = new SpeechSynthesisUtterance();
  let voices = [];
  const voicesDropdown = document.querySelector('#voices');
  const rateInput = document.querySelector('[name="rate"]');
  const pitchInput = document.querySelector('[name="pitch"]');
  const textInput = document.querySelector('[name="text"]');
  const speakButton = document.querySelector('#speak');
  const stopButton = document.querySelector('#stop');

  function populateVoices() {
    voices = speechSynthesis.getVoices();
    voicesDropdown.innerHTML = voices
      .map((voice, index) => `<option value="${index}">${voice.name} (${voice.lang})</option>`)
      .join('');
  }

  function setVoice() {
    msg.voice = voices[voicesDropdown.value];
  }

  function toggleSpeech() {
    if (speechSynthesis.speaking) {
      speechSynthesis.cancel();
      return;
    }
    msg.text = textInput.value;
    speechSynthesis.speak(msg);
  }

  function setOption() {
    msg[this.name] = this.value;
    toggleSpeech();
  }

  speechSynthesis.addEventListener('voiceschanged', populateVoices);
  voicesDropdown.addEventListener('change', setVoice);
  rateInput.addEventListener('change', setOption);
  pitchInput.addEventListener('change', setOption);
  textInput.addEventListener('input', toggleSpeech);
  speakButton.addEventListener('click', toggleSpeech);
  stopButton.addEventListener('click', () => speechSynthesis.cancel());
</script>
