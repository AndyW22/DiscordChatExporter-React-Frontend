import { LazyLoadImage } from 'react-lazy-load-image-component';
import './DisplayMessage.css';
import { Message } from './types';

interface Props {
  message: Message;
  index: number;
}

const DisplayMessage = ({ index, message }: Props) => {
  return (
    <div className='container'>
      <div className='top-container'>
        <img
          className='image'
          src={message.author.avatarUrl}
          alt='profile'
          width={40}
          height={40}
        />
        <div className='name'>{message.author.name}</div>
        <div className='name'>ID: {message.id}</div>
        <div className='name'>Index: {index}</div>
        <div className='name'>Date: {new Date(message.timestamp).toLocaleString()}</div>
      </div>
      <div className='content'>{message.content}</div>
      {message.embeds.map((embed) => (
        <LazyLoadImage
          className='image'
          src={embed.url}
          alt='embed'
          width={100}
          height={100}
        />
      ))}
      {message.attachments.map((attachment) => (
        <LazyLoadImage
          src={attachment.url}
          alt='embed'
          width={400}
          height={400}
          effect='blur'
        />
      ))}
    </div>
  );
};

export default DisplayMessage;
