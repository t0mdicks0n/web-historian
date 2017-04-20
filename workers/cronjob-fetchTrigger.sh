#!/bin/sh
/Users/student/.nvm/versions/node/v6.9.5/bin/node /Users/student/Desktop/hrsf75-web-historian/workers/htmlfetcher.js
./htmlfetcher.js

chmod +x cronjob-htmlfetcher.sh

 */01 * * * * /Users/student/Desktop/hrsf75-web-historian/workers/cronjob-fetchTrigger.sh



 /Users/student/.nvm/versions/node/v6.9.5/bin/node