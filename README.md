
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Tannu Voice Room</title>

  <style>
    * {
      box-sizing: border-box;
      margin: 0;
      padding: 0;
      font-family: Arial, sans-serif;
    }

    body {
      min-height: 100vh;
      background: linear-gradient(145deg, #120b24, #291052, #081525);
      color: white;
    }

    .room {
      max-width: 430px;
      min-height: 100vh;
      margin: auto;
      padding: 18px;
    }

    .top {
      display: flex;
      align-items: center;
      justify-content: space-between;
      margin-bottom: 20px;
    }

    .back {
      border: 0;
      background: rgba(255,255,255,0.1);
      color: white;
      width: 42px;
      height: 42px;
      border-radius: 50%;
      font-size: 22px;
    }

    .title {
      text-align: center;
    }

    .title h1 {
      font-size: 20px;
    }

    .live {
      color: #65ffb0;
      font-size: 12px;
    }

    .room-box {
      background: rgba(255,255,255,0.08);
      border-radius: 24px;
      padding: 25px 15px;
      text-align: center;
    }

    .host {
      font-size: 12px;
      color: #ff9bd2;
      margin-bottom: 12px;
    }

    .avatar {
      width: 75px;
      height: 75px;
      margin: auto;
      border-radius: 50%;
      background: linear-gradient(135deg, #ff4da6, #8b5cf6);
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 32px;
      font-weight: bold;
    }

    .room-box h2 {
      margin-top: 12px;
    }

    .room-box p {
      color: #c7bfd4;
      margin-top: 6px;
      font-size: 14px;
    }

    .people {
      display: flex;
      justify-content: center;
      gap: 14px;
      margin-top: 25px;
      flex-wrap: wrap;
    }

    .person {
      font-size: 11px;
      color: #cfc8d8;
    }

    .mini {
      width: 50px;
      height: 50px;
      border-radius: 50%;
      background: #45305f;
      display: flex;
      align-items: center;
      justify-content: center;
      margin-bottom: 5px;
      font-size: 20px;
    }

    .controls {
      display: flex;
      justify-content: center;
      gap: 15px;
      margin-top: 35px;
    }

    .control {
      width: 65px;
      height: 65px;
      border: 0;
      border-radius: 50%;
      background: rgba(255,255,255,0.12);
      color: white;
      font-size: 25px;
    }

    .control span {
      display: block;
      font-size: 10px;
      margin-top: 3px;
    }

    .leave {
      background: #e83d5b;
    }

    .off {
      background: #555;
    }
  </style>
</head>

<body>

  <div class="room">

    <div class="top">
      <button class="back" onclick="goHome()">←</button>

      <div class="title">
        <h1>Tannu Friends</h1>
      </div>

      <div class="live">● LIVE</div>
    </div>

    <div class="room-box">

      <div class="host">ROOM HOST</div>

      <div class="avatar">T</div>

      <h2>Tannu Friends 🎙️</h2>

      <p>Welcome to Tannu Voice Chat ❤️</p>

      <div class="people">

        <div class="person">
          <div class="mini">A</div>
          Ali
        </div>

        <div class="person">
          <div class="mini">S</div>
          Sameer
        </div>

        <div class="person">
          <div class="mini">R</div>
          Rahul
        </div>

        <div class="person">
          <div class="mini">N</div>
          Neha
        </div>

      </div>

    </div>

    <div class="controls">

      <button id="mic" class="control" onclick="toggleMic()">
        🎙️
        <span id="micText">Mute</span>
      </button>

      <button class="control" onclick="speaker()">
        🔊
        <span>Speaker</span>
      </button>

      <button class="control leave" onclick="leaveRoom()">
        📞
        <span>Leave</span>
      </button>

    </div>

  </div>

  <script>

    let muted = false;

    function toggleMic() {
      muted = !muted;

      const mic = document.getElementById("mic");
      const text = document.getElementById("micText");

      if (muted) {
        mic.classList.add("off");
        text.innerText = "Unmute";
      } else {
        mic.classList.remove("off");
        text.innerText = "Mute";
      }
    }

    function speaker() {
      alert("Speaker button pressed 🔊");
    }

    function leaveRoom() {
      window.location.href = "index.html";
    }

    function goHome() {
      window.location.href = "index.html";
    }

  </script>

</body>
</html>
