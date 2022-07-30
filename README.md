# React Frontend + JSON-Processor for DiscordChatExporter

This repo contains a React UI and JSON processor for rendering messages exported from DiscordChatExporter with the following additional features:

- Search
- Pagination
- Smaller build
- Customizable
- Filter messages based on Date or messaged ID

## Usage

### DiscordChatExporter

When exporting a message/channel from [DiscordChatExporter](https://github.com/Tyrrrz/DiscordChatExporter), use JSON format. Copy the JSON file to `/json-processor` and rename it to `discord_log.json`.

### Installation

Navigate to `/json-processor` and run `yarn` or `npm install`

Navigate to `/frontend` and run `yarn` or `npm install`

Run `yarn global add serve` or `npm install -g serve`

### Starting The React Server

Run `yarn start` or `npm run-script start` from the base directory to run the JSON processor and start the React server.
