# Type in command: crontab -e
# Find the path to node by command: $PATH node
	# The above will get us to some sub-folder. We need to find the explicit path to the desired folder/application, on the workstation it looked like this: /Users/student/.nvm/versions/node/
# Once we have the path to node we go into crontab and drag and drop the script after we specify time-interavl for the cronjob. This will allow us to get the path to the folder.
# For this sprint our command in cronjob looked like this:
# */01 * * * * /Users/student/.nvm/versions/node/v6.9.5/bin/node /Users/student/Desktop/hrsf75-web-historian    /workers/htmlfetcher.js 
