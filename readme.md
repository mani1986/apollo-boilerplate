# Git Flow

- commitlint

# Run on docker

Make sure .env exist with proper config. Location to mongodb and port number matching the lines below.

```
docker build -t project:latest .
docker run -p 4015:4015 --expose 4015 --env-file ./.env project:latest
```

# Seed

The application relies on `initial` data to run. This data has been specified in the `seed` folder. The seeding is automatically handled in the boot file that runs all required libraries when the main script runs.
