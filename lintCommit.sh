set -e;
npm run lint-fix
cd frontend;
npm run lint-fix;
cd ../backend;
npm run lint-fix;
cd ..;
git add -A;
git commit