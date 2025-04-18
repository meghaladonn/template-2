import { Message as AIMessage } from 'ai';
import ReactMarkdown from 'react-markdown';

interface MessageProps {
  message: AIMessage;
}

export function Message({ message }: MessageProps) {
  return (
    <div className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
      <div
        className={`max-w-[80%] rounded-lg p-4 ${
          message.role === 'user'
            ? 'bg-blue-500 text-white'
            : 'bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-100'
        }`}
      >
        <ReactMarkdown className="prose dark:prose-invert">
          {message.content}
        </ReactMarkdown>
      </div>
    </div>
  );
} 