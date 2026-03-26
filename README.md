# LiberPay

A modern payment platform that provides instant salary payments and secure financial services. LiberPay offers a seamless experience for both employers and employees with features like instant payments, bank-level security, and no hidden fees.

## 🌟 Features

- **Instant Payments**: Real-time salary disbursement
- **Bank-Level Security**: Enterprise-grade security measures
- **No Hidden Fees**: Transparent pricing structure
- **Multi-language Support**: English and Portuguese (Brazil)
- **Responsive Design**: Works seamlessly across all devices
- **Modern UI/UX**: Beautiful, intuitive interface

## 🛠️ Tech Stack

### Frontend

- **React 18** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for styling
- **Lucide React** for icons
- **React i18next** for internationalization
- **ESLint** for code quality

### Backend

- **Flask** (Python web framework)
- **Flask-CORS** for cross-origin requests
- **Flask-JWT-Extended** for authentication
- **Flask-Migrate** for database migrations
- **Flask-Smorest** for API documentation

### Infrastructure

- **Docker** for containerization
- **Docker Compose** for multi-container orchestration
- **Nginx** for frontend serving
- **SSL** support for secure connections

## 🚀 Quick Start

### Prerequisites

- Docker and Docker Compose
- Node.js 18+ (for local development)
- Python 3.8+ (for local development)

### Using Docker (Local Development - Recommended)

1. **Clone the repository**

   ```bash
   git clone <repository-url>
   cd liberpay
   ```

2. **Create environment file**

   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

   **Note**: The `.env.example` file is included in the repository as a template. Copy it to `.env` and update the values according to your environment. The `.env` file is ignored by git for security reasons.

3. **Start the local stack (no SSL)**

   ```bash
   docker compose -f docker-compose.local.yml up -d --build
   ```

4. **Access the application**
   - Frontend: http://localhost:10005
   - Backend API: http://localhost:10006/api/

5. **Initialize Supabase schema (required for contact endpoint)**

   Run the SQL in `backend/sql/init_supabase.sql` using Supabase SQL Editor for your new project.

### Using Docker (Production-like with SSL)

Use `docker-compose.yml` only when SSL certificates are available at `/etc/letsencrypt/live/liberpay.co/`.

```bash
docker compose up -d --build
```

This mode exposes HTTPS on port `443` and expects valid Let's Encrypt files.

### Local Development

#### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

#### Backend Setup

```bash
cd backend
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
pip install -r requirements.txt
flask run
```

## 📁 Project Structure

```
liberpay/
├── backend/                 # Flask API server
│   ├── app/
│   │   ├── blueprints/     # API route modules
│   │   ├── config.py       # Configuration settings
│   │   └── extensions.py   # Flask extensions
│   ├── Dockerfile          # Backend container config
│   └── requirements.txt    # Python dependencies
├── frontend/               # React application
│   ├── src/
│   │   ├── components/     # React components
│   │   ├── hooks/          # Custom React hooks
│   │   ├── i18n/          # Internationalization
│   │   └── utils/         # Utility functions
│   ├── Dockerfile         # Frontend container config
│   └── package.json       # Node.js dependencies
├── docker-compose.yml     # Multi-container setup
└── README.md             # This file
```

## 🌐 Internationalization

The application supports multiple languages:

- **English (en-US)** - Default language
- **Portuguese (pt-BR)** - Brazilian Portuguese

Language can be changed via URL parameter: `?lang=pt-BR`

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the root directory by copying the provided template:

```bash
cp .env.example .env
```

Then edit the `.env` file with your specific configuration:

```env
# Flask Configuration
FLASK_APP=wsgi.py
FLASK_ENV=development
FLASK_DEBUG=1

# Database Configuration
DATABASE_URL=your_database_url

# JWT Configuration
JWT_SECRET_KEY=your_jwt_secret

# API Configuration
API_TITLE=LiberPay API
API_VERSION=v1

# Frontend Configuration
VITE_API_BASE_URL=http://localhost:10006
VITE_APP_NAME=LiberPay

# Docker Configuration
COMPOSE_PROJECT_NAME=liberpay
```

### Supabase Setup (New Project)

If you changed Supabase project or key, you must create required tables before using `POST /api/contacts`:

1. Open Supabase SQL Editor.
2. Run `backend/sql/init_supabase.sql`.
3. Confirm `public.customers` and `public.emails` were created.

## 📝 Available Scripts

### Frontend

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run lint` - Run ESLint
- `npm run preview` - Preview production build

### Backend

- `flask run` - Start development server
- `flask db migrate` - Create database migration
- `flask db upgrade` - Apply database migrations

## 🐳 Docker Commands

```bash
# Local development (no SSL)
docker compose -f docker-compose.local.yml up -d --build

# Stop local development stack
docker compose -f docker-compose.local.yml down

# View local logs
docker compose -f docker-compose.local.yml logs -f

# Production-like (requires certs in /etc/letsencrypt)
docker compose up -d --build

# View logs
docker compose logs -f

# Stop all services
docker compose down

# Rebuild containers
docker compose up -d --build

# Access container shell
docker compose exec backend bash
docker compose exec frontend sh
```

## 🔒 Security

- JWT-based authentication
- CORS protection
- SSL/TLS encryption
- Input validation and sanitization
- Secure headers configuration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🆘 Support

For support and questions:

- Create an issue in the repository
- Contact the development team
- Check the documentation

## 🔄 Version History

- **v0.0.0** - Initial release with basic payment functionality
  - Multi-language support (EN/PT-BR)
  - Responsive design
  - Docker containerization
  - Flask API backend
  - React frontend with TypeScript
