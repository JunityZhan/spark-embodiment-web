import { WebSocket } from 'ws';  // 使用 isomorphic-ws 以确保在 Node.js 和浏览器环境中都可以运行
import { type AIStreamParser, type AIStreamCallbacks } from 'ai';

function parseXunfeiStream(): AIStreamParser {
    let previous = '';

    return data => {
        const json = JSON.parse(data) as {
            header: {
                code: number;
                message: string;
                sid: string;
                status: number;
            },
            payload: {
                choices: {
                    status: number;
                    seq: number,
                    text: {
                        content: string;
                        role: string;
                        index: number;
                    }[];
                },
                usage: {
                    text: {
                        question_tokens: number;
                        prompt_tokens: number;
                        completion_tokens: number;
                        total_tokens: number;
                    }
                }
            }
        };

        const text = json.payload.choices.text.map(choice => choice.content).join('');
        const delta = text.slice(previous.length);
        previous = text;

        return delta;
    };
}

export function createWebSocketStream(
    url: string,
    payload: object,
    cb?: AIStreamCallbacks,
): ReadableStream {
    let controller: ReadableStreamDefaultController | null = null;

    const ws = new WebSocket(url);

    ws.on('open', () => {
        ws.send(JSON.stringify(payload));
    });

    ws.on('message', (data: string) => {
        const parsedData = parseXunfeiStream()(data);
        if (controller) {
            controller.enqueue(parsedData);
        }
    });

    ws.on('close', () => {
        if (controller) {
            controller.close();
        }
    });

    ws.on('error', (err: Error) => {
        console.error('WebSocket error:', err);
        if (controller) {
            controller.error(err);
        }
    });

    return new ReadableStream({
        start(c) {
            controller = c;
        },
        cancel() {
            ws.close();
        }
    });
}
