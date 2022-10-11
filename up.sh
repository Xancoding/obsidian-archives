#! /bin/bash

hugo -F --cleanDestinationDir

cd public/

git add .

git commit -m "update"

git push

cd -

hugo server
