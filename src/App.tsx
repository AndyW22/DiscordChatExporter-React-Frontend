import { useEffect, useState } from 'react';
import ScrollTrigger from 'react-scroll-trigger';
import './App.css';
import DisplayMessage from './DisplayMessage';
import exportedMessages from './exportedMessages.json';
import { Message } from './types';

function App() {
  const messages = exportedMessages as Message[];
  const [searchInput, setSearchInput] = useState('');
  const [idInput, setIdInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [discordMessages, setDiscordMessages] = useState<Message[]>(messages);
  const [displayMessages, setDisplayMessages] = useState<Message[]>([]);

  // text search
  useEffect(() => {
    if (!searchInput) {
      setDiscordMessages(messages);
    }
    setDiscordMessages(
      messages.filter((message) => message.content.includes(searchInput))
    );
  }, [searchInput, messages]);

  // id search
  useEffect(() => {
    if (!idInput) {
      setDiscordMessages(messages);
    }
    setDiscordMessages(
      messages.filter((message) => message.id.includes(idInput))
    );
  }, [idInput, messages]);

  useEffect(() => {
    setDisplayMessages(discordMessages.slice(0, 50));
  }, [discordMessages]);

  return (
    <div className='app'>
      <div className='heading'>Discord Message Renderer</div>
      <div className='secondary-heading'>
        Total messages: <span className='bold'>{messages.length}</span>
      </div>
      <div className='secondary-heading'>
        Total Displayed Messages:{' '}
        <span className='bold'>{displayMessages.length}</span>
      </div>
      <div className='secondary-heading'>
        Earliest Date:
        <span className='bold'>{displayMessages?.[0]?.timestamp}</span>
      </div>
      <div className='secondary-heading'>
        Latest Date:
        <span className='bold'>
          {displayMessages[displayMessages.length - 1]?.timestamp}
        </span>
      </div>
      <div className='search-container'>
        <div>Search By Text:</div>
        <input
          onChange={(e) => setSearchInput(e.target.value)}
          value={searchInput}
        />
      </div>
      <div className='search-container'>
        Search By Id:
        <input onChange={(e) => setIdInput(e.target.value)} value={idInput} />
      </div>
      <div className='list-container'>
        {displayMessages.map((message, i) => (
          <DisplayMessage message={message} index={i} key={message.id} />
        ))}
      </div>
      <ScrollTrigger
        throttleScroll={0}
        throttleResize={0}
        onEnter={() => {
          setLoading(true);
          // get last message index
          const lastId = displayMessages.pop()?.id;
          const currentIndex = messages.findIndex((item) => item.id === lastId);
          if (currentIndex < 0) {
            setLoading(false);
            return;
          }
          setDisplayMessages((displayMessages) => [
            ...displayMessages,
            ...discordMessages.slice(currentIndex, currentIndex + 51),
          ]);
          setLoading(false);
        }}
      />
      <div>{loading && <>Loading...</>}</div>
    </div>
  );
}

export default App;
