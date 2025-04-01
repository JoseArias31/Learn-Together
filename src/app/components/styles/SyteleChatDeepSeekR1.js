export const chatDeepSeekChat = () => {
    
  
 const styles = `
    @keyframes gradientBg {
      0% { background-position: 0% 50% }
      50% { background-position: 100% 50% }
      100% { background-position: 0% 50% }
    }
    
    @keyframes pulse {
      0%, 100% { opacity: 0.6; }
      50% { opacity: 1; }
    }
    
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(10px); }
      to { opacity: 1; transform: translateY(0); }
    }
    
    .chat-container {
      animation: fadeIn 0.5s ease-out;
    }
    
    .chat-input:focus {
      box-shadow: 0 0 0 2px rgba(74, 222, 128, 0.2);
      border-color: rgba(74, 222, 128, 0.5);
    }
    
    .chat-button:hover {
      box-shadow: 0 0 15px rgba(74, 222, 128, 0.5);
      transform: translateY(-1px);
    }
    
    .chat-button:active {
      transform: translateY(1px);
    }
    
    .chat-response {
      animation: fadeIn 0.3s ease-out;
    }
    
    .chat-response a {
      color: #4ade80;
      text-decoration: underline;
      text-underline-offset: 2px;
    }
    
    .chat-response pre {
      background: rgba(0, 0, 0, 0.3);
      border: 1px solid rgba(74, 222, 128, 0.2);
      border-radius: 0.375rem;
      padding: 1rem;
      overflow-x: auto;
    }
    
    .chat-response code {
      background: rgba(0, 0, 0, 0.2);
      padding: 0.2em 0.4em;
      border-radius: 0.25rem;
      font-size: 0.875em;
    }
    
    .chat-response blockquote {
      border-left: 3px solid #4ade80;
      padding-left: 1rem;
      color: rgba(255, 255, 255, 0.8);
    }
    
    .chat-response h1, .chat-response h2, .chat-response h3, 
    .chat-response h4, .chat-response h5, .chat-response h6 {
      color: white;
      margin-top: 1.5em;
      margin-bottom: 0.5em;
    }
    
    .chat-response ul, .chat-response ol {
      padding-left: 1.5rem;
    }
    
    .chat-response li {
      margin-bottom: 0.25rem;
    }
    
    .chat-response table {
      border-collapse: collapse;
      width: 100%;
      margin: 1rem 0;
    }
    
    .chat-response th, .chat-response td {
      border: 1px solid rgba(74, 222, 128, 0.2);
      padding: 0.5rem;
    }
    
    .chat-response th {
      background: rgba(0, 0, 0, 0.2);
    }
    
    .chat-response img {
      max-width: 100%;
      border-radius: 0.375rem;
    }
    
    .pulse-dot {
      animation: pulse 1.5s infinite;
    }
  `
}