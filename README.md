# :construction: google-fonts-cli
**_Still Under Construction! Please come back later_**

A simple tool for adding google fonts on the fly.

## Installation
```
npm install -g gfi
```

## Usage

```
gfi /path/to/file.html FontName FontVariant1 FontVariant2
```

** For Example**
```
gfi ./index.html Lato 300
```

## Ideal Usage
```
gfi GIVEMEPRETTYFONTS --NOW
```

## In the Works
* Random Font Selection
* Sensible defaults
* Simpler options parsing (or.. ya know. options parsing in general)

## TODO
* Remove relative paths from calls to `fs`
* ~~get google font info~~
* Parse font variants as tuples
* ~~Preserve original document's indentation~~ ( a little buggy but almost there )
* Optimize stuff that says it needs to be opmtimized
* Hammer out interface
* ~~Refactor into objects~~
* Reuse code in the browser
* Arg parser
* Figure out how to treat spaces in font names on the command lines
* PROFIT