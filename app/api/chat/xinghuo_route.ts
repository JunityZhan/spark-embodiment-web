import { createWebSocketStream  } from './xunfei';
import {StreamingTextResponse} from 'ai';
import crypto from 'crypto';
import {stringify} from 'querystring';


const APP_ID = 'b7c617e2';
const API_SECRET = 'YTMxOTM2YzI4NDQ3NzhmYmI4YWY2ZDA5';
const API_KEY = 'b989ed3bead6d4b9f1122a5bd0aae5a2';

export const runtime = 'edge';


async function getWebsocketUrl(): Promise<string> {
    const url = 'wss://spark-api.xf-yun.com/v1.1/chat';
    const host = 'spark-api.xf-yun.com';
    const date = new Date().toUTCString();
    const algorithm = 'hmac-sha256';
    const headers = 'host date request-line';
    const signatureOrigin = `host: ${host}\ndate: ${date}\nGET /v1.1/chat HTTP/1.1`;

    const hmac = crypto.createHmac('sha256', API_SECRET);
    const signatureSha = hmac.update(signatureOrigin).digest();
    const signature = signatureSha.toString('base64');

    const authorizationOrigin = `api_key="${API_KEY}", algorithm="${algorithm}", headers="${headers}", signature="${signature}"`;
    const authorization = Buffer.from(authorizationOrigin).toString('base64');

    const params = {
        authorization: authorization,
        date: date,
        host: host
    };
    return `${url}?${stringify(params)}`;
}

export async function POST(req: Request) {
    const { conversation } = await req.json();

    // Prepare the request payload according to the provided interface request rules
    const payload = {
        header: {
            app_id: "b7c617e2",  // Replace with your app_id
            uid: "fadfadsfadsqw"  // Replace with your uid or dynamically generate it
        },
        parameter: {
            chat: {
                domain: "general",
                temperature: 0.5,
                max_tokens: 1024,
            }
        },
        payload: {
            message: {
                text: conversation  // Assuming conversation is an array of message objects
            }
        }
    };
    const url = await getWebsocketUrl();  // Assuming you have a function to generate the WebSocket URL

    // Create a stream from the WebSocket connection
    const stream = createWebSocketStream(url, payload);

    // Respond with the stream
    return new StreamingTextResponse(stream);
}