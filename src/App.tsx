import './App.css';
import DisplayMessage from './DisplayMessage';
import exportedMessages from './exportedMessages.json';
import { Message } from './types';

function App() {
  const messages = exportedMessages as Message[];
  return (
    <div className='app'>
      <div className='heading'>Discord Message Renderer</div>
      <div className='secondary-heading'>
        Total messages: <span className='bold'>{messages.length}</span>
      </div>
      <div className='secondary-heading'>
        Earliest Date: <span className='bold'>{messages[0].timestamp}</span>
      </div>
      <div className='secondary-heading'>
        Latest Date: <span className='bold'>{messages.pop()?.timestamp}</span>
      </div>
      <div className='list-container'>
        {messages.map((message) => (
          <DisplayMessage message={message} />
        ))}
      </div>
    </div>
  );
}

export default App;
