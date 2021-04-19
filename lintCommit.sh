set -e;
echo 'Lintting and fixing errors. Exit on error!'
echo 'Lint-fix root'
npm run lint-fix;
cd frontend;
echo 'Lint-fix frontend'
npm run lint-fix;
cd ../backend;
echo 'Lint-fix backend'
npm run lint-fix;
cd ..;
while true; do
  read -p 'No errors found! Check for warnings. Commit changes? (y/n)' yn
  case $yn in
    [Yy]* ) git add -A; git commit;;
    [Nn]* ) exit;;
  esac
done
