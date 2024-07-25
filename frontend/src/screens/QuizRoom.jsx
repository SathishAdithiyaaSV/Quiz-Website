import React, { useState, useEffect } from 'react';
import Question from './Question';
import Leaderboard from './Leaderboard';
import Rules from './Rules';
import HostQn from './HostQn';

const QuizRoom = ({ socket, roomId, teamName, isHost }) => {
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
  const [isBuzzerPressed, setIsBuzzerPressed] = useState(false);

  useEffect(() => {
    const handleQuestion = (qn) => {
      localStorage.setItem('startTime', Date.now().toString());
      const parsedQn = JSON.parse(qn);
      setType(parsedQn.type);
      setQuestion(parsedQn.text);
      setOptions(parsedQn.options);
      setPoints(parsedQn.points);
      setTime(parsedQn.time);
      setBuzzer(parsedQn.buzzer);
      setActiveComponent(isHost ? 'HostQn' : 'Question');
    };

    const handleBuzzedIn = (details) => {
      const parsedDetails = JSON.parse(details);
      setBuzzerActive(false);
      setNotification(`Buzzed in by ${parsedDetails.teamName}`);
    };

    const handleBuzzedInTeam = (details) => {
      localStorage.setItem('startTime', Date.now().toString());
      const parsedDetails = JSON.parse(details);
      setPoints(parsedDetails.points);
      setTime(parsedDetails.time);
    };

    const handleAnswered = (details) => {
      const parsedDetails = JSON.parse(details);
      if (parsedDetails.answeredCorrectly) {
        if (parsedDetails.team === teamName) setAnswered(true);
        setAnsweredCorrectly(true);
      } else {
        if (parsedDetails.team === teamName) setAnswered(true);
        setTime(mainTime);
        localStorage.setItem('startTime', Date.now().toString());
        setAnsweredCorrectly(false);
      }
    };

    socket.on('question', handleQuestion);
    socket.on('buzzedIn', handleBuzzedIn);
    socket.on('buzzedInTeam', handleBuzzedInTeam);
    socket.on('answered', handleAnswered);

    return () => {
      socket.off('question', handleQuestion);
      socket.off('buzzedIn', handleBuzzedIn);
      socket.off('buzzedInTeam', handleBuzzedInTeam);
      socket.off('answered', handleAnswered);
    };
  }, [socket, teamName, mainTime]);

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
            buzzer={buzzer}
            buzzerActive={buzzerActive}
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
            isBuzzerPressed={isBuzzerPressed}
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
            setMainTime={setMainTime}
            buzzer={buzzer}
            options={options}
            handleShowNextQn={handleShowNextQn}
            notification={notification}
            roomId={roomId}
          />
        );
      case 'Leaderboard':
        return <Leaderboard />;
      case 'Rules':
        return <Rules />;
      default:
        return <Question />;
    }
  };

  const handleShowNextQn = () => {
    socket.emit('showNextQuestion', JSON.stringify({ roomId, round, qnNo }));
    setQnNo(qnNo + 1);
  };

  const handleStartNextRound = () => {
    socket.emit('showNextQuestion', JSON.stringify({ roomId, round: round+1, qnNo: 0 }));
    setRound(round + 1);
    setQnNo(1);
  };

  const handleBuzzer = () => {
    setIsBuzzerPressed(true);
    socket.emit('buzzIn', JSON.stringify({ roomId: roomId, teamName: teamName, qnNo: qnNo, round: round }));
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
      </div>
      <div className="flex-1 p-4">{renderComponent()}</div>
    </div>
  );
};

export default QuizRoom;
