const io = require('socket.io-client');
const options = {
  rejectUnauthorized: false,
  reconnect: false,
  forceNew: true,
  transports: ['websocket']
}


const CONSTANTS = {
  SEND: {
    AUTHORIZE: 'api-authorize',
    INIT: 'game-init',
    EVENT: 'game-event',
    GAME_UPDATE_DIAGRAM_ELEMENTS: 'game-update-diagram-elements'
  },
  RECEIVE: {
    ERROR: 'api-error',
    AUTH_DENY: 'api-auth-deny',
    AUTH_SUCCESS: 'api-auth-success',
    INIT: 'game-init',
    EVENT: 'diagram-elements-updated',
  },
}

// machinations.io
const convert=(param)=>{
  if (param.mutable){
    return({
    "id": param.nodeID,
    "value": param.value,
    "timeStamp":12384732487,
    "parameter":"number",
    "type": param.type
    })
  }
}
    const gameData = {
      diagramToken: diagramToken,
    };
    setTimeout(() => { socket.emit(CONSTANTS.SEND.INIT, gameData) }, 3000);
    update()

const prepare=(input)=>{
  const connectionURL = 'api.machinations.io';
  const token = input.userKey
  const diagramToken = input.diagramToken
  const params = input.params
  const machinationsIDs = params.map(convert)
  const serverAdd = `wss://${connectionURL}?userkey=${token}`;
  console.log(serverAdd);
  console.log(machinationsIDs);
  const socket = io(serverAdd, options);
  const authorize = { diagramToken: diagramToken, gameName: input.gameName };
  const update =()=>{
      const gameData = {
        diagramToken: diagramToken,
        machinationsIDs:machinationsIDs
      };
      setTimeout(() => { socket.emit(CONSTANTS.SEND.GAME_UPDATE_DIAGRAM_ELEMENTS, gameData) }, 3000);
  }
  socket.on("connect", () => {
    console.log(' CONNECT ');
    socket.emit(CONSTANTS.SEND.AUTHORIZE, authorize);
    console.log(socket.id, authorize)
  });
  socket.on(CONSTANTS.RECEIVE.AUTH_SUCCESS, (msg) => {
    console.log(CONSTANTS.RECEIVE.AUTH_SUCCESS, msg);
      const gameData = {
        diagramToken: diagramToken,
        machinationsIDs:machinationsIDs
      };
      setTimeout(() => { socket.emit(CONSTANTS.SEND.GAME_UPDATE_DIAGRAM_ELEMENTS,
        gameData) }, 3000);
  });

  socket.on(CONSTANTS.RECEIVE.AUTH_DENY, (msg) => {
    console.log(CONSTANTS.RECEIVE.AUTH_DENY, msg);
  });

  socket.on(CONSTANTS.RECEIVE.INIT, (msg) => {
    console.log(CONSTANTS.RECEIVE.INIT, msg);
  });
}

module.exports = {prepare}