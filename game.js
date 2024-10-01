<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Falling Lyric Match Game</title>
    <style>
        body {
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
            height: 100vh;
            margin: 0;
            background-color: #fafafa;
            font-family: Arial, sans-serif;
        }
        #gameArea {
            position: relative;
            width: 90%;
            height: 500px;
            background-color: #f0f0f0;
            overflow: hidden;
            border: 2px solid #ccc;
        }
        #displayArea {
            margin-top: 20px;
            width: 90%;
            height: 50px;
            border: 2px solid #ccc;
            display: flex;
            align-items: center;
            justify-content: flex-start;
            padding: 0 10px;
            font-size: 18px;
            background-color: #e0e0e0;
        }
        .falling-word {
            position: absolute;
            width: 100px;
            height: 50px;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 18px;
            color: white;
            border-radius: 5px;
            background-color: red;
        }
        #timer {
            position: absolute;
            top: 10px;
            right: 10px;
            font-size: 24px;
        }
    </style>
</head>
<body>
    <h1>Match 3 Lyrics to Win</h1>
    <div id="gameArea"></div>
    <div id="displayArea"></div>
    <div id="timer">Remaining Time: 60 seconds</div>
    <div class="message" id="message"></div>

    <script>
        // 定义三个关卡的歌词
        const lyricsLevel1 = {
            '你是我的眼': ['你', '是', '我的', '眼'],
            '我应该在车底': ['我', '应该', '在', '车底'],
            '九妹九妹漂亮的妹妹': ['九妹', '九妹', '漂亮的', '妹妹']
        };

        const lyricsLevel2 = {
            '更怕你永远停留在这里': ['更', '怕', '你', '永远', '停留', '在', '这里'],
            '丑八怪千万别把灯打开': ['丑八怪', '千万', '别', '把', '灯', '打开'],
            '我爱你爱着你就像老鼠爱大米': ['我', '爱', '你', '爱着', '你', '就像', '老鼠', '爱', '大米']
        };

        const lyricsLevel3 = {
            '有没有那么一首歌': ['有没有', '那么', '一首', '歌'],
            '能不能再给我一首歌的时间': ['能不能', '再给', '我', '一首', '歌', '的', '时间'],
            '东京下雨淋湿巴黎收音机': ['东京', '下雨', '淋湿', '巴黎', '收音机']
        };

        const allLyrics = [lyricsLevel1, lyricsLevel2, lyricsLevel3];  // 全部关卡的歌词集
        const speedSettings = { 1: 1000, 2: 800, 3: 600 };  // 每关的掉落速度

        let currentLevel = 1;
        let currentLyricSet = allLyrics[0];
        let completedLyrics = 0;
        let currentTime = 60;
        let fallingInterval, timerInterval;

        function startTimer() {
            currentTime = 60;
            document.getElementById('timer').textContent = `Remaining Time: ${currentTime} seconds`;
            timerInterval = setInterval(() => {
                currentTime -= 1;
                document.getElementById('timer').textContent = `Remaining Time: ${currentTime} seconds`;

                if (currentTime <= 0) {
                    clearInterval(timerInterval);
                    clearInterval(fallingInterval);
                    alert('Time up! Game Over');
                    resetGame();
                }
            }, 1000);
        }

        function createWordElement(word) {
            const wordElement = document.createElement('div');
            wordElement.className = 'falling-word';
            wordElement.textContent = word;
            wordElement.style.left = `${Math.random() * 90}%`;
            wordElement.style.top = '0px';  // Start from the top of the screen

            gameArea.appendChild(wordElement);

            let interval = setInterval(() => {
                wordElement.style.top = `${parseInt(wordElement.style.top) + 2}px`;  // Move down
                if (parseInt(wordElement.style.top) > 450) {  // If it reaches the bottom, remove it
                    gameArea.removeChild(wordElement);
                    clearInterval(interval);
                }
            }, 30);
        }

        function dropRandomWords() {
            const lyricKeys = Object.keys(currentLyricSet);
            const randomLyric = lyricKeys[Math.floor(Math.random() * lyricKeys.length)];
            const randomWord = currentLyricSet[randomLyric][Math.floor(Math.random() * currentLyricSet[randomLyric].length)];
            createWordElement(randomWord);
        }

        function startGame(level) {
            currentLevel = level;
            currentLyricSet = allLyrics[level - 1];  // 设置当前关卡的歌词
            startTimer();  // 开始计时
            fallingInterval = setInterval(dropRandomWords, speedSettings[level]);  // 按速度掉落单词
        }

        function resetGame() {
            completedLyrics = 0;
            currentLyricSet = allLyrics[0];
            gameArea.innerHTML = '';  // 清空所有单词
            clearInterval(fallingInterval);
            startGame(1);  // 重新开始第一关
        }

        // 启动第一关
        const gameArea = document.getElementById('gameArea');
        startGame(1);

    </script>
</body>
</html>
