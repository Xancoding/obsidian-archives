#! /bin/bash

# hugo -F --cleanDestinationDir

hugo 

cd public/

git add .

git commit -m "update"

git push

cd -

hugo server
