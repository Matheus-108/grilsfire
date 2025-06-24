import ChatScreen from '@/components/chat-screen';
import { getChatScreenProps } from '@/app/actions';

export default async function ChatPage() {
  const { letyciaPhotoDataUri, samplePhotoDataUri } = await getChatScreenProps();
  const profilePhotoUrl = 'https://placehold.co/128x128.png';

  return (
    <ChatScreen
      letyciaPhotoDataUri={letyciaPhotoDataUri}
      samplePhotoDataUri={samplePhotoDataUri}
      profilePhotoUrl={profilePhotoUrl}
    />
  );
}
