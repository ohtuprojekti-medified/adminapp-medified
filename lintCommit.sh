set -e;
BLUE='\033[0;34m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'
echo -e "${BLUE}Lintting and fixing ${RED}errors${BLUE}. Exit on ${RED}error!"
echo -e "${BLUE}Lint-fix root${NC}"
npm run lint-fix;
cd frontend;
echo -e "${BLUE}Lint-fix frontend${NC}"
npm run lint-fix;
cd ../backend;
echo -e "${BLUE}Lint-fix backend${NC}"
npm run lint-fix;
cd ..;
git status
while true; do
  echo -e "${GREEN}No errors found! ${YELLOW}Check for warnings ${GREEN}and files to be commited.${NC}"
  read -p "Commit changes? (y/n)" yn
  case $yn in
    [Yy]* ) git add -A; git commit;;
    [Nn]* ) exit;;
  esac
done
