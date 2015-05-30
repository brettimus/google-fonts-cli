which jsdoc > /dev/null && \
jsdoc ./*.js -d docs && \

which browserify > /dev/null && \
browserify ./lp/js/lp-src.js -o ./lp/js/lp.js

# which uglifyjs > /dev/null && \
# uglifyjs lp.js \
#          2> /dev/null \
#          > dist/lp.min.js