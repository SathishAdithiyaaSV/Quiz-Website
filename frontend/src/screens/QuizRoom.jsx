import React, { useState, useEffect } from 'react';
import Question from './Question';
import Leaderboard from './Leaderboard';
import Rules from './Rules';
import HostQn from './HostQn';
import Notification from '../components/Notification';
import { Howl } from 'howler';

const QuizRoom = ({ socket, roomId, teamName, isHost, inGame, setInGame }) => {
  const [activeComponent, setActiveComponent] = useState('Quiz');
  const [type, setType] = useState('');
  const [question, setQuestion] = useState('');
  const [options, setOptions] = useState([]);
  const [points, setPoints] = useState(0);
  const [time, setTime] = useState(0);
  const [mainTime, setMainTime] = useState(0);
  const [buzzer, setBuzzer] = useState(true);
  const [buzzerActive, setBuzzerActive] = useState(true);
  const [notification, setNotification] = useState('');
  const [answeredCorrectly, setAnsweredCorrectly] = useState(false);
  const [answered, setAnswered] = useState(false);
  const [round, setRound] = useState(-1);
  const [qnNo, setQnNo] = useState(0);
  const [qnActive, setQnActive] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [timeLeft, setTimeLeft] = useState(getInitialTimeLeft);
  const [isPaused, setIsPaused] = useState(false);
  const [correctAnswer, setCorrectAnswer] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [buzzNo, setBuzzNo] = useState(0);

  const sound = new Howl({
    src: ['/home/sathish/Documents/Quiz-Website/frontend/src/assets/buzzer-sound.mp3']
  });

  const playSound = () => {
    sound.play();
  };

  function getInitialTimeLeft() {
    const storedStartTime = localStorage.getItem('startTime');
    if (storedStartTime) {
      const elapsedTime = Math.floor((Date.now() - parseInt(storedStartTime)) / 1000);
      return Math.max(time - elapsedTime, 0);
    }
    return time;
  }

  useEffect(() => {
    const handleQuestion = (qn) => {
      localStorage.setItem('startTime', Date.now().toString());
      const parsedQn = JSON.parse(qn);
      setCorrectAnswer('');
      setAnswered(false);
      setAnsweredCorrectly(false);
      setShowConfetti(false);
      setType(parsedQn.type);
      setQuestion(parsedQn.text);
      setOptions(parsedQn.options);
      setPoints(parsedQn.points);
      setIsPaused(false);
      setTime(parsedQn.time);
      setBuzzer(parsedQn.buzzer);
      setRound(parsedQn.round);
      setQnNo(parsedQn.qnNo);
      setBuzzerActive(true);
      if (parsedQn.buzzer)
        setQnActive(false);
      else
        setQnActive(true);
      setActiveComponent(isHost ? 'HostQn' : 'Question');
    };

    const handleBuzzedIn = (details) => {
      const parsedDetails = JSON.parse(details);
      setBuzzerActive(false);
      setQnActive(false);
      setIsPaused(true);
      setBuzzNo(parsedDetails.buzzNo);
      setNotification(`Buzzed in by ${parsedDetails.teamName}`);
    };

    const handleBuzzedInTeam = (details) => {
      localStorage.setItem('startTime', Date.now().toString());
      const parsedDetails = JSON.parse(details);
      console.log(timeLeft);
      setBuzzerActive(false);
      setQnActive(true);
      setPoints(parsedDetails.points);
      setIsPaused(false); 
      setTime(parsedDetails.time);

    };

    const handleAnswered = (details) => {
      const parsedDetails = JSON.parse(details);
      if (parsedDetails.answeredCorrectly) {
        if (parsedDetails.team === teamName) {
          setAnswered(true);
          setShowConfetti(true);
        }
        setCorrectAnswer(parsedDetails.correctAnswer);
        setAnsweredCorrectly(true);
        setIsPaused(true);
        setNotification(`${parsedDetails.teamName} answered correctly!`);
      } else {
        if (parsedDetails.team === teamName) setAnswered(true);
        setIsPaused(false);
        setTime(parsedDetails.mainTime);
        localStorage.setItem('startTime', Date.now().toString());
        setAnsweredCorrectly(false);
        setBuzzerActive(true);
        if(buzzer)
          setQnActive(false);
        if(parsedDetails.buzzesLimitExceeded)
        {
          setBuzzerActive(false);
          setIsPaused(true);
          setCorrectAnswer(parsedDetails.correctAnswer);
          setNotification(`${parsedDetails.teamName}'s timeout exceeded`);
        }
        else
          setNotification(`${parsedDetails.teamName} answered incorrectly!`);
      }
    };

    socket.on('question', handleQuestion);
    socket.on('buzzedIn', handleBuzzedIn);
    socket.on('buzzedInTeam', handleBuzzedInTeam);
    socket.on('answered', handleAnswered);
    socket.on('leaderboard', (data) => {
      const parsedData = JSON.parse(data);
      setLeaderboard(parsedData);
    });

    return () => {
      socket.off('question', handleQuestion);
      socket.off('buzzedIn', handleBuzzedIn);
      socket.off('buzzedInTeam', handleBuzzedInTeam);
      socket.off('answered', handleAnswered);
      socket.off('leaderboard', (data) => {
        const parsedData = JSON.parse(data);
        setLeaderboard(parsedData);
      });
    };
  }, [socket]);

  const renderComponent = () => {
    switch (activeComponent) {
      case 'Question':
        return (
          <Question
            socket={socket}
            question={question}
            questionType={type}
            points={points}
            time={time}
            isPaused={isPaused}
            buzzer={buzzer}
            buzzerActive={buzzerActive}
            qnActive={qnActive}
            options={options}
            notification={notification}
            teamName={teamName}
            roomId={roomId}
            round={round}
            qnNo={qnNo}
            answeredCorrectly={answeredCorrectly}
            answered={answered}
            handleBuzzer={handleBuzzer}
            setMainTime={setMainTime}
            showConfetti={showConfetti}
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
            correctAnswer={correctAnswer}
            buzzNo={buzzNo}
          />
        );
      case 'HostQn':
        return (
          <HostQn
          socket={socket}
            question={question}
            questionType={type}
            points={points}
            time={time}
            isPaused={isPaused}
            setMainTime={setMainTime}
            buzzer={buzzer}
            options={options}
            handleShowNextQn={handleShowNextQn}
            notification={notification}
            roomId={roomId}
            timeLeft={timeLeft}
            setTimeLeft={setTimeLeft}
          />
        );
      case 'Leaderboard':
        return <Leaderboard leaderboard={leaderboard} />
      case 'Rules':
        return <Rules />;
      default:
        return <Question />;
    }
  };

  const handleShowNextQn = () => {
    socket.emit('showNextQuestion', JSON.stringify({ roomId, round, qnNo : qnNo +1 }));
    setQnNo(qnNo + 1);
  };

  const handleStartNextRound = () => {
    socket.emit('showNextQuestion', JSON.stringify({ roomId, round: round+1, qnNo: 0 }));
    setRound(round + 1);
    setQnNo(0);
  };

  const handleBuzzer = () => {
    if(timeLeft !== 0)
      socket.emit('buzzIn', JSON.stringify({ roomId, teamName, qnNo, round, mainTime: timeLeft }));
    console.log(timeLeft);
    playSound();
  };

  return (
    <div className="min-h-screen min-w-screen bg-gray-900 text-white flex flex-col lg:flex-row">
      <div className="bg-gray-800 sg:w-full lg:w-1/8 flex lg:flex-col">
        {!isHost && (
          <button
            className="w-full p-4 border-b border-gray-700 hover:bg-gray-700"
            onClick={() => setActiveComponent('Question')}
          >
            Question
          </button>
        )}
        {isHost && (
          <button
            className="w-full p-4 border-b border-gray-700 hover:bg-gray-700"
            onClick={() => setActiveComponent('HostQn')}
          >
            Question
          </button>
        )}
        <button
          className="w-full p-4 border-b border-gray-700 hover:bg-gray-700"
          onClick={() => setActiveComponent('Leaderboard')}
        >
          Leaderboard
        </button>
        <button
          className="w-full p-4 border-b border-gray-700 hover:bg-gray-700"
          onClick={() => setActiveComponent('Rules')}
        >
          Rules
        </button>
        {isHost && (
          <button
            className="w-full p-4 border-b border-gray-700 hover:bg-gray-700"
            onClick={handleStartNextRound}
          >
            Start Next Round
          </button>
        )}
        <button
          className="w-full p-4 border-b border-gray-700 hover:bg-red-500 bg-red-600 text-white"
          onClick={() => {socket.emit('leaveRoom', JSON.stringify({ roomId, teamName })); setInGame(false)}}>
          Leave Room
        </button>
        {notification && (
        <Notification message={notification} />)}
      </div>
      <div className="flex-1 p-4">{renderComponent()}</div>
    </div> 
  );
};

export default QuizRoom;
