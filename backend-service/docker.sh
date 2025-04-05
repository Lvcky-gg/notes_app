#!/bin/bash
docker build -t backend-service .
docker run -p 8000:8000 backend-service