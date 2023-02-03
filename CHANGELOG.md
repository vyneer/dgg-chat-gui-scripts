# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog],
and this project adheres/tries to adhere to [Semantic Versioning].

## [Unreleased]

- Added an option to embed a hosted stream's chat, same as embedded stream or live YT chat (big thanks to [@mattroseman](https://github.com/mattroseman) <3)
- ...

## [1.7.2] - 2022-12-31

### Added
- Add an option to update the live pill for Youtube stream with channel name (big thanks to [@mattroseman](https://github.com/mattroseman) <3)
- Add Rumble embeds

## [1.7.1] - 2022-10-10

### Fixed

- Remove the temporary Violentmonkey Chromium workaround

## [1.7] - 2022-10-07

### Added

- New custom settings menu
- Feature to show destiny's last vod on embed check
- Focus the chat input after double clicking a username to copy to input (big thanks to @mattroseman <3)

### Changed

- Speedup banned phrase detection
- Better mutelinks mode support (now detects SOME links in your messages!)
- Slight sticky mentions visibility improvement
- New SVG icon
- Switch to the timestamp update model (might be buggy, but hopefully not)
  
### Fixed

- Message gets scanned on context menu paste now as well
- Script should work on strims.gg now
- Fix the LIVE prepend bug that kept adding it to the title (big thanks to @mattroseman <3)
- Add a temporary Violentmonkey Chromium workaround

## [1.6] - 2022-04-23

### Added

- Option to prevent you from sending a message containing a banned/nuked phrase
- Option to format YT embeds directly in messages
- Option to select the embed button icon (thanks Igor for the outline version, thanks Voiture for the SVG version! <3)
- Option to color the text area when mutelinks is on
- Option to add 'LIVE' to title when watching on bigscreen
- Option to hide individual flairs (big thanks to Voiture <3)
- Option to stick recent mentions to top of chat (big PepoTurkey to Voiture gobl)
- Option to ignore certain phrases, decoupled from harsh ignore setting (big PepoTurkey to Voiture gobl)
- Option to double click a username to append it to the input box (big thanks to @mattroseman <3)

### Changed

- If you hover over the mutelinks icon a popup makes it more clear what's happening

### Fixed

- Firemonkey compatibility

## [1.5.2] - 2022-04-20

### Added

- Add all strims links

## [1.5.1] - 2021-11-20

### Fixed

- Fix (source) links not working in some cases

## [1.5] - 2021-11-19

### Added

- Option to disable autoscroll down (so, when the "More messages below" bar appears, it won't scroll down if you uncheck the setting)
- Option to see title/channel name of youtube embeds
- Option to see title of twitch embeds

### Changed

- Now shows the nuked phrases when you hover over the nuke button
- Set saturation of embed icon to 0 (because win 11 made the emoji purple MMMM)

## [1.4.1] - 2021-10-13

### Changed

- Replace vars with lets

### Fixed

- Fix mutelinks icon not moving based on the amount of whispers

## [1.4] - 2021-09-24

### Added

- Added strims.gg/angelthump to the list of embeds (i know it's technically not an embed but i figured it's still worth adding it)

### Changed

- Better update system (you can just left click now pog) (technically a server side change)

## [1.3.2] - 2021-08-30

### Fixed

- fix phrases autorefresh not clearing the array

## [1.3.1] - 2021-08-29

### Added

- Add an icon

### Changed

- Phrases autorefresh now too

## [1.3] - 2021-08-12

### Added

- Added an option to show last embeds if no one embedded anything in x minutes
- Nuked phrases will now color the text area if typed
- You can now set custom colors for text area alerts

### Fixed

- Some bug fixes

## [1.2.2] - 2021-08-11

### Added

- Add a lidl debug mode (see const DEBUG)

### Fixed

- Fix whisper count being over the nuke/mutelinks buttons

## [1.2.1] - 2021-08-10

### Added

- Show version in settings
- Add some debug messages

### Fixed

- Violentmonkey compatibility

## [1.2] - 2021-07-10

### Added

- Add an option to show embeds on chat connect

### Fixed

- Slight alignment corrections

## [1.1.4] - 2021-05-09

### Added

- Add titles to some labels

### Changed

- Change embed time span to an input box

## [1.1.3] - 2021-05-08

### Added

- Add a source link to embeds

## [1.1.2] - 2021-05-04

### Changed

- Open update link in new window

## [1.1.1] - 2021-05-04

### Fixed

- Small bug fix for nukes

## [1.1] - 2021-05-02

### Added

- Add nukes to phrase checking
- Add mutelinks warning
  
### Changed

- Better update system

## [1.0.2] - 2021-05-02

### Fixed

- Fix chat not scrolling down on update message

## [1.0.1] - 2021-05-02

### Changed

- Convert phrases to lowercase before matching

## [1.0] - 2021-04-30

### Added

- Add embeds
- Add phrase checking

<!-- Links -->
[keep a changelog]: https://keepachangelog.com/en/1.0.0/
[semantic versioning]: https://semver.org/spec/v2.0.0.html