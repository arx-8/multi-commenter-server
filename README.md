# multi-commenter-server

## Dev

```sh
npm i
npm start
```

## Usage

### Local execute

```sh
npm start
```

### Call API

```http
POST https://multi-commenter-server.unubo.app/
Content-Type: application/json

{
    "path": "/auth/create",
    "callback_url": "http://localhost"
}

OPTIONS https://multi-commenter-server.unubo.app/
Access-Control-Request-Method: POST
Access-Control-Request-Headers: content-type
Sec-Fetch-Mode: no-cors
```

## Settings

<https://developer.twitter.com/en/apps>
<https://unubo.app/apps/multi-commenter-server>

## Front-end

<https://github.com/arx-8/multi-commenter>

## Unubo serverless

This app is provided by Unubo serverless.

<https://github.com/unubo/node-serverless-on-unubo-cloud>

## References

<https://syncer.jp/Web/API/Twitter/REST_API/>
<http://westplain.sakuraweb.com/translate/twitter/Documentation/OAuth.cgi>
