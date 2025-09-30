
# Django + MongoDB Backend for Alloy Alchemy Advisor

## Setup Instructions

1. **Create a virtual environment:**
   ```bash
   python -m venv venv
   source venv/bin/activate  # On Windows: venv\Scripts\activate
   ```

2. **Install dependencies:**
   ```bash
   pip install -r requirements.txt
   ```

3. **Setup MongoDB:**
   - Install MongoDB locally or use MongoDB Atlas
   - Ensure MongoDB is running on localhost:27017 (default)

4. **Environment Configuration:**
   ```bash
   cp .env.example .env
   # Edit .env with your configuration
   ```

5. **Run migrations:**
   ```bash
   python manage.py makemigrations
   python manage.py migrate
   ```

6. **Create superuser (optional):**
   ```bash
   python manage.py createsuperuser
   ```

7. **Start the server:**
   ```bash
   python manage.py runserver
   ```

## API Endpoints

- **Alloy Compositions:** `/api/compositions/`
- **Process Data:** `/api/process-data/`
- **Inventory:** `/api/inventory/`
- **Alerts:** `/api/alerts/`

### Custom Endpoints

- `GET /api/compositions/by_grade/?grade=316L`
- `GET /api/process-data/recent/?hours=24`
- `GET /api/process-data/by_furnace/?furnace_id=F001`
- `GET /api/inventory/low_stock/?threshold=100`
- `GET /api/alerts/active/`
- `POST /api/alerts/{id}/resolve/`

## Server runs on: http://localhost:8000
