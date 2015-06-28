# :construction: google-fonts-cli
**_Still Under Construction! Please come back later_**

A simple tool for adding google fonts on the fly.

## Installation
```
npm install -g google-fonts-cli
```

## Usage

```
google-font /path/to/file.html FontName FontVariant1 FontVariant2
```

** For Example**
```
google-font ./index.html Lato 300
```

## Ideal Usage
```
google-font GIVEMEPRETTYFONTS --NOW
```

## In the Works
* Random Font Selection
* Sensible defaults
* Simpler options parsing (or.. ya know. options parsing in general)

## TODO
* ~~Remove relative paths from calls to `fs`~~ - just did if/else with `path.isAbsolute`
* ~~get google font info~~
* Parse font variants as tuples
* ~~Preserve original document's indentation~~ ( a little buggy but almost there )
* Optimize stuff that says it needs to be opmtimized
* Hammer out interface
* ~~Refactor into objects~~
* ~~Reuse code in the browser~~
* More involved Arg parser
* when adding random font, whould tell you which font it added
* ~~Figure out how to treat spaces in font names on the command lines~~
* Add usage + examples to redone landing page
* Find less janky transition between fonts (wait for them to render then slide in)
* PROFIT