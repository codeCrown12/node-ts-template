import { api } from './axios';
import config from '../config';

export default async function useTermii(message: string, phoneNumber: string) {
  try {
    await api({
      method: 'post',
      url: `${config.termii.apiUrl}/api/sms/send`,
      data: {
        api_key: config.termii.apiKey,
        to: [phoneNumber],
        from: 'N-Alert',
        sms: message,
        type: 'plain',
        channel: 'dnd',
      },
      headers: {
        Accept: 'application/json, */*',
        'Content-Type': 'application/json',
      },
    });
  } catch (error) {
    console.log(error);
  }
}
