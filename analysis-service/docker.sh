#!/bin/bash
docker build -t analysis-service .
docker run -p 8001:8001 analysis-service