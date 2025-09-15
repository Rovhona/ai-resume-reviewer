# Deployment Guide

This guide will help you deploy the AI Resume Reviewer application to Vercel.

## 🚀 Frontend Deployment (Vercel)

### Prerequisites
- GitHub account
- Vercel account (free tier available)
- Your project pushed to GitHub

### Step 1: Deploy Frontend to Vercel

1. **Go to [Vercel](https://vercel.com)**
2. **Sign in with GitHub**
3. **Click "New Project"**
4. **Import your GitHub repository**
5. **Configure the project:**
   - **Framework Preset**: Create React App
   - **Root Directory**: `frontend`
   - **Build Command**: `npm run build`
   - **Output Directory**: `build`
   - **Install Command**: `npm install`

### Step 2: Set Environment Variables

In your Vercel project settings, add:
- `REACT_APP_API_URL`: Your backend API URL (e.g., `https://your-backend.herokuapp.com`)

### Step 3: Deploy

Click "Deploy" and wait for the build to complete.

## 🔧 Backend Deployment Options

### Option 1: Heroku (Recommended)

1. **Install Heroku CLI**
2. **Create Heroku app:**
   ```bash
   cd backend
   heroku create your-app-name
   ```

3. **Add buildpacks:**
   ```bash
   heroku buildpacks:add heroku/python
   ```

4. **Create Procfile:**
   ```bash
   echo "web: uvicorn main:app --host 0.0.0.0 --port \$PORT" > Procfile
   ```

5. **Deploy:**
   ```bash
   git add .
   git commit -m "Add Heroku deployment files"
   git push heroku main
   ```

### Option 2: Railway

1. **Go to [Railway](https://railway.app)**
2. **Connect GitHub repository**
3. **Select backend folder**
4. **Add environment variables**
5. **Deploy automatically**

### Option 3: Render

1. **Go to [Render](https://render.com)**
2. **Create new Web Service**
3. **Connect GitHub repository**
4. **Configure:**
   - **Root Directory**: `backend`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `uvicorn main:app --host 0.0.0.0 --port $PORT`

## 🌐 Full Stack Deployment

### Step 1: Deploy Backend First
Deploy your backend to one of the platforms above and note the URL.

### Step 2: Update Frontend Environment
Update your Vercel environment variable:
- `REACT_APP_API_URL`: `https://your-backend-url.herokuapp.com`

### Step 3: Redeploy Frontend
Trigger a new deployment in Vercel to pick up the new environment variable.

## 🔍 Testing Deployment

1. **Test Backend**: Visit `https://your-backend-url.herokuapp.com/`
2. **Test Frontend**: Visit your Vercel URL
3. **Test Full Flow**: Upload a resume and verify analysis works

## 🛠️ Troubleshooting

### Common Issues

1. **CORS Errors**: Ensure your backend has CORS configured for your Vercel domain
2. **Environment Variables**: Make sure `REACT_APP_API_URL` is set correctly
3. **Build Failures**: Check that all dependencies are in package.json
4. **API Timeout**: Consider increasing timeout for large file uploads

### Backend CORS Configuration

Update your backend `main.py`:
```python
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
        "http://127.0.0.1:3000",
        "https://your-vercel-app.vercel.app"  # Add your Vercel domain
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)
```

## 📱 Custom Domain (Optional)

1. **In Vercel Dashboard**: Go to your project settings
2. **Add Domain**: Enter your custom domain
3. **Configure DNS**: Point your domain to Vercel
4. **SSL**: Vercel automatically provides SSL certificates

## 🔄 Continuous Deployment

Once set up, your app will automatically redeploy when you push changes to your GitHub repository.

## 📊 Monitoring

- **Vercel Analytics**: Built-in performance monitoring
- **Heroku Metrics**: Monitor backend performance
- **Error Tracking**: Consider adding Sentry for error monitoring

---

**Your AI Resume Reviewer will be live and accessible to users worldwide!** 🌍
