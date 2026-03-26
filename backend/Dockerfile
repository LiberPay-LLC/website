FROM python:3.13-slim

# Set working directory
WORKDIR /app

# Set environment variables
ENV PYTHONDONTWRITEBYTECODE=1
ENV PYTHONUNBUFFERED=1
ENV FLASK_APP=wsgi.py

# Build argument for environment
ARG ENV=production
ENV FLASK_ENV=${ENV}

# Copy requirements and install Python dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy application code
COPY . .

# Expose port
EXPOSE 5000

# Run the application
CMD ["sh", "-c", "if [ \"$FLASK_ENV\" = \"development\" ]; then python app.py; else gunicorn --bind 0.0.0.0:${PORT:-5000} --workers 1 app:app; fi"]