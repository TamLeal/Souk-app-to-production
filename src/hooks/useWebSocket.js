import { useState, useEffect } from 'react';

export const useWebSocket = (url) => {
  const [socket, setSocket] = useState(null);

  useEffect(() => {
    // Escolha automaticamente o protocolo correto
    const protocol = window.location.protocol === 'https:' ? 'wss://' : 'ws://';
    const webSocketUrl = url.replace(/^ws(s)?:\/\//, protocol);

    const ws = new WebSocket(webSocketUrl);

    ws.onopen = () => {
      console.log('WebSocket Connected');
      setSocket(ws);
    };

    ws.onclose = (event) => {
      console.log('WebSocket Disconnected', event);
      setSocket(null);

      // Tentar reconectar após 3 segundos se a desconexão não foi intencional
      if (!event.wasClean) {
        console.log('Tentando reconectar em 3 segundos...');
        setTimeout(() => {
          const wsReconnect = new WebSocket(webSocketUrl);
          wsReconnect.onopen = () => {
            console.log('WebSocket Reconectado');
            setSocket(wsReconnect);
          };
        }, 3000);
      }
    };

    ws.onerror = (error) => {
      console.error('WebSocket Error:', error);
    };

    return () => {
      ws.close();
    };
  }, [url]);

  const sendMessage = (message) => {
    if (socket && socket.readyState === WebSocket.OPEN) {
      socket.send(JSON.stringify(message));
    } else {
      console.warn('WebSocket não está conectado ou não está pronto para enviar mensagens.');
    }
  };

  return { socket, sendMessage };
};
