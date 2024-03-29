Omnisearch now has HTTP server search injector built in, this repo is left as is.

___

# Search Obsidian in Google

## What is this?
A simple plugin that allows you to search Obsidian in Google.

- Features:
  - Include excerpt in search result
  - Fuzzy match
  - Scored result
  - Quick open in obsidian


## How to use?
### Quick Start
1. Install [Chrome](https://chrome.google.com/webstore/detail/search-obsidian-in-google/dkefnggaipjamcbnjdlapgilhlaikbme) / Firefox(under review) extension in Chrome/Firefox. ([Source Code](https://github.com/qazxcdswe123/search-obsidian-browser-extension))
2. Install [Obsidian Omnisearch](https://github.com/scambier/obsidian-omnisearch) plugin in Obsidian, configure the plugin as you like.
3. Install [Search Obsidian in Google](https://github.com/qazxcdswe123/search-obsidian-in-google) plugin in Obsidian. You can now install directly from obsidian plugin store.
4. Configure the plugin in Obsidian.
5. Set the port number, authentication token, and the vault name in the Chrome extension.

- Hint: you can **click the search result** to open the file in Obsidian! This requires you to set the vault name in the Chrome extension. It is recommended to check `Always allow www.google.com to open links of this type in the associated app` in the popup window.
- Note that `Local Rest API` plugin is not required.

### Configuration
- Obsidian Plugin
  - Port: The port number of the local REST API between Obsidian and Chrome extension. Default is `27080`.
- Chrome Extension
  - Local Port: This should match the port number in Obsidian plugin.
  - Token: The authentication token between Obsidian and Chrome extension. You can find it in Obsidian plugin settings page.
  - Vault Name (Optional): Used when you want to click the search result to open the file in Obsidian. You can find the name by clicking the vault icon in the bottom left corner of Obsidian.

### Install manually
1. Download the latest release from [here](https://github.com/qazxcdswe123/search-obsidian-in-google/releases/tag/1.0.0)
2. Open the plugin folder in Obsidian, create a folder named `search-obsidian-in-google` and put the `main.js`, `manifest.json`, and `index.css` in it.
3. Install [Chrome extension](https://chrome.google.com/webstore/detail/search-obsidian-in-google/dkefnggaipjamcbnjdlapgilhlaikbme) in Chrome, configure it properly.
4. Install [OmniSearch](https://github.com/scambier/obsidian-omnisearch) plugin in Obsidian, configure the plugin as you like.

## Demo
![demo1](assets/img/demo1.jpg)
![demo2](assets/img/demo2.jpg)
![demo3](https://github.com/qazxcdswe123/search-obsidian-in-google/assets/29861494/97011979-7840-455c-8c92-0272d46ffe96)


## Known Issues
- Currently only Chrome is confirmed to work. Firefox is under review (help wanted). Brave is not supported ([Issue](https://github.com/qazxcdswe123/search-obsidian-in-google/issues/2), [Brave Issue](https://github.com/brave/brave-browser/issues/27346)).
- Some have trouble getting excerpt [Issue](https://github.com/qazxcdswe123/search-obsidian-in-google/issues/1).


## Troubleshooting
- Check if `omnisearch` and `search obsidian in google` are installed in Obsidian and configured properly.
- Check if the port number and token are set in chrome extension.
- Check if `omnisearch` plugin in Obsidian produce the correct result.

## Credits
- [Omnisearch](https://github.com/scambier/obsidian-omnisearch)
- [Obsidian-local-rest-api](https://github.com/coddingtonbear/obsidian-local-rest-api/)
- [Chatgpt-google-extension](https://github.com/wong2/chatgpt-google-extension)
