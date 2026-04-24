#!/bin/bash

# Ajnix Website Dev Script
# Next.js: 4400

SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
WEB_PORT=4400

# Colors
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
CYAN='\033[0;36m'
NC='\033[0m'

echo -e "${CYAN}Ajnix Website Dev Server${NC}"
echo "================================"

# Kill processes on ports. Uses fuser (always available) and falls back to
# lsof + ss. lsof -t alone misses some processes depending on permissions.
kill_port() {
    local port=$1
    local pids
    pids=$(fuser ${port}/tcp 2>/dev/null | tr -s ' ' '\n' | grep -E '^[0-9]+$')
    if [ -z "$pids" ]; then
        pids=$(lsof -t -i:${port} 2>/dev/null)
    fi
    if [ -z "$pids" ]; then
        pids=$(ss -tlnp "sport = :${port}" 2>/dev/null | grep -oE 'pid=[0-9]+' | cut -d= -f2)
    fi
    if [ -n "$pids" ]; then
        echo -e "${RED}Killing process(es) on port $port: $pids${NC}"
        kill -9 $pids 2>/dev/null
        # Wait up to 3s for the port to actually free
        for i in 1 2 3; do
            sleep 1
            if ! fuser ${port}/tcp >/dev/null 2>&1; then
                return 0
            fi
        done
        echo -e "${RED}Port $port still in use after kill${NC}"
        return 1
    fi
}

echo -e "\n${YELLOW}Cleaning up port $WEB_PORT...${NC}"
kill_port $WEB_PORT

# Clear Next.js cache to avoid the "Cannot find module './xxx.js'" crash
# that happens when dev and build artifacts get mixed in .next/
echo -e "\n${YELLOW}Clearing .next cache...${NC}"
rm -rf "$SCRIPT_DIR/.next"

# Start Next.js
echo -e "\n${GREEN}Starting Next.js on port $WEB_PORT...${NC}"
cd "$SCRIPT_DIR"
npm run dev &
WEB_PID=$!

echo -e "\n${GREEN}================================${NC}"
echo -e "${GREEN}Website: http://localhost:$WEB_PORT${NC}"
echo -e "${GREEN}FR:      http://localhost:$WEB_PORT/fr${NC}"
echo -e "${GREEN}Docs:    http://localhost:$WEB_PORT/docs${NC}"
echo -e "${GREEN}================================${NC}"
echo -e "\nPress Ctrl+C to stop"

# Cleanup on exit
cleanup() {
    echo -e "\n${YELLOW}Shutting down...${NC}"
    kill $WEB_PID 2>/dev/null
    kill_port $WEB_PORT
    echo -e "${GREEN}Done${NC}"
    exit 0
}

trap cleanup SIGINT SIGTERM

# Wait for processes
wait
