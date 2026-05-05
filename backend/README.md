# Portfolio Automation Backend

A FastAPI backend for automating portfolio project management with PostgreSQL and webhook integration.

## Features

- Create projects via API
- Store projects in PostgreSQL
- Upload videos to ImageKit and get public URLs
- Send notifications to webhooks (Make/Zapier) for LinkedIn posts with video links
- Retrieve all projects

## Tech Stack

- Python
- FastAPI
- PostgreSQL
- SQLAlchemy
- Pydantic
- Requests
- ImageKit

## Installation and Setup

### Prerequisites

1. **Python 3.8 or higher**: Download from [python.org](https://www.python.org/downloads/)

2. **PostgreSQL**: Download and install from [postgresql.org](https://www.postgresql.org/download/)

   - During installation, set up a password for the postgres user
   - Create a database named `portfolio_db` (or any name you prefer)

3. **ImageKit Account**: Sign up at [imagekit.io](https://imagekit.io/) to get API keys

### Project Setup

1. Clone or download this project to your local machine.

2. Navigate to the project directory:
   ```
   cd d:\python_project\backend
   ```

3. Create a virtual environment:
   ```
   python -m venv venv
   ```

4. Activate the virtual environment:
   ```
   venv\Scripts\activate
   ```

5. Install dependencies:
   ```
   pip install -r requirements.txt
   ```

6. Set up environment variables:
   - Copy `.env.example` to `.env`
   - Edit `.env` with your actual values:
     ```
     DATABASE_URL=postgresql://postgres:your_password@localhost/portfolio_db
     WEBHOOK_URL=https://your-make-or-zapier-webhook-url
     IMAGEKIT_PUBLIC_KEY=your_imagekit_public_key
     IMAGEKIT_PRIVATE_KEY=your_imagekit_private_key
     IMAGEKIT_URL_ENDPOINT=https://ik.imagekit.io/your_imagekit_id
     ```

7. Run the application:
   ```
   uvicorn main:app --reload
   ```

The API will be available at `http://127.0.0.1:8000`

## API Documentation

Once running, visit `http://127.0.0.1:8000/docs` for interactive API documentation.

### Endpoints

- **POST /projects**: Create a new project
  - Content-Type: `multipart/form-data`
  - Form fields: `title`, `description`, `tech_stack`
  - File field: `media` (image or video file)
  - The backend uploads media to ImageKit and generates an AI caption.

- **GET /projects**: Retrieve all projects

- **GET /projects/{project_id}**: Retrieve a single project by ID

- **PATCH /projects/{project_id}**: Update project metadata, review caption, or change approval status

- **POST /projects/{project_id}/approve**: Approve the project and auto-post approved content to LinkedIn and Instagram

## Usage with Postman

1. Start the server as above.

2. In Postman, create a new POST request to `http://127.0.0.1:8000/projects`

3. Set Content-Type to `multipart/form-data`

4. Add form fields:
   - `title`: Project title
   - `description`: Project description
   - `tech_stack`: Technologies used
   - `media`: Select an image or video file to upload

5. Send the request. The media will be uploaded to ImageKit and the project will be stored in PostgreSQL.

## Troubleshooting

- Ensure PostgreSQL is running and the database exists.
- If you have an existing `projects` table, recreate it or run a migration after schema changes.
- Check that environment variables are set correctly.
- If webhook or social posting fails, check the credentials and network connectivity.

## Project Structure

```
.
├── main.py              # FastAPI app entry point
├── database.py          # Database connection and session
├── models.py            # SQLAlchemy models
├── schemas.py           # Pydantic schemas
├── routes/
│   └── projects.py      # Project API routes
├── services/
│   ├── imagekit.py      # ImageKit upload service
│   ├── ollama.py        # AI caption generation service
│   ├── social.py        # LinkedIn and Instagram posting service
│   └── webhook.py       # Webhook service
├── requirements.txt     # Python dependencies
├── .env.example         # Environment variables template
└── README.md            # This file
```