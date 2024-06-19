export class AxiosResponse {
    status: number;
    statusText: string;
    headers: { [key: string]: string };
    config: {
        transitional: {
            silentJSONParsing: boolean;
            forcedJSONParsing: boolean;
            clarifyTimeoutError: boolean;
        };
        adapter: string[];
        transformRequest: Function[];
        transformResponse: Function[];
        timeout: number;
        xsrfCookieName: string;
        xsrfHeaderName: string;
        maxContentLength: number;
        maxBodyLength: number;
        env: {
            FormData: Function;
            Blob: any;
        };
        validateStatus: Function;
        headers: { [key: string]: string };
        method: string;
        url: string;
        data: string;
    };
    request: {
        _events: { [key: string]: Function };
        _eventsCount: number;
        _maxListeners: number | undefined;
        outputData: any[];
        outputSize: number;
        writable: boolean;
        destroyed: boolean;
        _last: boolean;
        chunkedEncoding: boolean;
        shouldKeepAlive: boolean;
        maxRequestsOnConnectionReached: boolean;
        _defaultKeepAlive: boolean;
        useChunkedEncodingByDefault: boolean;
        sendDate: boolean;
        _removedConnection: boolean;
        _removedContLen: boolean;
        _removedTE: boolean;
        strictContentLength: boolean;
        _contentLength: string;
        _hasBody: boolean;
        _trailer: string;
        finished: boolean;
        _headerSent: boolean;
        _closed: boolean;
        socket: any;
        _header: string;
        _keepAliveTimeout: number;
        _onPendingData: Function;
        agent: any;
        socketPath: string | undefined;
        method: string;
        maxHeaderSize: number | undefined;
        insecureHTTPParser: boolean | undefined;
        joinDuplicateHeaders: boolean | undefined;
        path: string;
        _ended: boolean;
        res: any;
        aborted: boolean;
        timeoutCb: Function | null;
        upgradeOrConnect: boolean;
        parser: any | null;
        maxHeadersCount: number | null;
        reusedSocket: boolean;
        host: string;
        protocol: string;
        _redirectable: any;
    };
    data: Data;

    constructor(responseObject: any) {
        this.status = responseObject.status;
        this.statusText = responseObject.statusText;
        this.headers = responseObject.headers;
        this.config = responseObject.config;
        this.request = responseObject.request;
        this.data = responseObject.data;
    }
}

export interface Data {
    model: string
    created_at: string
    response: string
    done: boolean
    done_reason: string
    context: number[]
    total_duration: number
    load_duration: number
    prompt_eval_count: number
    prompt_eval_duration: number
    eval_count: number
    eval_duration: number
  }