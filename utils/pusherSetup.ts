import {
  Pusher,
  PusherMember,
  PusherChannel,
  PusherEvent,
} from '@pusher/pusher-websocket-react-native';

export const initPusher = async () => {
  const pusher = Pusher.getInstance();

  await pusher.init({
    apiKey: "394898683a9d77dcfab9",
    cluster: "ap2"
  });

    
  await pusher.connect();
  await pusher.subscribe({
    channelName: "verify", 
    onEvent: (event: PusherEvent) => {
      console.log(`Event received: ${event.data}`);
    }
  });
}