# Taurai Decentralised Chat

Taurai, which roughly translates to "now you can talk" in Shona language is a decentralised chat application based on Ionic Angular and GunJS.

## How to use

- Clone the repo
- run `npm install` inside the project repo
- run the project in two or more browser windows with different usernames

Alternatively, you can run the hosted version on: `taurai-dapp.vercel.app`

## Setup local relay (optional)

To ensure messages are distributed across all nodes I have set up a relay at `http://dev.truqlogistics.com/gun` but you may also have to run a gun relay server on your test environment.

The instructions to set up your local gun relay can be found here: `https://github.com/jhonatanmacazana/gun-relay`.

**NB: remember to update the new relay address in `app.module` file.**

##Known issues
**DAM JSON parse error SyntaxError: JSON.parse: unexpected character at line 1 column 2 of the JSON data** - this bug seems to be affecting node propagation and can be observed when new messages are recived but content not displaying

*Fix*: just reload or leave the chat room to come back to it again (permanent solution coming soon)
