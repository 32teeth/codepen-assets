const clients = new Map();

onconnect = (e) => {
  const port = e.ports[0];
  clients.set(port, { port: port, uuid: this.uuid, username: null});

  /*
  clients.forEach((_, client) => {
    if (client !== port) {
      client.postMessage({ text: 'new user connected', uuid: null });
    }
  });
  */

  port.start();


  port.onmessage = (e) => {
    const { data } = e;
    const { type } = data;
    if (type !== null) {
      switch (data.type) {
        case 'register':
          const {
            uuid,
            username
          } = data;
          clients.get(port).uuid = uuid;
          clients.forEach((_, client) => {
            if (client === port) {
              client.postMessage({
                toast: { type: 'success', message: `<strong>Welcome ${username}</strong><br/>You have been registerd as ${uuid}`, dismissable: true, delay: 10000},
                activity: { type: 'register', username: username, uuid: uuid}
              });
            } else {
              client.postMessage({
                toast: { type: 'info', message: `<strong>${username}</strong> has joined the chat`, dismissable: true, delay: 10000}
              });
            }
          });
          break;
        case 'unregister':
          clients.delete(port);
          break;
        default:
          clients.forEach((_, client) => {
            if (client === port) {
              client.postMessage({ text: `No type found: ${data.type}` });
            }
          });
          break;
      }
    }
  }
}