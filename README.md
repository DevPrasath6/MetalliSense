# MetalliSense - Alloy Alchemy Advisor

🔬 **Advanced Alloy Analysis & Recommendation System**

MetalliSense is a comprehensive industrial application designed for alloy composition analysis, quality control, and intelligent recommendations in metallurgical processes. The system combines real-time spectrometer data analysis with AI-powered predictive analytics to optimize alloy production and quality management.

## 🚀 Features

### Core Functionality
- **Real-time Spectrometer Analysis** - Live metal composition analysis and visualization
- **Alloy Recommendations** - AI-powered suggestions for optimal alloy compositions
- **Quality Control Dashboard** - Comprehensive monitoring and analysis tools
- **Predictive Analytics** - Advanced forecasting for production optimization
- **Anomaly Detection** - Intelligent identification of composition irregularities

### Advanced Features
- **Furnace Monitoring** - Real-time temperature and process tracking
- **Inventory Management** - Complete materials and alloy stock management
- **Historical Data Analysis** - Trend analysis and performance metrics
- **Neural Network Visualization** - Interactive ML model insights
- **Multi-Grade Learning** - Support for various alloy types and standards

## 🛠️ Technology Stack

### Frontend
- **React** with TypeScript
- **Vite** for fast development and building
- **Tailwind CSS** for responsive styling
- **shadcn/ui** for modern UI components
- **Recharts** for data visualization

### Backend
- **Django** REST Framework
- **Python 3.10+**
- **Celery** for background task processing
- **PostgreSQL** database support
- **Docker** containerization

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+ and npm
- Python 3.10+
- Docker (optional, for containerized deployment)

### Frontend Setup
```bash
# Clone the repository
git clone https://github.com/DevPrasath6/MetalliSense.git
cd MetalliSense

# Install frontend dependencies
npm install

# Start development server
npm run dev
```

### Backend Setup
```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install Python dependencies
pip install -r requirements.txt

# Run migrations
python manage.py migrate

# Start Django development server
python manage.py runserver
```

### Docker Deployment
```bash
cd backend
docker-compose up -d
```

## 🎯 Usage

### Dashboard Navigation
1. **Main Dashboard** - Overview of all system metrics and alerts
2. **Analytics** - Detailed composition analysis and trends
3. **Recommendations** - AI-generated alloy optimization suggestions
4. **Quality Control** - Real-time quality monitoring and compliance
5. **Furnace Monitoring** - Live furnace status and process control
6. **Inventory** - Materials management and stock tracking

### API Endpoints
The backend provides RESTful APIs for:
- Alloy composition data management
- Real-time spectrometer readings
- Recommendation engine access
- Historical data queries
- Quality control metrics

## 📊 Key Components

### Frontend Components
- `ComprehensiveDashboard` - Main control interface
- `SpectrometerPanel` - Real-time composition display
- `AlloyRecommendationPanel` - AI suggestions interface
- `QualityControl` - Quality metrics and alerts
- `FurnaceMonitoring` - Process monitoring tools
- `NeuralNetworkVisualizer` - ML model visualization

### Backend Services
- `alloy_api` - Core API for alloy data management
- `advanced_views` - Complex analytics and reporting
- `utils` - Shared utilities and helper functions
- `models` - Data models for alloy compositions
- `serializers` - API data serialization

## 🚦 Development

### Available Scripts
```bash
# Frontend
npm run dev          # Start development server
npm run build        # Build for production
npm run preview      # Preview production build
npm run lint         # Run ESLint

# Backend
python manage.py runserver              # Start Django server
python manage.py migrate               # Run database migrations
python manage.py createsuperuser       # Create admin user
python manage.py collectstatic         # Collect static files
```

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- **DevPrasath6** - *Initial work* - [DevPrasath6](https://github.com/DevPrasath6)

## 🙏 Acknowledgments

- Industrial metallurgy standards and best practices
- Modern web development frameworks and libraries
- Open source community contributions

---

*MetalliSense - Revolutionizing alloy analysis through intelligent automation*
