import { useEffect, useState } from 'react';
import ScrollTrigger from 'react-scroll-trigger';
import './App.css';
import DisplayMessage from './DisplayMessage';
import exportedMessages from './exportedMessages.json';
import { Message } from './types';

function App() {
  const messages = exportedMessages as Message[];
  const possibleScrollTriggerMessages = messages.filter(
    (item, i) => i % 50 === 0
  );
  const [searchInput, setSearchInput] = useState('');
  const [idInput, setIdInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [discordMessages, setDiscordMessages] = useState<Message[]>(messages);
  const [displayMessages, setDisplayMessages] = useState<Message[]>([]);
  useEffect(() => {
    if (!searchInput) {
      setDiscordMessages(messages);
    }
    setDiscordMessages((discordMessages) =>
      discordMessages.filter((message) => message.content.includes(searchInput))
    );
  }, [searchInput, messages]);

  useEffect(() => {
    if (!idInput) {
      setDiscordMessages(messages);
    }
    setDiscordMessages((discordMessages) =>
      discordMessages.filter((message) => message.id.includes(idInput))
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
        Earliest Date: <span className='bold'>{messages[0].timestamp}</span>
      </div>
      <div className='secondary-heading'>
        Latest Date: <span className='bold'>{messages.pop()?.timestamp}</span>
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
          <DisplayMessage message={message} index={i} />
        ))}
      </div>
      <ScrollTrigger
        onEnter={() => {
          setLoading(true);
          // get last message index
          const lastId = displayMessages.pop()?.id;
          const currentIndex = discordMessages.findIndex(
            (item) => item.id === lastId
          );
          setDisplayMessages((displayMessages) => [
            ...displayMessages,
            ...discordMessages.slice(currentIndex, currentIndex + 50),
          ]);
          setLoading(false);
        }}
      />
      <div>{loading && <>Loading...</>}</div>
    </div>
  );
}

export default App;
